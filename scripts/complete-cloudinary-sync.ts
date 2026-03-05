#!/usr/bin/env tsx
/**
 * Complete Cloudinary-Sanity Sync Workflow
 * 
 * Orchestrates the complete sync process:
 * 1. Apply categorization
 * 2. Re-match Cloudinary images
 * 3. Verify results
 * 4. Report remaining gaps
 */

import { execSync } from 'child_process';

function run(command: string, description: string) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📋 ${description}`);
  console.log(`${'='.repeat(80)}`);
  console.log(`\n▶️  ${command}\n`);
  
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`\n✅ ${description} - COMPLETE`);
    return true;
  } catch (error) {
    console.error(`\n❌ ${description} - FAILED`);
    return false;
  }
}

async function completeSync() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║           COMPLETE CLOUDINARY-SANITY SYNC WORKFLOW                        ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('This workflow will:');
  console.log('  1. Show current state');
  console.log('  2. Apply categorization fixes (70 products)');
  console.log('  3. Re-match Cloudinary images with better metadata');
  console.log('  4. Verify final state');
  console.log('  5. Report remaining manual work\n');

  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  } else {
    console.log('⚠️  LIVE MODE - Changes will be applied!\n');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  // Step 1: Current state
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         STEP 1: CURRENT STATE                              ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  
  run('npx tsx scripts/verify-sanity-cloudinary-parity.ts', 'Check current Cloudinary sync status');

  if (dryRun) {
    console.log('\n\n');
    console.log('╔════════════════════════════════════════════════════════════════════════════╗');
    console.log('║                    DRY RUN - PREVIEW ONLY                                  ║');
    console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('Would execute:');
    console.log('  1. Apply 70 categorization fixes');
    console.log('  2. Re-match Cloudinary images (expect 40-60 new matches)');
    console.log('  3. Final verification\n');
    console.log('To execute, run without --dry-run flag:\n');
    console.log('  npx tsx scripts/complete-cloudinary-sync.ts\n');
    return;
  }

  // Step 2: Apply categorization
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                  STEP 2: APPLY CATEGORIZATION                              ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  
  const categorizationSuccess = run(
    'npx tsx scripts/apply-categorization-fixes.ts --execute',
    'Apply categorization to 70 uncategorized products'
  );

  if (!categorizationSuccess) {
    console.log('\n⚠️  Categorization failed - continuing with next steps anyway...\n');
  }

  // Step 3: Re-match Cloudinary images
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                  STEP 3: RE-MATCH CLOUDINARY IMAGES                        ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  
  console.log('\n📊 Analyzing with updated metadata...\n');
  run('npx tsx scripts/fetch-cloudinary-images.ts --analyze', 'Analyze Cloudinary matches');
  
  console.log('\n\n🎯 Applying new matches...\n');
  const matchingSuccess = run(
    'echo "" | npx tsx scripts/fetch-cloudinary-images.ts --execute',
    'Apply Cloudinary image matches'
  );

  if (!matchingSuccess) {
    console.log('\n⚠️  Image matching had issues - check errors above\n');
  }

  // Step 4: Final verification
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                     STEP 4: FINAL VERIFICATION                             ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  
  run('npx tsx scripts/verify-sanity-cloudinary-parity.ts', 'Verify final state');

  // Step 5: Gap analysis
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                   STEP 5: REMAINING GAPS ANALYSIS                          ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝');
  
  run('npx tsx scripts/analyze-sync-gaps.ts', 'Analyze remaining gaps');

  // Summary
  console.log('\n\n');
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         WORKFLOW COMPLETE                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📊 Check the verification output above for final metrics\n');
  console.log('📄 Detailed gap analysis saved to: sync-gap-analysis.json\n');
  console.log('🎯 Next Steps:\n');
  console.log('   1. Review unmapped-cloudinary-images.json for suggested mappings');
  console.log('   2. Manually assign remaining products (if any)');
  console.log('   3. Update beads:');
  console.log('      - bd close steelmade-6md --reason "70 products categorized"');
  console.log('      - bd update steelmade-ucs --append-notes "Sync progress: [results]"');
  console.log('   4. Test website to ensure all products display correctly\n');
}

completeSync().catch(console.error);
