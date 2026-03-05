#!/usr/bin/env tsx
/**
 * Comprehensive Cloudinary-Sanity Sync Gap Analysis
 * 
 * Analyzes the complete state of product visibility and identifies:
 * 1. Products missing images (won't display on website)
 * 2. Products on wrong CDN (Sanity instead of Cloudinary)
 * 3. Cloudinary images not mapped to products (wasted assets)
 * 4. Root cause analysis and remediation recommendations
 */

import { createClient } from 'next-sanity';
import { readFileSync, existsSync } from 'fs';
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

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  series?: string;
  mainImageUrl?: string;
  hasCloudinaryUrl: boolean;
  hasSanityUrl: boolean;
  hasNoImage: boolean;
}

interface CloudinaryMatch {
  productId: string;
  productName: string;
  slug: string;
  matched: boolean;
  confidence?: string;
  cloudinaryUrl?: string;
  publicId?: string;
}

interface UnmappedData {
  unmappedImages: Array<{
    public_id: string;
    url: string;
    folder: string;
  }>;
  productsNeedingImages: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  suggestedMappings: Array<{
    product: { name: string; slug: string };
    image: { public_id: string; url: string };
    confidence: string;
    reason: string;
  }>;
}

async function analyzeGaps() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║          CLOUDINARY-SANITY SYNC GAP ANALYSIS & REMEDIATION PLAN           ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Fetch all products from Sanity
  const products = await sanityClient.fetch<Product[]>(`
    *[_type == "product"] | order(category asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "mainImageUrl": coalesce(mainImage.cloudinaryUrl, mainImage.asset->url),
      "hasCloudinaryUrl": defined(mainImage.cloudinaryUrl),
      "hasSanityUrl": defined(mainImage.asset->url) && !defined(mainImage.cloudinaryUrl),
      "hasNoImage": !defined(mainImage.cloudinaryUrl) && !defined(mainImage.asset)
    }
  `);

  // Load analysis files
  const unmappedPath = join(process.cwd(), 'unmapped-cloudinary-images.json');
  const matchesPath = join(process.cwd(), 'cloudinary-sanity-matches.json');

  let unmappedData: UnmappedData | null = null;
  let matchesData: { matchedProducts: CloudinaryMatch[] } | null = null;

  if (existsSync(unmappedPath)) {
    unmappedData = JSON.parse(readFileSync(unmappedPath, 'utf-8'));
  }

  if (existsSync(matchesPath)) {
    matchesData = JSON.parse(readFileSync(matchesPath, 'utf-8'));
  }

  // Calculate metrics
  const totalProducts = products.length;
  const withCloudinary = products.filter(p => p.hasCloudinaryUrl).length;
  const withSanityOnly = products.filter(p => p.hasSanityUrl).length;
  const withNoImage = products.filter(p => p.hasNoImage).length;
  const withAnyImage = withCloudinary + withSanityOnly;

  const unmappedImages = unmappedData?.unmappedImages?.length || 0;
  const productsNeedingImages = unmappedData?.productsNeedingImages?.length || 0;
  const highConfidenceMappings = unmappedData?.suggestedMappings?.filter(m => m.confidence === 'high').length || 0;
  const mediumConfidenceMappings = unmappedData?.suggestedMappings?.filter(m => m.confidence === 'medium').length || 0;

  console.log('📊 CURRENT STATE OVERVIEW');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log(`Total Products in Sanity:        ${totalProducts}`);
  console.log(`Products with Images:            ${withAnyImage} (${Math.round(withAnyImage/totalProducts*100)}%)`);
  console.log(`  ├─ On Cloudinary (✅ CORRECT): ${withCloudinary} (${Math.round(withCloudinary/totalProducts*100)}%)`);
  console.log(`  ├─ On Sanity CDN (❌ WRONG):   ${withSanityOnly} (${Math.round(withSanityOnly/totalProducts*100)}%)`);
  console.log(`  └─ No Image (❌ MISSING):      ${withNoImage} (${Math.round(withNoImage/totalProducts*100)}%)`);
  console.log();
  console.log(`Cloudinary Images Unmapped:      ${unmappedImages} (assets not used by any product)`);
  console.log();

  // GAP 1: Products with NO images
  console.log('\n🔴 GAP #1: PRODUCTS WITH NO IMAGES (Won\'t Display on Website)');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  const noImageProducts = products.filter(p => p.hasNoImage);
  console.log(`Impact: ${noImageProducts.length} products invisible or broken on website`);
  console.log();

  const byCategory = noImageProducts.reduce((acc, p) => {
    const cat = p.category || 'uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('Breakdown by Category:');
  Object.entries(byCategory)
    .sort(([,a], [,b]) => b - a)
    .forEach(([cat, count]) => {
      console.log(`  • ${cat}: ${count} products`);
    });

  console.log();
  console.log('Root Causes:');
  console.log('  1. 70 products are uncategorized → hard to match images without metadata');
  console.log('  2. Slug mismatches between Sanity and Cloudinary naming');
  console.log('  3. Images may exist in Cloudinary but not matched yet');
  console.log();

  if (highConfidenceMappings > 0 || mediumConfidenceMappings > 0) {
    console.log('✅ Quick Wins Available:');
    if (highConfidenceMappings > 0) {
      console.log(`  • ${highConfidenceMappings} HIGH confidence mappings ready to apply`);
    }
    if (mediumConfidenceMappings > 0) {
      console.log(`  • ${mediumConfidenceMappings} MEDIUM confidence mappings (need manual review)`);
    }
  }

  // GAP 2: Products on wrong CDN
  console.log('\n🟡 GAP #2: PRODUCTS ON SANITY CDN (Should Use Cloudinary)');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  const sanityOnlyProducts = products.filter(p => p.hasSanityUrl);
  console.log(`Impact: ${sanityOnlyProducts.length} products violating architecture (Cloudinary = images)`);
  console.log();
  console.log('Root Causes:');
  console.log('  1. Images exist in Sanity but NOT uploaded to Cloudinary');
  console.log('  2. OR uploaded to Cloudinary with different naming → matching failed');
  console.log('  3. Slug normalization differences between systems');
  console.log();
  console.log('Sample Products on Wrong CDN:');
  sanityOnlyProducts.slice(0, 5).forEach(p => {
    console.log(`  • ${p.name} (${p.slug})`);
  });
  if (sanityOnlyProducts.length > 5) {
    console.log(`  ... and ${sanityOnlyProducts.length - 5} more`);
  }

  // GAP 3: Unmapped Cloudinary images
  console.log('\n🟠 GAP #3: UNMAPPED CLOUDINARY IMAGES (Wasted Assets)');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log(`Impact: ${unmappedImages} images in Cloudinary not assigned to products`);
  console.log();
  console.log('Categories of Unmapped Images:');
  console.log('  1. Product images with naming mismatches');
  console.log('  2. Component images (legs, aprons, accessories) → may not map to products');
  console.log('  3. Duplicate/alternate views of same product');
  console.log('  4. Unused/legacy images from old catalog');

  // Remediation Plan
  console.log('\n\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         REMEDIATION PLAN                                   ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('🎯 PHASE 1: UNBLOCK CATEGORIZATION (steelmade-6md)');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log('Goal: Categorize 70 uncategorized products');
  console.log();
  console.log('Actions:');
  console.log('  1. File: categorization-fixes.json already generated');
  console.log('  2. Apply: Create auto-apply script OR manual in Sanity Studio');
  console.log('  3. Impact: Enables better image matching for these 70 products');
  console.log();
  console.log('Estimated Time: 2-3 hours (auto) or 4-6 hours (manual)');
  console.log('Blocking: Image assignment for 70 products');

  console.log('\n🎯 PHASE 2: APPLY QUICK WIN MAPPINGS');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log('Goal: Assign images that already have high-confidence matches');
  console.log();
  console.log('Actions:');
  if (highConfidenceMappings > 0) {
    console.log(`  1. Auto-apply ${highConfidenceMappings} high-confidence mappings`);
  }
  if (mediumConfidenceMappings > 0) {
    console.log(`  2. Manual review ${mediumConfidenceMappings} medium-confidence mappings`);
  }
  console.log('  3. Re-run verification to check progress');
  console.log();
  console.log('Estimated Time: 1-2 hours');
  console.log(`Expected Gain: Reduce missing images from ${withNoImage} → ~${Math.max(0, withNoImage - highConfidenceMappings - Math.floor(mediumConfidenceMappings * 0.7))}`);

  console.log('\n🎯 PHASE 3: MIGRATE SANITY CDN → CLOUDINARY');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log(`Goal: Move ${sanityOnlyProducts.length} products from Sanity CDN to Cloudinary`);
  console.log();
  console.log('Actions:');
  console.log('  1. Download images from Sanity CDN');
  console.log('  2. Upload to Cloudinary with standardized naming (use product slug)');
  console.log('  3. Update Sanity documents with new Cloudinary URLs');
  console.log('  4. Script: Can automate this (similar to fetch-cloudinary-images.ts)');
  console.log();
  console.log('Estimated Time: 30 min script + 1 hour execution');
  console.log(`Expected Gain: Move ${sanityOnlyProducts.length} products to correct CDN (100% on Cloudinary)`);

  console.log('\n🎯 PHASE 4: MANUAL IMAGE ASSIGNMENT');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  const remainingAfterPhases = Math.max(0, withNoImage - highConfidenceMappings - Math.floor(mediumConfidenceMappings * 0.7));
  console.log(`Goal: Assign images to remaining ~${remainingAfterPhases} products`);
  console.log();
  console.log('Actions:');
  console.log('  1. Review unmapped Cloudinary images by folder');
  console.log('  2. Match visually to products needing images');
  console.log('  3. Document naming patterns for future automation');
  console.log('  4. Consider: Some products may genuinely not have images → mark as "no-image"');
  console.log();
  console.log('Estimated Time: 4-8 hours (depends on catalog knowledge)');

  console.log('\n🎯 PHASE 5: ESTABLISH ONGOING SYNC PROCESS');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log('Goal: Prevent sync issues in future');
  console.log();
  console.log('Recommendations:');
  console.log('  1. Naming Convention: Cloudinary public_id MUST match Sanity slug');
  console.log('     Example: Product "Amazon Executive Chair" → slug "amazon-executive-chair"');
  console.log('              → Cloudinary public_id: "amazon-executive-chair" or "chairs/amazon-executive-chair"');
  console.log();
  console.log('  2. Upload Process:');
  console.log('     • Always upload to Cloudinary FIRST');
  console.log('     • Use product slug in public_id for traceability');
  console.log('     • Then create/update Sanity product with cloudinaryUrl');
  console.log();
  console.log('  3. Verification:');
  console.log('     • Run: npm run verify:cloudinary (scripts/verify-sanity-cloudinary-parity.ts)');
  console.log('     • Schedule: Weekly OR before major deployments');
  console.log('     • CI/CD: Add as pre-deployment check (exit code 0 = pass)');
  console.log();
  console.log('  4. Documentation:');
  console.log('     • Create upload guidelines for content team');
  console.log('     • Document folder structure in Cloudinary');
  console.log('     • Maintain image-product mapping reference');

  // Success Metrics
  console.log('\n\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                         SUCCESS METRICS                                    ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('Current State → Target State:');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log(`Products on Cloudinary:        ${withCloudinary} (${Math.round(withCloudinary/totalProducts*100)}%) → ${totalProducts} (100%)`);
  console.log(`Products with Images:          ${withAnyImage} (${Math.round(withAnyImage/totalProducts*100)}%) → ${totalProducts} (100%)`);
  console.log(`Products Missing Images:       ${withNoImage} → 0 (or documented as "no-image")`);
  console.log(`Unmapped Cloudinary Images:    ${unmappedImages} → Document/Archive non-product images`);
  console.log();
  console.log('Website Impact:');
  console.log(`  • Currently: ${withAnyImage}/${totalProducts} products displayable (${Math.round(withAnyImage/totalProducts*100)}%)`);
  console.log(`  • Target:    ${totalProducts}/${totalProducts} products displayable (100%)`);
  console.log();

  // Export detailed gap report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalProducts,
      withCloudinary,
      withSanityOnly,
      withNoImage,
      withAnyImage,
      unmappedImages,
      percentComplete: Math.round(withCloudinary/totalProducts*100),
      percentWithImages: Math.round(withAnyImage/totalProducts*100),
    },
    gaps: {
      productsNoImage: noImageProducts.map(p => ({
        id: p._id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        series: p.series,
      })),
      productsWrongCdn: sanityOnlyProducts.map(p => ({
        id: p._id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        sanityUrl: p.mainImageUrl,
      })),
    },
    quickWins: {
      highConfidenceMappings,
      mediumConfidenceMappings,
      estimatedRecovery: highConfidenceMappings + Math.floor(mediumConfidenceMappings * 0.7),
    },
    recommendations: [
      'Apply categorization-fixes.json (steelmade-6md)',
      'Execute high-confidence image mappings',
      'Review medium-confidence mappings',
      'Migrate Sanity CDN images to Cloudinary',
      'Manual assignment for remaining products',
      'Establish naming convention and upload process',
      'Add verification to CI/CD pipeline',
    ],
  };

  const reportPath = join(process.cwd(), 'sync-gap-analysis.json');
  require('fs').writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report exported to: sync-gap-analysis.json`);

  console.log('\n\n🎯 IMMEDIATE NEXT ACTIONS:');
  console.log('─────────────────────────────────────────────────────────────────────────────');
  console.log('1. Complete steelmade-6md (categorization)');
  console.log('2. Run: npx tsx scripts/apply-high-confidence-mappings.ts --execute');
  console.log('3. Review medium-confidence mappings in unmapped-cloudinary-images.json');
  console.log('4. Create Sanity CDN → Cloudinary migration script');
  console.log('5. Run verification: npx tsx scripts/verify-sanity-cloudinary-parity.ts');
  console.log();
  
  return report;
}

// Run analysis
analyzeGaps().catch(console.error);
