/**
 * Image Migration Report & Display Utilities
 */

import { MigrationReport } from './image-migration.js';

export const printAnalysisReport = (report: MigrationReport): void => {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║    CLOUDINARY IMAGE MIGRATION ANALYSIS REPORT             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 SUMMARY`);
  console.log(`─────────────────────────────────────────────────────────────`);
  console.log(`Total Products:           ${report.summary.total}`);
  console.log(`Can Auto-Migrate:         ${report.summary.autoMigrate} ✅`);
  console.log(`Need Manual Assignment:   ${report.summary.manualAssign} ⚠️`);
  console.log(`Missing Images:           ${report.summary.noImage} ❌`);

  console.log(`\n📈 MIGRATION STATISTICS`);
  console.log(`─────────────────────────────────────────────────────────────`);
  console.log(`Sanity CDN URLs:          ${report.stats.sanityUrlsFound}`);
  console.log(`Cloudinary URLs:          ${report.stats.cloudinaryUrlsFound}`);
  console.log(`Missing Images:           ${report.stats.missingImages}`);

  if (report.migrations.auto.length > 0) {
    console.log(`\n✅ AUTO-MIGRATE CANDIDATES (${report.migrations.auto.length}):`);
    report.migrations.auto.slice(0, 5).forEach((m) => {
      console.log(`   • ${m.productName.padEnd(40)}`);
    });
    if (report.migrations.auto.length > 5) {
      console.log(`   ... and ${report.migrations.auto.length - 5} more`);
    }
  }

  if (report.migrations.manual.length > 0) {
    console.log(`\n⚠️  MANUAL REVIEW NEEDED (${report.migrations.manual.length}):`);
    report.migrations.manual.slice(0, 5).forEach((m) => {
      console.log(`   • ${m.productName.padEnd(40)} ${m.reason.substring(0, 30)}`);
    });
    if (report.migrations.manual.length > 5) {
      console.log(`   ... and ${report.migrations.manual.length - 5} more`);
    }
  }

  if (report.migrations.noImage.length > 0) {
    console.log(`\n❌ NO IMAGES FOUND (${report.migrations.noImage.length}):`);
    report.migrations.noImage.slice(0, 5).forEach((m) => {
      console.log(`   • ${m.productName.padEnd(40)}`);
    });
    if (report.migrations.noImage.length > 5) {
      console.log(`   ... and ${report.migrations.noImage.length - 5} more`);
    }
  }

  console.log('\n');
};

export const printPreviewMode = (report: MigrationReport): void => {
  console.log(`\n📋 PREVIEW MODE: Showing first 3 auto-migration changes`);
  console.log(`─────────────────────────────────────────────────────────────`);
  report.migrations.auto.slice(0, 3).forEach((action) => {
    console.log(`\n${action.productId}:`);
    console.log(`  Current:  ${action.currentUrl?.substring(0, 60)}...`);
    console.log(`  → New:    ${action.suggestedCloudinaryUrl?.substring(0, 60)}...`);
  });

  if (report.migrations.auto.length > 3) {
    console.log(
      `\n... and ${report.migrations.auto.length - 3} more migrations`
    );
  }
};
