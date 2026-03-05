/**
 * Cloudinary Image Assignment & Migration Tool
 *
 * Handles image migration from Sanity CDN to Cloudinary, identifies
 * products needing manual image assignment, and generates detailed reports.
 *
 * Usage:
 *   npx tsx scripts/assign-cloudinary-images.ts --analyze
 *   npx tsx scripts/assign-cloudinary-images.ts --preview
 *   npx tsx scripts/assign-cloudinary-images.ts --execute
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from 'next-sanity';
import fs from 'fs';
import readline from 'readline';
import {
  analyzeMigrations,
  type ProductImage,
  type MigrationAction,
  type MigrationReport,
} from './lib/image-migration.js';
import { printAnalysisReport, printPreviewMode } from './lib/report-formatter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const fetchAllProducts = async (): Promise<ProductImage[]> => {
  const query = `*[_type == "product"] | order(category asc, name asc) {
    _id,
    name,
    "id": slug.current,
    category,
    series,
    "mainImage": {
      "url": mainImage.asset->url,
      "assetId": mainImage.asset._id
    },
    "variants": variants[]{
      "url": image.asset->url,
      "assetId": image.asset._id
    }
  }`;

  const products: any[] = await client.fetch(query);

  // Ensure variants is always an array
  return products.map((p) => ({
    ...p,
    variants: Array.isArray(p.variants) ? p.variants : [],
  }));
};

const saveReport = (report: MigrationReport, filename: string): void => {
  const filepath = path.join(__dirname, '..', filename);
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(`📄 Report saved: ${filename}`);
};

const confirmWithUser = async (message: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
};

const executeAutoMigrations = async (
  actions: MigrationAction[]
): Promise<{ success: number; failed: number }> => {
  console.log(`\n🚀 Executing ${actions.length} auto-migrations...\n`);

  const results = { success: 0, failed: 0 };

  for (const action of actions) {
    try {
      if (!action.suggestedCloudinaryUrl) {
        console.log(`⏭️  Skipping ${action.productName} (no URL generated)`);
        continue;
      }

      await client
        .patch(action.productId)
        .set({
          mainImageUrl: action.suggestedCloudinaryUrl,
        })
        .commit();

      console.log(`✅ ${action.productName}: ${action.suggestedCloudinaryUrl}`);
      results.success++;
    } catch (error) {
      console.error(
        `❌ ${action.productName}: ${(error as Error).message}`
      );
      results.failed++;
    }
  }

  return results;
};

const main = async (): Promise<void> => {
  try {
    const args = process.argv.slice(2);
    const mode = args[0] || '--analyze';

    console.log('🔄 Fetching products from Sanity...');
    const products = await fetchAllProducts();

    console.log(`📦 Analyzing ${products.length} products...`);
    const report = analyzeMigrations(products);

    if (mode === '--analyze') {
      printAnalysisReport(report);
      saveReport(report, 'image-migration-map.json');
    }

    if (mode === '--preview') {
      printAnalysisReport(report);
      saveReport(report, 'image-migration-map.json');
      printPreviewMode(report);
    }

    if (mode === '--execute') {
      printAnalysisReport(report);

      if (report.migrations.auto.length === 0) {
        console.log('✅ No auto-migrations available.');
        return;
      }

      const confirmed = await confirmWithUser(
        `\n⚠️  This will update ${report.migrations.auto.length} products in Sanity. ` +
        `Continue? (yes/no): `
      );

      if (!confirmed) {
        console.log('❌ Migration cancelled.');
        return;
      }

      const results = await executeAutoMigrations(
        report.migrations.auto
      );
      saveReport(report, 'image-migration-map.json');

      console.log(`\n📊 EXECUTION COMPLETE`);
      console.log(`─────────────────────────────────────────────────────────────`);
      console.log(`✅ Success: ${results.success}`);
      console.log(`❌ Failed:  ${results.failed}`);
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
    process.exit(1);
  }
};

main();
