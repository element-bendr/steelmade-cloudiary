#!/usr/bin/env node
/**
 * Create Products from Variants and Review Items
 * 
 * Phase 2: Creates products from the 113 variants + 11 review items (124 total)
 * These were initially flagged as variants or needing review, but to achieve
 * full 299/299 coverage, we'll create standalone products for them.
 * 
 * Components (45) will remain flagged for manual component library setup.
 */

import { createClient } from 'next-sanity';
import { readFileSync, writeFileSync } from 'fs';
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

interface UnmappedAsset {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  suggestedName: string;
  suggestedSlug: string;
  suggestedCategory: string;
  suggestedSeries: string | null;
  confidence: string;
}

/**
 * Generate better product names for variants
 * e.g., "ic-228-arms" → "IC-228 with Arms"
 */
function generateVariantName(asset: UnmappedAsset): string {
  const parts = asset.public_id.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  
  // Extract model name from parent folder
  const model = parts[parts.length - 2] || '';
  const modelName = model
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Handle suffix patterns
  if (filename.endsWith('-hb')) {
    return `${modelName} High Back`;
  }
  if (filename.endsWith('-mb')) {
    return `${modelName} Mid Back`;
  }
  if (filename.endsWith('-lb')) {
    return `${modelName} Low Back`;
  }
  if (filename.endsWith('-arms')) {
    return `${modelName} with Arms`;
  }
  
  // Handle letter suffixes (A, B, C, etc.)
  const letterMatch = filename.match(/([A-Z])$/);
  if (letterMatch) {
    return `${modelName} Variant ${letterMatch[1]}`;
  }

  // Default: capitalize and clean filename
  const variantName = filename
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return variantName;
}

/**
 * Generate unique slug
 */
async function generateUniqueSlug(publicId: string): Promise<string> {
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  
  // Use full path for uniqueness
  let baseSlug = filename.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  let counter = 1;

  while (true) {
    const testSlug = counter === 1 ? baseSlug : `${baseSlug}-${counter}`;
    const existing = await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: testSlug }
    );

    if (!existing) {
      return testSlug;
    }
    counter++;
  }
}

/**
 * Create product
 */
async function createProduct(asset: UnmappedAsset) {
  try {
    const name = generateVariantName(asset);
    const slug = await generateUniqueSlug(asset.public_id);

    const product = {
      _type: 'product',
      name,
      slug: { _type: 'slug', current: slug },
      category: asset.suggestedCategory,
      series: asset.suggestedSeries || undefined,
      mainImage: {
        _type: 'cloudinaryImage',
        cloudinaryUrl: asset.secure_url,
        publicId: asset.public_id,
      },
      description: `Product variant from: ${asset.public_id}`,
      inStock: true,
      featured: false,
    };

    const result = await sanityClient.create(product);
    return { success: true, productId: result._id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

async function createVariantsAndReviewProducts() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║         CREATE PRODUCTS FROM VARIANTS & REVIEW ITEMS (Phase 2)             ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Load execution report from Phase 1
  const reportPath = join(process.cwd(), 'product-creation-execution.json');
  const report = JSON.parse(readFileSync(reportPath, 'utf-8'));

  const variants: UnmappedAsset[] = report.plan.variants || [];
  const needsReview: UnmappedAsset[] = report.plan.needsReview || [];
  const toCreate = [...variants, ...needsReview];

  console.log(`📊 ASSETS TO CONVERT:\n`);
  console.log(`  Variants: ${variants.length}`);
  console.log(`  Needs Review: ${needsReview.length}`);
  console.log(`  Total to Create: ${toCreate.length}\n`);

  // Check execution mode
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');

  if (!executeMode) {
    console.log('ℹ️  DRY RUN MODE - Preview only\n');
    console.log('📋 SAMPLE PRODUCTS (first 10):\n');
    
    toCreate.slice(0, 10).forEach((asset, i) => {
      console.log(`[${i + 1}] ${generateVariantName(asset)}`);
      console.log(`    Category: ${asset.suggestedCategory}`);
      console.log(`    Image: ${asset.public_id}\n`);
    });

    console.log(`⚡ To create ${toCreate.length} products, run:`);
    console.log(`   npx tsx scripts/create-variants-and-review-products.ts --execute\n`);
    return;
  }

  // Execute creation
  console.log(`[1] Creating ${toCreate.length} products...\n`);

  const results = {
    created: 0,
    failed: 0,
    errors: [] as Array<{ asset: string; error: string }>,
  };

  for (let i = 0; i < toCreate.length; i++) {
    const asset = toCreate[i];
    const num = i + 1;

    process.stdout.write(`[${num}/${toCreate.length}] ${generateVariantName(asset)}... `);

    const result = await createProduct(asset);

    if (result.success) {
      results.created++;
      console.log(`✅ ${result.productId}`);
    } else {
      results.failed++;
      results.errors.push({ asset: asset.public_id, error: result.error || 'Unknown' });
      console.log(`❌ ${result.error}`);
    }

    // Rate limiting
    if (num % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                          PHASE 2 COMPLETE                                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📈 RESULTS:\n');
  console.log(`  ✅ Created: ${results.created}/${toCreate.length}`);
  console.log(`  ❌ Failed: ${results.failed}\n`);

  if (results.errors.length > 0) {
    console.log('❌ ERRORS:\n');
    results.errors.forEach(err => {
      console.log(`  ${err.asset}: ${err.error}`);
    });
  }

  // Final verification
  const totalProducts = await sanityClient.fetch(`count(*[_type == "product"])`);
  const productsWithCloudinary = await sanityClient.fetch(
    `count(*[_type == "product" && defined(mainImage.cloudinaryUrl)])`
  );

  console.log(`\n🎯 FINAL STATE:\n`);
  console.log(`  Total Products: ${totalProducts}`);
  console.log(`  Products with Cloudinary: ${productsWithCloudinary}\n`);

  // Save report
  const phase2Report = {
    timestamp: new Date().toISOString(),
    phase: 'Phase 2: Variants and Review',
    variantsCreated: variants.length,
    reviewCreated: needsReview.length,
    results,
    finalProductCount: totalProducts,
  };

  const phase2Path = join(process.cwd(), 'product-creation-phase2-execution.json');
  writeFileSync(phase2Path, JSON.stringify(phase2Report, null, 2));
  console.log(`📄 Phase 2 report saved to: product-creation-phase2-execution.json\n`);

  console.log('📋 REMAINING:\n');
  console.log(`  45 components flagged for component library`);
  console.log(`  (Components like legs, partitions, accessories)\n`);
}

// Execute
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('\n⚠️  No arguments provided. Running in DRY RUN mode.\n');
  console.log('Options:');
  console.log('  --execute   Create products in Sanity\n');
}

createVariantsAndReviewProducts().catch(console.error);
