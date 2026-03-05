#!/usr/bin/env tsx
/**
 * Auto-Apply Categorization Fixes
 * 
 * Applies the category and series assignments from categorization-fixes.json
 * to uncategorized products in Sanity.
 * 
 * Completes steelmade-6md: Categorize 70 uncategorized products
 */

import { createClient } from 'next-sanity';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface CategoryFix {
  _id: string;
  name: string;
  currentCategory: string | null;
  currentSeries: string | null;
  inferredCategory: string;
  inferredSeries: string | null;
  confidence: string;
  reasoning: string;
}

async function applyCategorizationFixes() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║              AUTO-APPLY CATEGORIZATION FIXES                               ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Load categorization fixes
  const fixesPath = join(process.cwd(), 'categorization-fixes.json');
  
  if (!existsSync(fixesPath)) {
    console.error('❌ Error: categorization-fixes.json not found');
    console.log('\nRun this first: npx tsx scripts/infer-product-categories.ts\n');
    process.exit(1);
  }

  const fixesData = JSON.parse(readFileSync(fixesPath, 'utf-8'));
  const rawFixes = fixesData.full_categorizations || fixesData;
  
  if (!Array.isArray(rawFixes) || rawFixes.length === 0) {
    console.error('❌ Error: No categorization fixes found in file');
    process.exit(1);
  }
  
  // Fetch actual product IDs from Sanity by matching slugs
  console.log('🔄 Fetching products from Sanity...\n');
  const products = await sanityClient.fetch<Array<{_id: string; slug: string; name: string}>>(`
    *[_type == "product" && !defined(category)] {
      _id,
      "slug": slug.current,
      name
    }
  `);
  
  // Create slug to ID mapping
  const slugToId = products.reduce((acc, p) => {
    acc[p.slug] = p._id;
    return acc;
  }, {} as Record<string, string>);
  
  // Transform fixes to include Sanity document IDs
  const fixes: CategoryFix[] = rawFixes
    .map((fix: any) => {
      const slug = fix.id || fix.slug;
      const sanityId = slugToId[slug];
      
      if (!sanityId) {
        console.warn(`⚠️  Warning: Could not find Sanity ID for slug "${slug}"`);
        return null;
      }
      
      return {
        _id: sanityId,
        name: fix.name,
        currentCategory: fix.currentCategory,
        currentSeries: fix.currentSeries || null,
        inferredCategory: fix.inferredCategory,
        inferredSeries: fix.inferredSeries,
        confidence: typeof fix.confidence === 'number' 
          ? (fix.confidence >= 80 ? 'high' : fix.confidence >= 50 ? 'medium' : 'low')
          : fix.confidence,
        reasoning: fix.reasoning || fix.reason || '',
      };
    })
    .filter((fix): fix is CategoryFix => fix !== null);
  
  if (fixes.length === 0) {
    console.error('❌ Error: No valid categorization fixes after matching with Sanity');
    process.exit(1);
  }
  
  console.log(`✅ Matched ${fixes.length} categorization fixes with Sanity products\n`);
  
  // Check mode
  const dryRun = process.argv.includes('--dry-run') || process.argv.includes('--preview');
  const highConfidenceOnly = process.argv.includes('--high-confidence-only');
  const mode = dryRun ? 'PREVIEW' : 'EXECUTE';

  console.log(`Mode: ${mode}`);
  if (highConfidenceOnly) {
    console.log('Filter: HIGH CONFIDENCE ONLY');
  }
  if (dryRun) {
    console.log('(No changes will be made)\n');
  } else {
    console.log('⚠️  LIVE MODE - Changes will be applied!\n');
  }

  // Filter by confidence if requested
  let toApply = fixes;
  if (highConfidenceOnly) {
    toApply = fixes.filter(f => f.confidence === 'high');
    console.log(`Filtered to ${toApply.length} high-confidence fixes (from ${fixes.length} total)\n`);
  }

  console.log(`📊 Found ${toApply.length} categorization fixes to apply\n`);

  // Group by confidence
  const byConfidence = toApply.reduce((acc, fix) => {
    acc[fix.confidence] = (acc[fix.confidence] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('Breakdown by Confidence:');
  Object.entries(byConfidence)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([conf, count]) => {
      console.log(`  • ${conf}: ${count} products`);
    });
  console.log();

  if (dryRun) {
    console.log('Sample Changes (first 10):');
    console.log('─────────────────────────────────────────────────────────────────────────────');
    toApply.slice(0, 10).forEach((fix, i) => {
      console.log(`${i + 1}. ${fix.name} [${fix.confidence}]`);
      console.log(`   Category: ${fix.currentCategory || 'none'} → ${fix.inferredCategory}`);
      if (fix.inferredSeries) {
        console.log(`   Series: ${fix.currentSeries || 'none'} → ${fix.inferredSeries}`);
      }
      console.log(`   Reasoning: ${fix.reasoning}`);
      console.log();
    });

    if (toApply.length > 10) {
      console.log(`... and ${toApply.length - 10} more\n`);
    }

    console.log('💡 To execute, run:');
    if (highConfidenceOnly) {
      console.log('   npx tsx scripts/apply-categorization-fixes.ts --execute --high-confidence-only');
    } else {
      console.log('   npx tsx scripts/apply-categorization-fixes.ts --execute');
    }
    console.log();
    return;
  }

  // Execute updates
  console.log('🚀 Applying categorization fixes...\n');

  let successful = 0;
  let failed = 0;
  const errors: Array<{ product: string; error: string }> = [];

  for (let i = 0; i < toApply.length; i++) {
    const fix = toApply[i];
    const progress = `[${i + 1}/${toApply.length}]`;

    try {
      console.log(`${progress} Updating: ${fix.name} [${fix.confidence}]`);

      const patch = sanityClient.patch(fix._id);
      
      // Set category
      patch.set({ category: fix.inferredCategory });
      
      // Set series if inferred
      if (fix.inferredSeries) {
        patch.set({ series: fix.inferredSeries });
      }

      await patch.commit();

      console.log(`  ✅ Category: ${fix.inferredCategory}${fix.inferredSeries ? `, Series: ${fix.inferredSeries}` : ''}`);
      successful++;
    } catch (error) {
      console.log(`  ❌ FAILED: ${error instanceof Error ? error.message : String(error)}`);
      failed++;
      errors.push({
        product: fix.name,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                    CATEGORIZATION SUMMARY                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log(`Total Fixes Applied:  ${toApply.length}`);
  console.log(`✅ Successful:        ${successful}`);
  console.log(`❌ Failed:            ${failed}`);
  console.log();

  if (failed > 0) {
    console.log('Failed Products:');
    errors.forEach(({ product, error }) => {
      console.log(`  • ${product}: ${error}`);
    });
    console.log();
  }

  console.log(`Success Rate:         ${Math.round((successful / toApply.length) * 100)}%`);
  console.log();

  console.log('🔍 Next Steps:');
  console.log('  1. Re-run image matching: npx tsx scripts/fetch-cloudinary-images.ts --analyze');
  console.log('  2. Apply new matches: npx tsx scripts/fetch-cloudinary-images.ts --execute');
  console.log('  3. Run verification: npx tsx scripts/verify-sanity-cloudinary-parity.ts');
  console.log('  4. Update beads: bd update steelmade-6md --append-notes "Applied categorization"');
  console.log('  5. Close issue: bd close steelmade-6md --reason "70 products categorized"');
  console.log();

  if (successful === toApply.length) {
    console.log('✅ ALL CATEGORIZATIONS APPLIED SUCCESSFULLY!');
    console.log('\n🎉 steelmade-6md can now be closed!\n');
  } else {
    console.log('⚠️  Some updates failed - review errors above\n');
    process.exit(1);
  }
}

// Run
applyCategorizationFixes().catch(error => {
  console.error('\n❌ Categorization failed:', error);
  process.exit(1);
});
