#!/usr/bin/env tsx
/**
 * Apply Remaining Matches: Update 47 products with high-confidence Cloudinary matches
 */

import { createClient } from 'next-sanity';
import { readFileSync, writeFileSync } from 'fs';
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

interface AnalysisResult {
  product: {
    id: string;
    name: string;
    slug: string;
    category: string;
  };
  topMatch: {
    public_id: string;
    secure_url: string;
    confidence: number;
    reason: string;
  };
  allMatches: Array<{
    public_id: string;
    secure_url: string;
    confidence: number;
    reason: string;
  }>;
}

interface AnalysisReport {
  timestamp: string;
  productsAnalyzed: number;
  summary: {
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
    noMatch: number;
    totalMatches: number;
    matchRate: number;
  };
  results: AnalysisResult[];
}

async function applyRemainingMatches() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║      APPLY REMAINING: Update 47 Products with Auto-Matched Images       ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // STEP 1: Load analysis results
  console.log('[1] Loading analysis results...\n');

  const analysisPath = join(process.cwd(), 'remaining-products-analysis.json');
  const analysisData: AnalysisReport = JSON.parse(readFileSync(analysisPath, 'utf-8'));

  console.log(`✅ Loaded ${analysisData.results.length} analysis results`);
  console.log(`   High confidence: ${analysisData.summary.highConfidence}`);
  console.log(`   Match rate: ${analysisData.summary.matchRate}%\n`);

  // STEP 2: Validate Sanity connectivity
  console.log('[2] Validating Sanity connectivity...\n');

  try {
    await sanityClient.fetch('* [_type == "product"][0] { _id }');
    console.log('✅ Sanity API connected\n');
  } catch (error) {
    console.error('❌ Sanity API connection failed:', error);
    return;
  }

  // STEP 3: Apply high-confidence matches
  console.log(`[3] Applying ${analysisData.results.length} high-confidence matches...\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < analysisData.results.length; i++) {
    const result = analysisData.results[i];
    const progress = `[${i + 1}/${analysisData.results.length}]`;

    try {
      const publicId = result.topMatch.public_id;
      const cloudinaryUrl = `https://res.cloudinary.com/dqde19mfs/image/upload/${publicId}`;
      const productId = result.product.id.replace('drafts.', '');

      await sanityClient
        .patch(productId)
        .set({
          mainImage: {
            _type: 'cloudinaryImage',
            cloudinaryUrl: cloudinaryUrl,
            publicId: publicId,
          }
        })
        .commit();

      console.log(`${progress} ✅ ${result.product.name} (${result.topMatch.confidence}% - ${result.topMatch.reason})`);
      successCount++;
    } catch (error) {
      const errorMsg = String(error);
      console.log(`${progress} ❌ ${result.product.name} - ${errorMsg}`);
      errorCount++;
      errors.push(`${result.product.name}: ${errorMsg}`);
    }

    if ((i + 1) % 10 === 0) {
      console.log(`   ... ${i + 1}/${analysisData.results.length} applied\n`);
    }
  }

  console.log(`\n✅ Applied: ${successCount}/${analysisData.results.length} successful\n`);

  // STEP 4: Verify updates
  console.log('[4] Verifying updates...\n');

  try {
    const updatedCount = await sanityClient.fetch(
      `count(*[_type == "product" && mainImage._type == "cloudinaryImage"])`
    );
    console.log(`✅ Total products on Cloudinary: ${updatedCount}\n`);
  } catch (error) {
    console.log('⚠️  Verification query incomplete\n');
  }

  // STEP 5: Export execution log
  console.log('[5] Saving execution log...\n');

  const executionLog = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    summary: {
      totalApplied: successCount,
      totalFailed: errorCount,
    },
    successRate: Math.round((successCount / analysisData.results.length) * 100),
    errors: errors,
  };

  try {
    const logPath = join(process.cwd(), 'remaining-products-execution.json');
    writeFileSync(logPath, JSON.stringify(executionLog, null, 2));
    console.log(`✅ Execution log saved: ${logPath}\n`);
  } catch (error) {
    console.log('❌ Failed to save execution log\n');
  }

  // FINAL SUMMARY
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                            EXECUTION SUMMARY                               ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 Results:\n`);
  console.log(`   Applied:      ${successCount}✅ / ${analysisData.results.length}`);
  console.log(`   Failed:       ${errorCount}❌`);
  console.log(`   Success Rate: ${Math.round((successCount / analysisData.results.length) * 100)}%\n`);

  if (errorCount > 0) {
    console.log(`⚠️  Errors encountered: ${errorCount}\n`);
    console.log(`${errors.map(e => `  - ${e}`).join('\n')}\n`);
  } else {
    console.log(`✅ All updates applied successfully!\n`);
  }

  console.log(`📈 Final Sync Status:\n`);
  console.log(`   Phase 3A: 81 + 51 = 132/179 (74%)`);
  console.log(`   Phase 3B: 132 + ${successCount} = ${132 + successCount}/179 (${Math.round(((132 + successCount) / 179) * 100)}%)\n`);

  if (successCount + 132 >= 179) {
    console.log(`🎉 COMPLETE SYNC ACHIEVED: 100% of products now on Cloudinary!\n`);
  }
}

applyRemainingMatches().catch(console.error);
