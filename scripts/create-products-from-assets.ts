#!/usr/bin/env node
/**
 * Create Products from Unmapped Cloudinary Assets
 * 
 * This script creates new Sanity products from the 266 unmapped Cloudinary images.
 * It uses intelligent categorization to identify:
 * 1. Standalone products (chairs, desks, etc.) → Create as products
 * 2. Components (legs, partitions, aprons) → Flag for component library
 * 3. Variants (color options, sizes) → Link to parent products
 * 
 * Strategy:
 * - Auto-create high-confidence standalone products
 * - Review medium-confidence items
 * - Flag low-confidence and components for manual review
 */

import { createClient } from 'next-sanity';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Configure Sanity with write token
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
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  folder: string;
  suggestedName: string;
  suggestedSlug: string;
  suggestedCategory: string;
  suggestedSeries: string | null;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

interface ProductCreationPlan {
  toCreate: UnmappedAsset[];
  components: UnmappedAsset[];
  variants: UnmappedAsset[];
  needsReview: UnmappedAsset[];
}

/**
 * Analyze asset to determine if it's a component, variant, or standalone product
 */
function categorizeAsset(asset: UnmappedAsset): 'product' | 'component' | 'variant' | 'review' {
  const publicId = asset.public_id.toLowerCase();
  const filename = publicId.split('/').pop() || '';

  // Component indicators
  const componentKeywords = [
    'leg', 'legs', 'partition', 'apron', 'wire-management',
    'accessory', 'accessories', 'hardware', 'bracket',
    'frame', 'panel', 'connector', 'mount'
  ];

  if (componentKeywords.some(keyword => publicId.includes(keyword))) {
    return 'component';
  }

  // Variant indicators (color codes, size suffixes, view angles)
  const variantPatterns = [
    /-\d{3}[a-z]$/i,  // ic-294A (letter suffix)
    /-(hb|mb|lb)$/i,  // high-back, mid-back, low-back
    /-(arms?)$/i,     // with arms
    /-(black|white|red|blue|green|grey|gray)$/i,  // color variants
    /-v\d+$/i,        // v1, v2 versions
  ];

  if (variantPatterns.some(pattern => pattern.test(filename))) {
    return 'variant';
  }

  // If it has clear category and series → likely a product
  if (asset.suggestedCategory !== 'uncategorized' && asset.suggestedSeries) {
    // But if name is just code-like (ic-xxx), flag for review
    if (/^[a-z]{1,3}[-_]?\d+$/i.test(asset.suggestedName.trim())) {
      return 'review';
    }
    return 'product';
  }

  // Default to review for ambiguous cases
  return 'review';
}

/**
 * Improve product name generation from metadata
 */
