/**
 * Sanity-Cloudinary Parity Verification Tool
 * 
 * Ensures all Sanity products have valid Cloudinary image URLs
 * Usage:
 *   npx tsx scripts/verify-sanity-cloudinary-parity.ts
 *   npx tsx scripts/verify-sanity-cloudinary-parity.ts --json
 *   npx tsx scripts/verify-sanity-cloudinary-parity.ts --fix-report
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from 'next-sanity';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface VerificationResult {
  totalProducts: number;
  productsWithImages: number;
  productsWithoutImages: number;
  missingImages: Array<{
    id: string;
    name: string;
    category: string;
    series: string;
  }>;
  categoryStats: Record<string, {
    total: number;
    withImages: number;
    withoutImages: number;
  }>;
  cloudinaryStats: {
    validUrls: number;
    invalidUrls: number;
    issues: string[];
  };
  passing: boolean;
}

async function verifyParity(): Promise<VerificationResult> {
  try {
    const query = `*[_type == "product"] | order(category asc, series asc, name asc) {
      _id,
      name,
      "id": slug.current,
      category,
      series,
      mainImage,
      "mainImageUrl": coalesce(mainImage.cloudinaryUrl, mainImage.asset->url),
      "variants": variants[]{
        id,
        name,
        "imageUrl": image.asset->url
      }
    }`;

    const products: any[] = await client.fetch(query);

    const result: VerificationResult = {
      totalProducts: products.length,
      productsWithImages: 0,
      productsWithoutImages: 0,
      missingImages: [],
      categoryStats: {},
      cloudinaryStats: {
        validUrls: 0,
        invalidUrls: 0,
        issues: [],
      },
      passing: true,
    };

    const CLOUDINARY_BASE = /^https:\/\/res\.cloudinary\.com\/dqde19mfs\//;
    const SANITY_CDN_BASE = /^https:\/\/cdn\.sanity\.io\//;

    products.forEach((p) => {
      const cat = p.category || 'uncategorized';
      if (!result.categoryStats[cat]) {
        result.categoryStats[cat] = {
          total: 0,
          withImages: 0,
          withoutImages: 0,
        };
      }
      result.categoryStats[cat].total++;

      if (!p.mainImageUrl) {
        result.productsWithoutImages++;
        result.categoryStats[cat].withoutImages++;
        result.missingImages.push({
          id: p.id,
          name: p.name,
          category: cat,
          series: p.series || 'unassigned',
        });
      } else {
        result.productsWithImages++;
        result.categoryStats[cat].withImages++;

        // Check URL format
        if (SANITY_CDN_BASE.test(p.mainImageUrl)) {
          result.cloudinaryStats.invalidUrls++;
          result.cloudinaryStats.issues.push(
            `${p.name} still uses Sanity CDN: ${p.mainImageUrl.substring(0, 50)}...`
          );
          result.passing = false;
        } else if (!CLOUDINARY_BASE.test(p.mainImageUrl)) {
          result.cloudinaryStats.invalidUrls++;
          result.cloudinaryStats.issues.push(
            `${p.name} has unexpected URL format: ${p.mainImageUrl.substring(0, 50)}...`
          );
          result.passing = false;
        } else {
          result.cloudinaryStats.validUrls++;
        }
      }
    });

    // Check for critical issues
    if (result.productsWithoutImages > 0) {
      result.passing = false;
    }

    return result;
  } catch (error) {
    console.error('Error during verification:', (error as Error).message);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const fixReport = args.includes('--fix-report');

  const result = await verifyParity();

  if (isJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║      SANITY-CLOUDINARY PARITY VERIFICATION REPORT         ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log(`📊 SUMMARY`);
    console.log(`─────────────────────────────────────────────────────────────`);
    console.log(`Total Products:           ${result.totalProducts}`);
    console.log(`With Valid Images:        ${result.productsWithImages} ✅`);
    console.log(`Missing Images:           ${result.productsWithoutImages} ❌`);

    console.log(`\n📁 CATEGORY BREAKDOWN`);
    console.log(`─────────────────────────────────────────────────────────────`);
    Object.entries(result.categoryStats).forEach(([cat, stats]) => {
      const pct = ((stats.withImages / stats.total) * 100).toFixed(0);
      const status = stats.withoutImages === 0 ? '✅' : '❌';
      console.log(
        `${status} ${cat.padEnd(25)} ${stats.total.toString().padStart(3)} products | ${pct}% complete`
      );
    });

    console.log(`\n🖼️  CLOUDINARY URL VALIDATION`);
    console.log(`─────────────────────────────────────────────────────────────`);
    console.log(`Valid Cloudinary URLs:    ${result.cloudinaryStats.validUrls} ✅`);
    console.log(`Invalid/Stale URLs:       ${result.cloudinaryStats.invalidUrls} ❌`);

    if (result.cloudinaryStats.issues.length > 0) {
      console.log(`\n⚠️  URL ISSUES FOUND:`);
      result.cloudinaryStats.issues.slice(0, 5).forEach((issue) => {
        console.log(`  • ${issue}`);
      });
      if (result.cloudinaryStats.issues.length > 5) {
        console.log(`  ... and ${result.cloudinaryStats.issues.length - 5} more`);
      }
    }

    if (result.missingImages.length > 0) {
      console.log(`\n❌ PRODUCTS MISSING IMAGES (${result.missingImages.length}):`);
      result.missingImages.slice(0, 10).forEach((p) => {
        console.log(`  • ${p.name.padEnd(40)} (${p.series})`);
      });
      if (result.missingImages.length > 10) {
        console.log(`  ... and ${result.missingImages.length - 10} more`);
      }
    }

    console.log(`\n${result.passing ? '✅ PASSING' : '❌ FAILING'}`);
    if (!result.passing) {
      console.log('Action required: Reconcile missing images in Sanity');
    }
    console.log('\n');
  }

  // Write report file if requested
  if (fixReport) {
    const reportPath = path.join(__dirname, '..', 'sanity-cloudinary-parity-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
    console.log(`📄 Report saved to: ${reportPath}`);
  }

  // Exit with appropriate code
  process.exit(result.passing ? 0 : 1);
}

main();
