#!/usr/bin/env node
/**
 * Create Products from Final 26 Unmapped Components (Phase 3)
 * 
 * These are the last 26 Cloudinary assets without products.
 * Mostly components like legs, partitions, accessories.
 * We'll create products for complete coverage (299/299 = 100%).
 */

import { createClient } from 'next-sanity';
import { v2 as cloudinary } from 'cloudinary';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqde19mfs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
}

function generateProductName(publicId: string): string {
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  
  // Clean up and capitalize
  return filename
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function determineCategory(publicId: string): string {
  const lower = publicId.toLowerCase();
  
  if (lower.includes('legs') || lower.includes('leg')) return 'workstations';
  if (lower.includes('partition')) return 'storage';
  if (lower.includes('accessor')) return 'storage';
  if (lower.includes('apron')) return 'workstations';
  if (lower.includes('wire')) return 'accessories';
  if (lower.includes('raceway')) return 'accessories';
  
  return 'accessories';
}

async function generateUniqueSlug(publicId: string): Promise<string> {
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  let baseSlug = filename.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  let counter = 1;

  while (true) {
    const testSlug = counter === 1 ? baseSlug : `${baseSlug}-${counter}`;
    const existing = await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: testSlug }
    );
    if (!existing) return testSlug;
    counter++;
  }
}

async function createProduct(asset: CloudinaryAsset) {
  try {
    const name = generateProductName(asset.public_id);
    const slug = await generateUniqueSlug(asset.public_id);
    const category = determineCategory(asset.public_id);

    const product = {
      _type: 'product',
      name,
      slug: { _type: 'slug', current: slug },
      category,
      mainImage: {
        _type: 'cloudinaryImage',
        cloudinaryUrl: asset.secure_url,
        publicId: asset.public_id,
      },
      description: `Component/accessory from: ${asset.public_id}`,
      inStock: true,
      featured: false,
    };

    const result = await sanityClient.create(product);
    return { success: true, productId: result._id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

async function createFinalProducts() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║          CREATE PRODUCTS FROM FINAL 26 UNMAPPED ASSETS (Phase 3)          ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Step 1: Get all Cloudinary assets
  let allImages: CloudinaryAsset[] = [];
  let nextCursor: string | undefined = undefined;

  do {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'steelmade/',
      max_results: 500,
      next_cursor: nextCursor,
    });
    allImages.push(...result.resources.map((r: any) => ({
      public_id: r.public_id,
      secure_url: r.secure_url,
      format: r.format,
      width: r.width,
      height: r.height,
    })));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  console.log(`✅ Found ${allImages.length} Cloudinary assets\n`);

  // Step 2: Get all existing product publicIds
  const products = await sanityClient.fetch(`
    *[_type == "product" && defined(mainImage.publicId)] {
      "publicId": mainImage.publicId
    }
  `);

  const usedPublicIds = new Set(products.map((p: any) => p.publicId));

  console.log(`✅ Found ${products.length} products with Cloudinary images\n`);

  // Step 3: Identify unmapped
  const unmapped = allImages.filter(img => !usedPublicIds.has(img.public_id));

  console.log(`📊 UNMAPPED ASSETS: ${unmapped.length}\n`);

  if (unmapped.length === 0) {
    console.log('🎉 All assets already mapped! No work needed.\n');
    return;
  }

  // Check execution mode
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');

  if (!executeMode) {
    console.log('ℹ️  DRY RUN MODE - Preview only\n');
    console.log('📋 UNMAPPED ASSETS TO CREATE (first 10):\n');
    
    unmapped.slice(0, 10).forEach((asset, i) => {
      console.log(`[${i + 1}] ${generateProductName(asset.public_id)}`);
      console.log(`    Category: ${determineCategory(asset.public_id)}`);
      console.log(`    Image: ${asset.public_id}\n`);
    });

    console.log(`⚡ To create ${unmapped.length} products, run:`);
    console.log(`   npx tsx scripts/create-final-unmapped-products.ts --execute\n`);
    return;
  }

  // Step 4: Execute creation
  console.log(`[1] Creating ${unmapped.length} products...\n`);

  const results = {
    created: 0,
    failed: 0,
    errors: [] as Array<{ asset: string; error: string }>,
  };

  for (let i = 0; i < unmapped.length; i++) {
    const asset = unmapped[i];
    const num = i + 1;

    process.stdout.write(`[${num}/${unmapped.length}] ${generateProductName(asset.public_id)}... `);

    const result = await createProduct(asset);

    if (result.success) {
      results.created++;
      console.log(`✅ ${result.productId}`);
    } else {
      results.failed++;
      results.errors.push({ asset: asset.public_id, error: result.error || 'Unknown' });
      console.log(`❌ ${result.error}`);
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                          PHASE 3 COMPLETE                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📈 RESULTS:\n');
  console.log(`  ✅ Created: ${results.created}/${unmapped.length}`);
  console.log(`  ❌ Failed: ${results.failed}\n`);

  // Final verification
  const totalProducts = await sanityClient.fetch(`count(*[_type == "product"])`);
  const productsWithCloudinary = await sanityClient.fetch(
    `count(*[_type == "product" && defined(mainImage.cloudinaryUrl)])`
  );

  // Re-verify coverage
  const allProductPublicIds = await sanityClient.fetch(`
    *[_type == "product" && defined(mainImage.publicId)] {
      "publicId": mainImage.publicId
    }
  `);

  const finalUsedPublicIds = new Set(allProductPublicIds.map((p: any) => p.publicId));
  const finalCoverage = ((finalUsedPublicIds.size / allImages.length) *100).toFixed(1);

  console.log(`\n🎯 FINAL STATE:\n`);
  console.log(`  Total Products: ${totalProducts}`);
  console.log(`  Products with Cloudinary: ${productsWithCloudinary}`);
  console.log(`  Cloudinary Assets: ${allImages.length}`);
  console.log(`  Unique Assets Mapped: ${finalUsedPublicIds.size}/${allImages.length}`);
  console.log(`  Coverage: ${finalCoverage}%\n`);

  if (finalUsedPublicIds.size === allImages.length) {
    console.log('🎉🎉🎉 SUCCESS: 100% COVERAGE ACHIEVED! 🎉🎉🎉\n');
    console.log(`✅ All ${allImages.length} Cloudinary assets now have products!\n`);
  }

  // Save report
  const phase3Report = {
    timestamp: new Date().toISOString(),
    phase: 'Phase 3: Final Components',
    unmappedCount: unmapped.length,
    results,
    finalProductCount: totalProducts,
    finalCoverage: finalCoverage + '%',
  };

  const phase3Path = join(process.cwd(), 'product-creation-phase3-execution.json');
  writeFileSync(phase3Path, JSON.stringify(phase3Report, null, 2));
  console.log(`📄 Phase 3 report saved to: product-creation-phase3-execution.json\n`);
}

// Execute
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('\n⚠️  No arguments provided. Running in DRY RUN mode.\n');
  console.log('Options:');
  console.log('  --execute   Create products in Sanity\n');
}

createFinalProducts().catch(console.error);
