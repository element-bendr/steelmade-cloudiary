#!/usr/bin/env tsx
/**
 * Smart Image Link Recovery
 * 
 * Analyzes the 51 products with Sanity image assets and finds their
 * corresponding Cloudinary images using metadata matching.
 * 
 * Instead of manual matching, extracts image metadata (filename, size, etc.)
 * and matches against the 227 unmapped Cloudinary images.
 */

import { createClient } from 'next-sanity';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Simple string distance algorithm (Levenshtein distance)
function stringSimilarity(s1: string, s2: string): number {
  const track = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(0));

  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  return 1 - track[s2.length][s1.length] / Math.max(s1.length, s2.length);
}

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

interface SanityImageAsset {
  _id: string;
  originalFilename: string;
  mimeType: string;
  size: number;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

interface CloudinaryImage {
  public_id: string;
  url: string;
  folder: string;
  bytes: number;
  width?: number;
  height?: number;
  format: string;
}

interface UnmappedData {
  unmappedImages: CloudinaryImage[];
}

interface ProductWithSanityImage {
  _id: string;
  name: string;
  slug: string;
  imageAssetId: string;
  originalFilename: string;
  size: number;
}

async function recoverSanityCdnImages() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║          SMART IMAGE RECOVERY: Sanity Assets → Cloudinary Links           ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Step 1: Fetch products with Sanity image assets
  console.log('📊 Fetching 51 products with Sanity image assets...\n');
  const productsWithAssets = await sanityClient.fetch<ProductWithSanityImage[]>(`
    *[_type == "product" && defined(mainImage.asset)] {
      _id,
      name,
      "slug": slug.current,
      "imageAssetId": mainImage.asset._ref,
      "originalFilename": mainImage.asset->originalFilename,
      "size": mainImage.asset->size
    }
  `);

  console.log(`✅ Found ${productsWithAssets.length} products with Sanity assets\n`);

  if (productsWithAssets.length === 0) {
    console.log('ℹ️  No products with Sanity assets found. All products already use Cloudinary!\n');
    return;
  }

  // Step 2: Load unmapped Cloudinary images
  const unmappedPath = join(process.cwd(), 'unmapped-cloudinary-images.json');
  const unmappedData: any = JSON.parse(readFileSync(unmappedPath, 'utf-8'));
  
  // Extract images from unmappedByFolder structure
  const cloudinaryImages: CloudinaryImage[] = [];
  if (unmappedData.unmappedByFolder && typeof unmappedData.unmappedByFolder === 'object') {
    Object.values(unmappedData.unmappedByFolder).forEach((folderImages: any) => {
      if (Array.isArray(folderImages)) {
        cloudinaryImages.push(...folderImages);
      }
    });
  }

  console.log(`📁 Loaded ${cloudinaryImages.length} unmapped Cloudinary images for matching\n`);

  // Step 3: Match using metadata
  console.log('🔍 Analyzing product metadata for Cloudinary matches...\n');

  interface MatchResult {
    product: ProductWithSanityImage;
    matches: Array<{
      image: CloudinaryImage;
      confidence: number;
      reason: string;
    }>;
  }

  const matchResults: MatchResult[] = [];

  for (const product of productsWithAssets) {
    // Clean product name for matching
    const productNameNorm = product.name.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2)
      .join(' ');

