#!/usr/bin/env node
/**
 * Analyze 308 Cloudinary Assets vs Current Products
 * 
 * This script identifies how many of the 308 Cloudinary assets are:
 * 1. Already mapped to existing products (179 from Phase 3)
 * 2. Unmapped and need new products created (target: 129)
 * 
 * It will generate a plan for creating new products from unmapped images
 * using metadata extraction (folder paths, filenames, dimensions).
 */

import { createClient } from 'next-sanity';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqde19mfs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Sanity
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

interface CloudinaryAsset {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  folder: string;
  created_at: string;
}

interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  category: string | null;
  cloudinaryUrl: string | null;
  hasCloudinaryImage: boolean;
}

interface UnmappedAsset extends CloudinaryAsset {
  suggestedName: string;
  suggestedSlug: string;
  suggestedCategory: string;
  suggestedSeries: string | null;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

async function analyze308Assets() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║         308 CLOUDINARY ASSETS → SANITY PRODUCTS ANALYSIS                  ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // STEP 1: Get all products from Sanity
  console.log('[1] Fetching all products from Sanity...\n');

  const products: SanityProduct[] = await sanityClient.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "slug": slug.current,
      category,
      "cloudinaryUrl": mainImage.cloudinaryUrl,
      "hasCloudinaryImage": defined(mainImage.cloudinaryUrl)
    }
  `);

  const productsOnCloudinary = products.filter(p => p.hasCloudinaryImage);

  console.log(`✅ Total Products: ${products.length}`);
  console.log(`✅ On Cloudinary: ${productsOnCloudinary.length}`);
  console.log(`✅ Missing Images: ${products.length - productsOnCloudinary.length}\n`);

  // STEP 2: Get all Cloudinary images
  console.log('[2] Fetching all Cloudinary assets...\n');

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
      url: r.url,
      secure_url: r.secure_url,
      format: r.format,
      width: r.width,
      height: r.height,
      bytes: r.bytes,
      folder: r.public_id.split('/').slice(0, -1).join('/'),
      created_at: r.created_at,
    })));

    nextCursor = result.next_cursor;
  } while (nextCursor);

  console.log(`✅ Total Cloudinary Assets: ${allImages.length}\n`);

  // STEP 3: Identify unmapped images
  console.log('[3] Identifying unmapped images...\n');

  const usedPublicIds = new Set(
    productsOnCloudinary
      .map(p => p.cloudinaryUrl)
      .filter(Boolean)
      .map(url => {
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.\w+$/);
        return match ? match[1] : null;
      })
      .filter(Boolean)
  );

  const unmappedImages = allImages.filter(img => !usedPublicIds.has(img.public_id));

  console.log(`✅ Mapped Images: ${allImages.length - unmappedImages.length}`);
  console.log(`✅ Unmapped Images: ${unmappedImages.length}\n`);

  // STEP 4: Analyze unmapped images by folder
  console.log('[4] Analyzing unmapped images by folder...\n');

  const byFolder: Record<string, CloudinaryAsset[]> = {};
  unmappedImages.forEach(img => {
    const folder = img.folder || 'root';
    if (!byFolder[folder]) {
      byFolder[folder] = [];
    }
    byFolder[folder].push(img);
  });

  const sortedFolders = Object.entries(byFolder)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 15);

  console.log('📁 TOP 15 FOLDERS WITH UNMAPPED IMAGES:\n');
  sortedFolders.forEach(([folder, images]) => {
    console.log(`  ${folder}: ${images.length} images`);
  });

  // STEP 5: Generate product suggestions from metadata
  console.log('\n[5] Generating product suggestions from metadata...\n');

  const unmappedWithSuggestions: UnmappedAsset[] = unmappedImages.map(img => {
    const parts = img.public_id.split('/');
    const filename = parts[parts.length - 1];
    
    // Extract category from folder path
    let category = 'uncategorized';
    let series = null;
    
    if (parts.includes('chairs')) {
      category = 'chairs';
      const seriesIndex = parts.indexOf('chairs') + 1;
      if (seriesIndex < parts.length - 1) {
        series = parts[seriesIndex].replace(/-/g, ' ').replace(/_/g, ' ');
      }
    } else if (parts.includes('workstations')) {
      category = 'workstations';
    } else if (parts.includes('storage')) {
      category = 'storage';
    } else if (parts.includes('desks')) {
      category = 'desks';
    } else if (parts.includes('tables')) {
      category = 'tables';
    }

    // Generate name from filename
    const nameFromFile = filename
      .replace(/\.[^.]+$/, '') // Remove extension
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\d+/g, '') // Remove numbers
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Generate slug
    const slug = filename
      .replace(/\.[^.]+$/, '')
      .replace(/_/g, '-')
      .toLowerCase();

    // Determine confidence
    let confidence: 'high' | 'medium' | 'low' = 'low';
    let reason = 'Generated from filename';

    if (category !== 'uncategorized' && nameFromFile.length > 3) {
      confidence = 'medium';
      reason = 'Category detected from folder, name from filename';
    }

    if (series && nameFromFile.length > 3) {
      confidence = 'high';
      reason = 'Category, series, and name clearly identified';
    }

    return {
      ...img,
      suggestedName: nameFromFile || 'Unknown Product',
      suggestedSlug: slug,
      suggestedCategory: category,
      suggestedSeries: series,
      confidence,
      reason,
    };
  });

  // Count by confidence
  const highConfidence = unmappedWithSuggestions.filter(a => a.confidence === 'high').length;
  const mediumConfidence = unmappedWithSuggestions.filter(a => a.confidence === 'medium').length;
  const lowConfidence = unmappedWithSuggestions.filter(a => a.confidence === 'low').length;

  console.log('📊 CONFIDENCE DISTRIBUTION:\n');
  console.log(`  High Confidence (auto-create ready): ${highConfidence}`);
  console.log(`  Medium Confidence (review + create): ${mediumConfidence}`);
  console.log(`  Low Confidence (manual review needed): ${lowConfidence}\n`);

  // STEP 6: Generate summary report
  console.log('[6] Generating comprehensive report...\n');

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalCloudinaryAssets: allImages.length,
      totalSanityProducts: products.length,
      productsOnCloudinary: productsOnCloudinary.length,
      unmappedAssets: unmappedImages.length,
      targetNewProducts: unmappedImages.length,
    },
    confidenceBreakdown: {
      high: highConfidence,
      medium: mediumConfidence,
      low: lowConfidence,
    },
    topFolders: sortedFolders.map(([folder, images]) => ({
      folder,
      count: images.length,
    })),
    unmappedAssetsByFolder: byFolder,
    suggestedProducts: unmappedWithSuggestions,
  };

  // Save report
  const reportPath = join(process.cwd(), '308-assets-analysis.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`✅ Report saved to: 308-assets-analysis.json\n`);

  // STEP 7: Summary
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                           ANALYSIS COMPLETE                                ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log('📈 CURRENT STATE:');
  console.log(`  Cloudinary Assets: ${allImages.length}`);
  console.log(`  Sanity Products: ${products.length}`);
  console.log(`  Products on Cloudinary: ${productsOnCloudinary.length}\n`);

  console.log('🎯 GOAL:');
  console.log(`  Create ${unmappedImages.length} new products from unmapped images`);
  console.log(`  Final target: ${allImages.length} products (one per Cloudinary asset)\n`);

  console.log('⚡ NEXT STEPS:');
  console.log('  1. Review 308-assets-analysis.json');
  console.log(`  2. Auto-create ${highConfidence} high-confidence products`);
  console.log(`  3. Review + create ${mediumConfidence} medium-confidence products`);
  console.log(`  4. Manually review ${lowConfidence} low-confidence images\n`);

  console.log('🚀 READY TO PROCEED:');
  console.log('  Run: npx tsx scripts/create-products-from-assets.ts --execute\n');
}

analyze308Assets().catch(console.error);
