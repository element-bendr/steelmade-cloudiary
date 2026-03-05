#!/usr/bin/env tsx
/**
 * Apply Recovery: Update 51 Sanity CDN products to Cloudinary URLs
 * 
 * This script takes the 51 recovery matches and applies them to Sanity products.
 * Updates mainImage.cloudinaryUrl and mainImage.publicId for each product.
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

interface RecoveryMatch {
  product: {
    id: string;
    name: string;
    slug: string;
    originalFile: string;
    fileSize: number;
  };
  topMatch: {
    public_id: string;
    url: string;
    confidence: number;
    reason: string;
  };
  allMatches: Array<{
    image: {
      public_id: string;
      url: string;
      secure_url: string;
      bytes: number;
    };
    confidence: number;
    reason: string;
  }>;
}

interface RecoveryPlan {
  results: RecoveryMatch[];
  summary: {
    productsAnalyzed: number;
    matchesFound: number;
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
  };
  timestamp: string;
}

interface UpdateLog {
  step: number;
  action: string;
  timestamp: string;
  status: 'in-progress' | 'success' | 'error';
  details?: string;
  affectedProducts?: number;
  error?: string;
}

async function applySanityRecovery() {
  const logs: UpdateLog[] = [];
  let stepNum = 0;

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║        APPLY RECOVERY: Sanity CDN → Cloudinary URL Migration           ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // STEP 1: Load recovery plan
  stepNum++;
  console.log(`[${stepNum}] Loading recovery plan...\n`);
  logs.push({
    step: stepNum,
    action: 'Load recovery plan',
    timestamp: new Date().toISOString(),
    status: 'in-progress',
  });

  const recoveryPath = join(process.cwd(), 'sanity-cloudinary-recovery-plan.json');
  const recoveryData: RecoveryPlan = JSON.parse(readFileSync(recoveryPath, 'utf-8'));

  const allMatches = recoveryData.results;

  console.log(`✅ Loaded ${allMatches.length} recovery matches`);
  console.log(`   - High confidence (≥90%): ${recoveryData.summary.highConfidence}`);
  console.log(`   - Medium confidence (75-89%): ${recoveryData.summary.mediumConfidence}`);
  console.log(`   - Low confidence (70-74%): ${recoveryData.summary.lowConfidence}\n`);

  logs[logs.length - 1] = {
    ...logs[logs.length - 1],
    status: 'success',
    details: `${allMatches.length} total matches loaded`,
    affectedProducts: allMatches.length,
  };

  // STEP 2: Validate Sanity connectivity
  stepNum++;
  console.log(`[${stepNum}] Validating Sanity connectivity...\n`);
  logs.push({
    step: stepNum,
    action: 'Validate Sanity connectivity',
    timestamp: new Date().toISOString(),
    status: 'in-progress',
  });

  try {
    const testQuery = await sanityClient.fetch('* [_type == "product"][0] { _id }');
    console.log('✅ Sanity API connected successfully\n');
    logs[logs.length - 1].status = 'success';
  } catch (error) {
    console.error('❌ Sanity API connection failed:', error);
    logs[logs.length - 1] = {
      ...logs[logs.length - 1],
      status: 'error',
      error: String(error),
    };
    return;
  }

  // STEP 3: Apply recovery matches
  stepNum++;
  console.log(`[${stepNum}] Applying ${allMatches.length} recovery matches...\n`);
  logs.push({
    step: stepNum,
    action: 'Apply recovery matches',
    timestamp: new Date().toISOString(),
    status: 'in-progress',
    affectedProducts: allMatches.length,
  });

  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < allMatches.length; i++) {
    const match = allMatches[i];
    const progress = `[${i + 1}/${allMatches.length}]`;
    const confidence = match.topMatch.confidence;

    try {
      // Use the product.id which is the Sanity document ID
      const productId = match.product.id.replace('drafts.', ''); // Remove drafts. prefix if present

      // Build Cloudinary URL from public_id
      const publicId = match.topMatch.public_id;
      const cloudinaryUrl = `https://res.cloudinary.com/dqde19mfs/image/upload/${publicId}`;

      // Replace mainImage with cloudinaryImage type (matching fetch-cloudinary-images.ts)
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

      const confidenceMarker = confidence >= 90 ? '✅' : '🟡';
      console.log(`${progress} ${confidenceMarker} ${match.product.name} (${confidence}% - ${match.topMatch.reason})`);
      successCount++;
    } catch (error) {
      const errorMsg = String(error);
      console.log(`${progress} ❌ ${match.product.name} - ${errorMsg}`);
      errorCount++;
      errors.push(`${match.product.name}: ${errorMsg}`);
    }

    // Progress checkpoint every 10
    if ((i + 1) % 10 === 0) {
      console.log(`   ... ${i + 1}/${allMatches.length} completed\n`);
    }
  }

  console.log(`\n✅ Applied: ${successCount}/${allMatches.length} successful\n`);
  logs[logs.length - 1] = {
    ...logs[logs.length - 1],
    status: errorCount === 0 ? 'success' : 'error',
    details: `${successCount} successful, ${errorCount} errors`,
  };

  // STEP 4: Apply medium-confidence matches (SKIP - all in results)
  stepNum++;
  console.log(`[${stepNum}] Confidence breakdown:\n`);
  logs.push({
    step: stepNum,
    action: 'Confidence analysis',
    timestamp: new Date().toISOString(),
    status: 'success',
    details: `High: ${recoveryData.summary.highConfidence}, Medium: ${recoveryData.summary.mediumConfidence}, Low: ${recoveryData.summary.lowConfidence}`,
  });

  // STEP 5: Final verification
  stepNum++;
  console.log(`[${stepNum}] Verifying updated products...\n`);
  logs.push({
    step: stepNum,
    action: 'Verify updates',
    timestamp: new Date().toISOString(),
    status: 'in-progress',
  });

  try {
    const totalSuccess = highSuccessCount + mediumSuccessCount;
    const verificationQuery = await sanityClient.fetch(
      `count(*[_type == "product" && defined(mainImage.cloudinaryUrl) && mainImage.cloudinaryUrl != ""])`
    );

    console.log(`✅ Verification: ${verificationQuery} products now use Cloudinary URLs\n`);
    logs[logs.length - 1].status = 'success';
    logs[logs.length - 1].details = `${verificationQuery} products verified`;
  } catch (error) {
    console.log('⚠️  Verification query incomplete');
    logs[logs.length - 1].status = 'error';
  }

  // STEP 6: Export execution log
  stepNum++;
  console.log(`[${stepNum}] Saving execution log...\n`);
  logs.push({
    step: stepNum,
    action: 'Save execution log',
    timestamp: new Date().toISOString(),
    status: 'in-progress',
  });

  const executionLog = {
    startTime: logs[0].timestamp,
    endTime: new Date().toISOString(),
    totalSteps: stepNum,
    summary: {
      totalApplied: successCount,
      totalFailed: errorCount,
    },
    steps: logs,
    errors: errors,
  };

  try {
    const logPath = join(process.cwd(), 'sanity-recovery-execution.json');
    writeFileSync(logPath, JSON.stringify(executionLog, null, 2));
    console.log(`✅ Execution log saved: ${logPath}\n`);
    logs[logs.length - 1].status = 'success';
  } catch (error) {
    console.log('❌ Failed to save execution log');
    logs[logs.length - 1].status = 'error';
  }

  // FINAL SUMMARY
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                            EXECUTION SUMMARY                               ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  const totalApplied = successCount;
  const totalFailed = errorCount;

  console.log(`📊 Results:\n`);
  console.log(`   Applied:   ${totalApplied}✅ / ${allMatches.length}`);
  console.log(`   Failed:    ${totalFailed}❌`);
  console.log(`   Success Rate: ${Math.round((totalApplied / allMatches.length) * 100)}%\n`);

  if (totalFailed > 0) {
    console.log(`⚠️  Errors encountered: ${totalFailed}\n`);
    if (errors.length > 0) {
      console.log(`Errors:\n${errors.map(e => `  - ${e}`).join('\n')}\n`);
    }
  } else {
    console.log(`✅ All updates applied successfully!\n`);
  }

  console.log(`📈 Sync Impact:\n`);
  console.log(`   Before: 81/179 products on Cloudinary (45%)`);
  console.log(`   Applied: ${totalApplied} products recovered from Sanity CDN`);
  console.log(`   After: ${81 + totalApplied}/179 products on Cloudinary (${Math.round(((81 + totalApplied) / 179) * 100)}%)\n`);

  console.log(`✅ Next: Run verification script to confirm all products are synced\n`);
  console.log(`   Command: npx tsx scripts/verify-sanity-cloudinary-parity.ts\n`);
}

applySanityRecovery().catch(console.error);
