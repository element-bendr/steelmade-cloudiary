#!/usr/bin/env tsx
/**
 * Complete Image Assignment: Metadata matching for remaining 47 products
 * 
 * Analyzes all 47 products without images and matches them against
 * the 227 unmapped Cloudinary images using comprehensive metadata matching.
 * 
 * Creates detailed analysis with confidence scores for content team review.
 */

import { createClient } from 'next-sanity';
import { readFileSync, writeFileSync } from 'fs';
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

interface ProductWithoutImage {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  bytes: number;
  width?: number;
  height?: number;
  format: string;
}

interface Match {
  product: ProductWithoutImage;
  candidates: Array<{
    image: CloudinaryImage;
    confidence: number;
    reason: string;
  }>;
}

async function matchRemainingProducts() {
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║      PHASE 3B: Match Remaining 47 Products via Metadata Analysis         ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // STEP 1: Fetch products without images
  console.log('[1] Fetching 47 products without images...\n');

  const productsWithoutImages = await sanityClient.fetch<ProductWithoutImage[]>(`
    *[_type == "product" && !defined(mainImage.cloudinaryUrl)] {
      _id,
      name,
      "slug": slug.current,
      "category": category
    }
  `);

  console.log(`✅ Found ${productsWithoutImages.length} products without Cloudinary images\n`);

  if (productsWithoutImages.length === 0) {
    console.log('ℹ️  All products now have Cloudinary images!\n');
    return;
  }

  // STEP 2: Load unmapped Cloudinary images
  console.log('[2] Loading unmapped Cloudinary images...\n');

  const unmappedPath = join(process.cwd(), 'unmapped-cloudinary-images.json');
  const unmappedData: any = JSON.parse(readFileSync(unmappedPath, 'utf-8'));

  const cloudinaryImages: CloudinaryImage[] = [];
  if (unmappedData.unmappedByFolder && typeof unmappedData.unmappedByFolder === 'object') {
    Object.values(unmappedData.unmappedByFolder).forEach((folderImages: any) => {
      if (Array.isArray(folderImages)) {
        cloudinaryImages.push(...folderImages);
      }
    });
  }

  console.log(`✅ Loaded ${cloudinaryImages.length} unmapped Cloudinary images\n`);

  // STEP 3: Match products to images
  console.log('[3] Analyzing metadata for matches...\n');

  const results: Match[] = [];
  let highConfidenceCount = 0;
  let mediumConfidenceCount = 0;
  let noMatchCount = 0;

  for (let i = 0; i < productsWithoutImages.length; i++) {
    const product = productsWithoutImages[i];
    const progress = `[${i + 1}/${productsWithoutImages.length}]`;

    // Normalize product name for matching
    const productNameNorm = product.name
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2)
      .join(' ');

    const categoryNorm = (product.category || '')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2)
      .join(' ');

    const slugNorm = product.slug
      .toLowerCase()
      .replace(/[_-]/g, ' ')
      .replace(/[^\w\s]/g, '');

    // Find candidates
    const candidates: Array<{
      image: CloudinaryImage;
      confidence: number;
      reason: string;
    }> = [];

    for (const image of cloudinaryImages) {
      const imageNameNorm = image.public_id
        .toLowerCase()
        .split('/')
        .pop()
        ?.replace(/[_-]/g, ' ')
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .join(' ') || '';

      const folderPath = image.public_id.toLowerCase();

      let confidence = 0;
      let reason = '';

      // 1. EXACT OR NEAR-EXACT NAME MATCH
      if (imageNameNorm === productNameNorm) {
        confidence = 100;
        reason = 'Exact name match';
      }
      // 2. SLUG IN IMAGE NAME
      else if (imageNameNorm.includes(slugNorm) || slugNorm.includes(imageNameNorm)) {
        confidence = 95;
        reason = 'Slug in image name';
      }
      // 3. CATEGORY PATH MATCH + NAME MATCH
      else if (categoryNorm && folderPath.includes(categoryNorm) && stringSimilarity(imageNameNorm, productNameNorm) > 0.7) {
        confidence = 85;
        reason = `Category path match + ${Math.round(stringSimilarity(imageNameNorm, productNameNorm) * 100)}% name similarity`;
      }
      // 4. SUBSTRING MATCH
      else if (imageNameNorm.includes(productNameNorm) || productNameNorm.includes(imageNameNorm)) {
        confidence = 80;
        reason = 'Substring match in name';
      }
      // 5. FUZZY NAME MATCH
      else {
        const similarity = stringSimilarity(productNameNorm, imageNameNorm);
        if (similarity > 0.75) {
          confidence = Math.round(similarity * 85); // Scale to 64-85%
          reason = `Name similarity ${Math.round(similarity * 100)}%`;
        }
      }

      if (confidence >= 70) {
        candidates.push({ image, confidence, reason });
      }
    }

    // Sort by confidence
    candidates.sort((a, b) => b.confidence - a.confidence);

    if (candidates.length > 0) {
      const topConfidence = candidates[0].confidence;
      if (topConfidence >= 90) {
        highConfidenceCount++;
      } else if (topConfidence >= 75) {
        mediumConfidenceCount++;
      }
      results.push({
        product,
        candidates: candidates.slice(0, 3), // Top 3 matches
      });
      
      console.log(`${progress} ${candidates[0].confidence >= 90 ? '✅' : candidates[0].confidence >= 75 ? '🟡' : '🟠'} ${product.name}`);
      console.log(`         Best match: ${candidates[0].image.public_id.split('/').pop()} (${candidates[0].confidence}% - ${candidates[0].reason})`);
    } else {
      noMatchCount++;
      console.log(`${progress} ❌ ${product.name} - No matches found`);
    }

    if ((i + 1) % 10 === 0) {
      console.log(`   ... ${i + 1}/${productsWithoutImages.length} analyzed\n`);
    }
  }

  // STEP 4: Generate report
  console.log('\n[4] Generating analysis report...\n');

  console.log('📊 MATCHING RESULTS:\n');
  console.log(`✅ High Confidence (≥90%):   ${highConfidenceCount} products`);
  console.log(`🟡 Medium Confidence (75-89%): ${mediumConfidenceCount} products`);
  console.log(`🟠 Low Confidence (70-74%):   ${results.length - highConfidenceCount - mediumConfidenceCount} products`);
  console.log(`❌ No Match Found:            ${noMatchCount} products\n`);

  console.log(`📈 Total Products:            ${productsWithoutImages.length}`);
  console.log(`📈 Successful Matches:        ${results.length} (${Math.round((results.length / productsWithoutImages.length) * 100)}%)\n`);

  // STEP 5: Export analysis
  console.log('[5] Saving analysis report...\n');

  const report = {
    timestamp: new Date().toISOString(),
    productsAnalyzed: productsWithoutImages.length,
    summary: {
      highConfidence: highConfidenceCount,
      mediumConfidence: mediumConfidenceCount,
      lowConfidence: results.length - highConfidenceCount - mediumConfidenceCount,
      noMatch: noMatchCount,
      totalMatches: results.length,
      matchRate: Math.round((results.length / productsWithoutImages.length) * 100),
    },
    results: results.map(r => ({
      product: {
        id: r.product._id,
        name: r.product.name,
        slug: r.product.slug,
        category: r.product.category,
      },
      topMatch: {
        public_id: r.candidates[0].image.public_id,
        secure_url: r.candidates[0].image.secure_url,
        confidence: r.candidates[0].confidence,
        reason: r.candidates[0].reason,
      },
      allMatches: r.candidates.map(c => ({
        public_id: c.image.public_id,
        secure_url: c.image.secure_url,
        confidence: c.confidence,
        reason: c.reason,
      })),
    })),
  };

  const reportPath = join(process.cwd(), 'remaining-products-analysis.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`✅ Analysis saved to: ${reportPath}\n`);
  console.log('📋 NEXT STEPS:\n');
  console.log('1. Review remaining-products-analysis.json');
  console.log('2. For each high-confidence match, run auto-apply');
  console.log('3. For medium-confidence, review visually or skip');
  console.log('4. Update beads with results\n');
}

matchRemainingProducts().catch(console.error);