function generateProductName(asset: UnmappedAsset): string {
  const parts = asset.public_id.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');

  // If in a well-named folder, use folder + filename
  if (parts.length >= 4) {
    const category = parts[1]; // e.g., 'chairs'
    const series = parts[2].replace(/-/g, ' ').replace(/_/g, ' '); // e.g., 'ergonomic-series'
    const model = parts[3].replace(/-/g, ' ').replace(/_/g, ' '); // e.g., 'honda'
    const variant = filename.replace(/-/g, ' ').replace(/_/g, ' ');

    // Build name: "Honda Ergonomic Chair"
    return `${capitalize(model)} ${capitalize(series.replace(' series', ''))} ${capitalize(category.slice(0, -1))}`;
  }

  // Fallback to filename cleanup
  return filename
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(' ')
    .map(capitalize)
    .join(' ');
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate unique slug ensuring no conflicts
 */
async function generateUniqueSlug(baseName: string, publicId: string): Promise<string> {
  // Extract meaningful parts from public_id for slug
  const parts = publicId.split('/');
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, '');
  
  // Try: model-series-variant
  if (parts.length >= 4) {
    const model = parts[3];
    const variant = filename;
    const baseSlug = `${model}-${variant}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    // Check if slug exists
    const existing = await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: baseSlug }
    );

    if (!existing) {
      return baseSlug;
    }
  }

  // Fallback: use full filename with random suffix if needed
  let slug = filename.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  let counter = 1;

  while (true) {
    const testSlug = counter === 1 ? slug : `${slug}-${counter}`;
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
 * Create a single product in Sanity
 */
async function createProduct(asset: UnmappedAsset): Promise<{ success: boolean; productId?: string; error?: string }> {
  try {
    const name = generateProductName(asset);
    const slug = await generateUniqueSlug(name, asset.public_id);

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
      description: `Product generated from Cloudinary asset: ${asset.public_id}`,
      inStock: true,
      featured: false,
    };

    const result = await sanityClient.create(product);

    return { success: true, productId: result._id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Main execution function
 */
async function createProductsFromAssets() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║      CREATE PRODUCTS FROM 266 UNMAPPED CLOUDINARY ASSETS                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Load analysis report
  const analysisPath = join(process.cwd(), '308-assets-analysis.json');
  const analysis = JSON.parse(readFileSync(analysisPath, 'utf-8'));

  const assets: UnmappedAsset[] = analysis.suggestedProducts;

  console.log(`📊 Loaded ${assets.length} unmapped assets\n`);

  // STEP 1: Categorize all assets
  console.log('[1] Categorizing assets: products vs components vs variants...\n');

  const plan: ProductCreationPlan = {
    toCreate: [],
    components: [],
    variants: [],
    needsReview: [],
  };

  for (const asset of assets) {
    const type = categorizeAsset(asset);

    switch (type) {
      case 'product':
        plan.toCreate.push(asset);
        break;
      case 'component':
        plan.components.push(asset);
        break;
      case 'variant':
        plan.variants.push(asset);
        break;
      case 'review':
        plan.needsReview.push(asset);
        break;
    }
  }

  console.log('📈 CATEGORIZATION RESULTS:\n');
  console.log(`  ✅ Standalone Products (create): ${plan.toCreate.length}`);
  console.log(`  🧩 Components (flag): ${plan.components.length}`);
  console.log(`  🎨 Variants (link): ${plan.variants.length}`);
  console.log(`  🔍 Needs Review: ${plan.needsReview.length}\n`);

  // STEP 2: Check execution mode
  const args = process.argv.slice(2);
  const executeMode = args.includes('--execute');
  const dryRun = args.includes('--dry-run') || !executeMode;

  if (dryRun) {
    console.log('ℹ️  DRY RUN MODE - No products will be created\n');
    console.log('📋 SAMPLE PRODUCTS TO CREATE (first 5):\n');
    
    plan.toCreate.slice(0, 5).forEach((asset, i) => {
      console.log(`[${i + 1}] ${generateProductName(asset)}`);
      console.log(`    Category: ${asset.suggestedCategory}`);
      console.log(`    Series: ${asset.suggestedSeries || 'none'}`);
      console.log(`    Image: ${asset.public_id}`);
      console.log(`    Confidence: ${asset.confidence}\n`);
    });

    console.log(`\n⚡ To create ${plan.toCreate.length} products, run:`);
    console.log(`   npx tsx scripts/create-products-from-assets.ts --execute\n`);

    // Save plan
    const planPath = join(process.cwd(), 'product-creation-plan.json');
    writeFileSync(planPath, JSON.stringify(plan, null, 2));
    console.log(`📄 Plan saved to: product-creation-plan.json\n`);

    return;
  }

  // STEP 3: Execute product creation
  console.log(`\n[2] Creating ${plan.toCreate.length} products in Sanity...\n`);

  const results = {
    created: 0,
    failed: 0,
    errors: [] as Array<{ asset: string; error: string }>,
  };

  for (let i = 0; i < plan.toCreate.length; i++) {
    const asset = plan.toCreate[i];
    const num = i + 1;

    process.stdout.write(`[${num}/${plan.toCreate.length}] Creating ${generateProductName(asset)}... `);

    const result = await createProduct(asset);

    if (result.success) {
      results.created++;
      console.log(`✅ ${result.productId}`);
    } else {
      results.failed++;
      results.errors.push({ asset: asset.public_id, error: result.error || 'Unknown error' });
      console.log(`❌ ${result.error}`);
    }

    // Rate limiting: pause every 10 requests
    if (num % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // STEP 4: Summary
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                        PRODUCT CREATION COMPLETE                           ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📈 RESULTS:\n');
  console.log(`  ✅ Created: ${results.created}/${plan.toCreate.length}`);
  console.log(`  ❌ Failed: ${results.failed}\n`);

  if (results.errors.length > 0) {
    console.log('❌ ERRORS:\n');
    results.errors.slice(0, 10).forEach(err => {
      console.log(`  ${err.asset}: ${err.error}`);
    });
    if (results.errors.length > 10) {
      console.log(`  ... and ${results.errors.length - 10} more\n`);
    }
  }

  // Save execution report
  const executionReport = {
    timestamp: new Date().toISOString(),
    plan,
    results,
  };

  const reportPath = join(process.cwd(), 'product-creation-execution.json');
  writeFileSync(reportPath, JSON.stringify(executionReport, null, 2));
  console.log(`📄 Execution report saved to: product-creation-execution.json\n`);

  // Final verification
  const totalProducts = await sanityClient.fetch(`count(*[_type == "product"])`);
  console.log(`\n🎯 FINAL COUNT: ${totalProducts} total products in Sanity\n`);

  console.log('📋 NEXT STEPS:\n');
  console.log(`  1. Review ${plan.components.length} components for component library`);
  console.log(`  2. Link ${plan.variants.length} variants to parent products`);
  console.log(`  3. Manually review ${plan.needsReview.length} flagged items\n`);
}

// Execute
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('\n⚠️  No arguments provided. Running in DRY RUN mode.\n');
  console.log('Options:');
  console.log('  --dry-run   Preview without creating (default)');
  console.log('  --execute   Create products in Sanity\n');
}

createProductsFromAssets().catch(console.error);