    const filenameNorm = product.originalFilename.toLowerCase()
      .replace(/[_-]/g, ' ')
      .replace(/\.[^.]*$/, '') // Remove extension
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2)
      .join(' ');

    // Find potential matches
    const candidates: Array<{
      image: CloudinaryImage;
      confidence: number;
      reason: string;
    }> = [];

    for (const image of cloudinaryImages) {
      const imageNameNorm = image.public_id.toLowerCase()
        .split('/')
        .pop()
        ?.replace(/[_-]/g, ' ')
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .join(' ') || '';

      let confidence = 0;
      let reason = '';

      // Exact filename match
      if (imageNameNorm === filenameNorm) {
        confidence = 100;
        reason = 'Exact filename match';
      }
      // Filename contained in image name
      else if (imageNameNorm.includes(filenameNorm) || filenameNorm.includes(imageNameNorm)) {
        confidence = 85;
        reason = 'Filename substring match';
      }
      // Size match (within 10% tolerance)
      else if (product.size && image.bytes && Math.abs(product.size - image.bytes) / product.size < 0.1) {
        confidence = 75;
        reason = 'File size match (±10%)';
      }
      // Product name in image name
      else if (imageNameNorm.includes(productNameNorm) || productNameNorm.includes(imageNameNorm)) {
        confidence = 70;
        reason = 'Product name similarity';
      }
      // Fuzzy match on names
      else {
        const nameSimilarity = stringSimilarity(productNameNorm, imageNameNorm);
        if (nameSimilarity > 0.75) {
          confidence = Math.round(nameSimilarity * 80);
          reason = `Name similarity ${Math.round(nameSimilarity * 100)}%`;
        }
      }

      if (confidence >= 70) {
        candidates.push({ image, confidence, reason });
      }
    }

    // Sort by confidence
    candidates.sort((a, b) => b.confidence - a.confidence);

    if (candidates.length > 0) {
      matchResults.push({
        product,
        matches: candidates.slice(0, 3), // Top 3 matches
      });
    }
  }

  // Step 4: Report results
  console.log(`📊 MATCHING RESULTS\n${'─'.repeat(80)}\n`);

  let highConfidence = 0;
  let mediumConfidence = 0;
  let lowConfidence = 0;
  let noMatch = 0;

  matchResults.forEach(result => {
    const topMatch = result.matches[0];
    if (topMatch.confidence >= 90) {
      highConfidence++;
      console.log(`✅ HIGH CONFIDENCE: ${result.product.name}`);
      console.log(`   File: ${result.product.originalFilename} (${result.product.size} bytes)`);
      console.log(`   Match: ${topMatch.image.public_id}`);
      console.log(`   Confidence: ${topMatch.confidence}% - ${topMatch.reason}\n`);
    } else if (topMatch.confidence >= 75) {
      mediumConfidence++;
    } else if (topMatch.confidence >= 70) {
      lowConfidence++;
    }
  });

  noMatch = productsWithAssets.length - matchResults.length;

  console.log(`\n📈 SUMMARY\n${'─'.repeat(80)}\n`);
  console.log(`High Confidence (≥90%):    ${highConfidence} products`);
  console.log(`Medium Confidence (75-89%): ${mediumConfidence} products`);
  console.log(`Low Confidence (70-74%):   ${lowConfidence} products`);
  console.log(`No Match Found:            ${noMatch} products`);
  console.log(`\nTotal Products:            ${productsWithAssets.length}`);
  console.log(`Successful Matches:        ${matchResults.length} (${Math.round(matchResults.length/productsWithAssets.length*100)}%)\n`);

  // Step 5: Generate update plan
  console.log(`\n💡 RECOMMENDED ACTION\n${'─'.repeat(80)}\n`);

  if (highConfidence > 0) {
    console.log(`Create auto-apply script for ${highConfidence} high-confidence matches:`);
    console.log('  npx tsx scripts/auto-apply-sanity-to-cloudinary.ts\n');
  }

  if (mediumConfidence > 0) {
    console.log(`Manually review ${mediumConfidence} medium-confidence matches:`);
    console.log('  - Open Cloudinary media library');
    console.log('  - Compare visual appearance to confirm match');
    console.log('  - Approve/reject in script console\n');
  }

  if (noMatch > 0) {
    console.log(`Investigate ${noMatch} unmatched products:`);
    console.log('  - Check if images were re-uploaded with different names');
    console.log('  - Check Cloudinary folders for alternate naming patterns');
    console.log('  - Possible: Images were edited/replaced after initial upload\n');
  }

  // Export detailed results
  const exportData = {
    timestamp: new Date().toISOString(),
    summary: {
      total: productsWithAssets.length,
      highConfidence,
      mediumConfidence,
      lowConfidence,
      noMatch,
    },
    results: matchResults.map(r => ({
      product: {
        id: r.product._id,
        name: r.product.name,
        slug: r.product.slug,
        originalFile: r.product.originalFilename,
        fileSize: r.product.size,
      },
      topMatch: r.matches[0] ? {
        public_id: r.matches[0].image.public_id,
        url: r.matches[0].image.url,
        confidence: r.matches[0].confidence,
        reason: r.matches[0].reason,
      } : null,
      allMatches: r.matches.slice(1),
    })),
  };

  require('fs').writeFileSync(
    join(process.cwd(), 'sanity-cloudinary-recovery-plan.json'),
    JSON.stringify(exportData, null, 2)
  );

  console.log(`📄 Detailed results exported to: sanity-cloudinary-recovery-plan.json\n`);

  if (highConfidence > 0) {
    console.log(`🚀 NEXT STEP:\n`);
    console.log(`   Create auto-apply script to update ${highConfidence} products automatically\n`);
  }
}

recoverSanityCdnImages().catch(console.error);
