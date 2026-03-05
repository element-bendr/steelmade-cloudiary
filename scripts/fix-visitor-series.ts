#!/usr/bin/env node
/**
 * Fix Visitor Series Products
 * 
 * Ensures all products with visitor-series in their publicId path
 * have the correct series field set to "visitor series" (not ergonomic/executive)
 */

import { createClient } from 'next-sanity';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function fixVisitorSeries() {
  console.log('\n🔧 FIXING VISITOR SERIES PRODUCTS\n');

  // Get products with visitor-series in path that SHOULD be visitor series
  // (exclude those from ergonomic/executive series that just have visitor variants)
  const productsToFix = await sanityClient.fetch(`
    *[_type == "product" && defined(mainImage.publicId) && mainImage.publicId match "*visitor-series*"] {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "publicId": mainImage.publicId
    }
  `);

  console.log(`📊 Found ${productsToFix.length} products with visitor-series in path\n`);

  // Categorize them
  const needsUpdate: any[] = [];
  const alreadyCorrect: any[] = [];

  productsToFix.forEach((product: any) => {
    const currentSeries = (product.series || '').toLowerCase();
    const normalizedSeries = currentSeries.replace(/\s+/g, '-');

    // Check if it's already "visitor series" or variant
    if (normalizedSeries === 'visitor-series' || normalizedSeries === 'visitor') {
      alreadyCorrect.push(product);
    } else {
      // Check if it's actually a visitor variant of another series
      // These have patterns like "ic-125-visitor", "ic-128-visitor" in publicId
      const filename = product.publicId.split('/').pop() || '';
      const isVariant = filename.includes('-visitor') && currentSeries !== '';
      
      if (isVariant) {
        console.log(`ℹ️  Keeping ${product.name} as ${product.series} (visitor variant)`);
      } else {
        needsUpdate.push(product);
      }
    }
  });

  console.log(`✅ Already correct: ${alreadyCorrect.length}`);
  console.log(`⚠️  Need update: ${needsUpdate.length}\n`);

  // Check execution mode
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');

  if (!executeMode) {
    console.log('ℹ️  DRY RUN MODE - Preview only\n');
    
    if (needsUpdate.length > 0) {
      console.log('📋 PRODUCTS TO UPDATE:\n');
      needsUpdate.forEach((p, i) => {
        console.log(`[${i + 1}] ${p.name}`);
        console.log(`    Current series: "${p.series || 'none'}"`);
        console.log(`    Will change to: "visitor series"`);
        console.log(`    PublicId: ${p.publicId}\n`);
      });
    }

    console.log(`⚡ To update ${needsUpdate.length} products, run:`);
    console.log(`   npx tsx scripts/fix-visitor-series.ts --execute\n`);
    return;
  }

  // Execute updates
  console.log(`[1] Updating ${needsUpdate.length} products...\n`);

  const results = {
    updated: 0,
    failed: 0,
    errors: [] as Array<{ product: string; error: string }>,
  };

  for (let i = 0; i < needsUpdate.length; i++) {
    const product = needsUpdate[i];
    const num = i + 1;

    process.stdout.write(`[${num}/${needsUpdate.length}] ${product.name}... `);

    try {
      await sanityClient
        .patch(product._id)
        .set({ series: 'visitor series' })
        .commit();

      results.updated++;
      console.log(`✅`);
    } catch (error: any) {
      results.failed++;
      results.errors.push({ product: product.name, error: error.message });
      console.log(`❌ ${error.message}`);
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                        VISITOR SERIES FIX COMPLETE                         ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📈 RESULTS:\n');
  console.log(`  ✅ Updated: ${results.updated}/${needsUpdate.length}`);
  console.log(`  ❌ Failed: ${results.failed}\n`);

  if (results.errors.length > 0) {
    console.log('❌ ERRORS:\n');
    results.errors.forEach(err => {
      console.log(`  ${err.product}: ${err.error}`);
    });
    console.log();
  }

  // Final verification
  const allVisitorSeries = await sanityClient.fetch(`
    count(*[_type == "product" && category == "chairs" && lower(series) match "*visitor*"])
  `);

  console.log(`🎯 FINAL COUNT: ${allVisitorSeries} visitor series products\n`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    results,
    finalCount: allVisitorSeries,
  };

  const reportPath = join(process.cwd(), 'visitor-series-fix-execution.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Report saved to: visitor-series-fix-execution.json\n`);
}

// Execute
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('\n⚠️  No arguments provided. Running in DRY RUN mode.\n');
  console.log('Options:');
  console.log('  --execute   Update products in Sanity\n');
}

fixVisitorSeries().catch(console.error);
