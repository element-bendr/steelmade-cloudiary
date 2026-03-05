#!/usr/bin/env node
/**
 * Analyze Unmapped Cloudinary Images
 * 
 * This script:
 * 1. Fetches all images from Cloudinary (308 total)
 * 2. Loads existing matches from cloudinary-sanity-matches.json (81 matched)
 * 3. Identifies 227 unmapped images
 * 4. Groups unmapped images by folder/category structure
 * 5. Suggests potential product matches for manual review
 * 6. Generates unmapped-cloudinary-images.json report
 * 
 * Usage:
 *   npx tsx scripts/analyze-unmapped-cloudinary.ts
 */

import { v2 as cloudinary } from 'cloudinary';
import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Configure Cloudinary
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqde19mfs';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error('❌ Missing Cloudinary credentials!');
  console.error('Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true
});

// Configure Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  created_at: string;
  width: number;
  height: number;
  folder?: string;
}

interface SanityProduct {
  _id: string;
  name: string;
  slug: string;
  category: string | null;
  series: string | null;
  mainImageUrl: string | null;
  hasCloudinaryImage: boolean;
}

interface SuggestedMapping {
  cloudinaryImage: string;
  cloudinaryUrl: string;
  cloudinaryFolder: string;
  suggestedProduct: string | null;
  suggestedProductName: string | null;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

interface UnmappedReport {
  timestamp: string;
  totalCloudinaryImages: number;
  matched: number;
  unmapped: number;
  unmappedByFolder: Record<string, CloudinaryAsset[]>;
  suggestedMappings: SuggestedMapping[];
  productsNeedingImages: SanityProduct[];
  summary: {
    topFolders: Array<{ folder: string; count: number }>;
    imageFormats: Record<string, number>;
  };
}

/**
 * Fetch all images from Cloudinary
 */
async function fetchCloudinaryImages(): Promise<CloudinaryAsset[]> {
  console.log('🔄 Fetching images from Cloudinary...');
  
  const allAssets: CloudinaryAsset[] = [];
  let nextCursor: string | undefined = undefined;
  
  try {
    do {
      const result = await cloudinary.api.resources({
        resource_type: 'image',
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor,
      });
      
      allAssets.push(...result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`  Fetched ${allAssets.length} images so far...`);
    } while (nextCursor);
    
    console.log(`✅ Found ${allAssets.length} images in Cloudinary\n`);
    return allAssets;
  } catch (error: any) {
    console.error('❌ Error fetching from Cloudinary:', error.message);
    throw error;
  }
}

/**
 * Fetch all products from Sanity
 */
async function fetchSanityProducts(): Promise<SanityProduct[]> {
  console.log('🔄 Fetching products from Sanity...');
  
  const query = `*[_type == "product"] {
    _id,
    name,
    "slug": slug.current,
    category,
    series,
    "mainImageUrl": mainImage.asset->url,
    "hasCloudinaryImage": defined(cloudinaryImage)
  } | order(category asc, name asc)`;
  
  const products = await sanityClient.fetch(query);
  console.log(`✅ Found ${products.length} products in Sanity\n`);
  
  return products;
}

/**
 * Load existing matches from cloudinary-sanity-matches.json
 */
function loadExistingMatches(): Set<string> {
  const matchesPath = path.join(process.cwd(), 'cloudinary-sanity-matches.json');
  
  if (!fs.existsSync(matchesPath)) {
    console.warn('⚠️  cloudinary-sanity-matches.json not found. Assuming all images are unmapped.');
    return new Set();
  }
  
  const data = JSON.parse(fs.readFileSync(matchesPath, 'utf-8'));
  const matchedPublicIds = new Set(
    data.matches.map((m: any) => m.cloudinaryPublicId)
  );
  
  console.log(`📋 Loaded ${matchedPublicIds.size} existing matches\n`);
  return matchedPublicIds;
}

/**
 * Group images by folder structure
 */
function groupByFolder(images: CloudinaryAsset[]): Record<string, CloudinaryAsset[]> {
  const grouped: Record<string, CloudinaryAsset[]> = {};
  
  for (const image of images) {
    const parts = image.public_id.split('/');
    const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : 'root';
    
    if (!grouped[folder]) {
      grouped[folder] = [];
    }
    grouped[folder].push(image);
  }
  
  return grouped;
}

/**
 * Suggest potential product matches for unmapped images
 */
function suggestMappings(
  unmappedImages: CloudinaryAsset[],
  products: SanityProduct[]
): SuggestedMapping[] {
  console.log('🔄 Analyzing potential mappings...\n');
  
  const suggestions: SuggestedMapping[] = [];
  
  // Products that need images (no Cloudinary image yet)
  const productsNeedingImages = products.filter(p => !p.hasCloudinaryImage);
  
  for (const image of unmappedImages) {
    const publicId = image.public_id;
    const folder = publicId.includes('/') 
      ? publicId.substring(0, publicId.lastIndexOf('/'))
      : '';
    const filename = publicId.includes('/')
      ? publicId.substring(publicId.lastIndexOf('/') + 1)
      : publicId;
    
    // Normalize filename for matching
    const normalizedFilename = filename
      .toLowerCase()
      .replace(/\.(png|jpg|jpeg|webp)$/i, '')
      .replace(/[_\s-]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    let bestMatch: SanityProduct | null = null;
    let confidence: 'high' | 'medium' | 'low' = 'low';
    let reason = '';
    
    // Strategy 1: Exact slug match
    const exactMatch = productsNeedingImages.find(p => 
      p.slug === normalizedFilename
    );
    
    if (exactMatch) {
      bestMatch = exactMatch;
      confidence = 'high';
      reason = 'Exact slug match';
    } else {
      // Strategy 2: Slug contains filename or vice versa
      const containsMatch = productsNeedingImages.find(p =>
        p.slug?.includes(normalizedFilename) || 
        normalizedFilename.includes(p.slug || '')
      );
      
      if (containsMatch) {
        bestMatch = containsMatch;
        confidence = 'medium';
        reason = 'Partial slug match';
      } else {
        // Strategy 3: Product name similarity
        const nameMatch = productsNeedingImages.find(p => {
          const normalizedProductName = p.name
            .toLowerCase()
            .replace(/[_\s-]+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          const words = normalizedProductName.split('-').filter(w => w.length > 3);
          const filenameWords = normalizedFilename.split('-').filter(w => w.length > 3);
          
          // Check if at least 2 words match
          const matchingWords = words.filter(w => filenameWords.includes(w));
          return matchingWords.length >= 2;
        });
        
        if (nameMatch) {
          bestMatch = nameMatch;
          confidence = 'low';
          reason = 'Product name similarity';
        }
      }
    }
    
    suggestions.push({
      cloudinaryImage: publicId,
      cloudinaryUrl: image.secure_url,
      cloudinaryFolder: folder,
      suggestedProduct: bestMatch?.slug || null,
      suggestedProductName: bestMatch?.name || null,
      confidence: bestMatch ? confidence : 'low',
      reason: bestMatch ? reason : 'No match found - needs manual review',
    });
  }
  
  // Sort by confidence (high -> medium -> low) and folder
  suggestions.sort((a, b) => {
    const confidenceOrder = { high: 0, medium: 1, low: 2 };
    const confDiff = confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    if (confDiff !== 0) return confDiff;
    return a.cloudinaryFolder.localeCompare(b.cloudinaryFolder);
  });
  
  return suggestions;
}

/**
 * Generate summary statistics
 */
function generateSummary(
  unmappedByFolder: Record<string, CloudinaryAsset[]>,
  unmappedImages: CloudinaryAsset[]
) {
  // Top folders by image count
  const topFolders = Object.entries(unmappedByFolder)
    .map(([folder, images]) => ({ folder, count: images.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Image formats distribution
  const imageFormats: Record<string, number> = {};
  for (const image of unmappedImages) {
    const format = image.format || 'unknown';
    imageFormats[format] = (imageFormats[format] || 0) + 1;
  }
  
  return { topFolders, imageFormats };
}

/**
 * Print analysis to console
 */
function printAnalysis(report: UnmappedReport) {
  console.log('\n' + '='.repeat(70));
  console.log('📊 UNMAPPED CLOUDINARY IMAGES ANALYSIS');
  console.log('='.repeat(70) + '\n');
  
  console.log('📈 OVERALL STATISTICS:');
  console.log(`  Total Cloudinary Images: ${report.totalCloudinaryImages}`);
  console.log(`  Already Matched: ${report.matched}`);
  console.log(`  Unmapped: ${report.unmapped}`);
  console.log(`  Products Needing Images: ${report.productsNeedingImages.length}\n`);
  
  console.log('📁 TOP FOLDERS WITH UNMAPPED IMAGES:');
  for (const { folder, count } of report.summary.topFolders) {
    console.log(`  ${folder}: ${count} images`);
  }
  console.log('');
  
  console.log('🖼️  IMAGE FORMATS:');
  for (const [format, count] of Object.entries(report.summary.imageFormats)) {
    console.log(`  ${format}: ${count}`);
  }
  console.log('');
  
  console.log('💡 SUGGESTED MAPPINGS:');
  const highConfidence = report.suggestedMappings.filter(m => m.confidence === 'high');
  const mediumConfidence = report.suggestedMappings.filter(m => m.confidence === 'medium');
  const lowConfidence = report.suggestedMappings.filter(m => m.confidence === 'low' && m.suggestedProduct);
  const noMatch = report.suggestedMappings.filter(m => !m.suggestedProduct);
  
  console.log(`  High Confidence: ${highConfidence.length}`);
  console.log(`  Medium Confidence: ${mediumConfidence.length}`);
  console.log(`  Low Confidence: ${lowConfidence.length}`);
  console.log(`  Needs Manual Review: ${noMatch.length}\n`);
  
  if (highConfidence.length > 0) {
    console.log('✅ HIGH CONFIDENCE MATCHES (Sample):');
    highConfidence.slice(0, 5).forEach(m => {
      console.log(`  ${m.cloudinaryImage}`);
      console.log(`    → ${m.suggestedProduct} (${m.suggestedProductName})`);
      console.log(`    Reason: ${m.reason}\n`);
    });
  }
  
  console.log('📝 PRODUCTS STILL NEEDING IMAGES:');
  console.log(`  Total: ${report.productsNeedingImages.length}\n`);
  
  const byCategory: Record<string, number> = {};
  for (const product of report.productsNeedingImages) {
    const cat = product.category || 'uncategorized';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  }
  
  console.log('  By Category:');
  for (const [category, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${category}: ${count}`);
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('✅ Report saved to: unmapped-cloudinary-images.json');
  console.log('='.repeat(70) + '\n');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('\n🚀 Starting Unmapped Cloudinary Images Analysis\n');
    
    // 1. Fetch data
    const [cloudinaryImages, sanityProducts] = await Promise.all([
      fetchCloudinaryImages(),
      fetchSanityProducts(),
    ]);
    
    // 2. Load existing matches
    const matchedPublicIds = loadExistingMatches();
    
    // 3. Identify unmapped images
    const unmappedImages = cloudinaryImages.filter(
      img => !matchedPublicIds.has(img.public_id)
    );
    
    console.log(`🔍 Found ${unmappedImages.length} unmapped images\n`);
    
    // 4. Group by folder
    const unmappedByFolder = groupByFolder(unmappedImages);
    
    // 5. Suggest mappings
    const suggestedMappings = suggestMappings(unmappedImages, sanityProducts);
    
    // 6. Get products needing images
    const productsNeedingImages = sanityProducts.filter(p => 
      !p.hasCloudinaryImage && !p.mainImageUrl
    );
    
    // 7. Generate summary
    const summary = generateSummary(unmappedByFolder, unmappedImages);
    
    // 8. Build report
    const report: UnmappedReport = {
      timestamp: new Date().toISOString(),
      totalCloudinaryImages: cloudinaryImages.length,
      matched: matchedPublicIds.size,
      unmapped: unmappedImages.length,
      unmappedByFolder,
      suggestedMappings,
      productsNeedingImages,
      summary,
    };
    
    // 9. Save report
    const reportPath = path.join(process.cwd(), 'unmapped-cloudinary-images.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // 10. Print analysis
    printAnalysis(report);
    
    console.log('💡 NEXT STEPS:');
    console.log('  1. Review high-confidence matches in unmapped-cloudinary-images.json');
    console.log('  2. Use the suggested mappings to update products manually');
    console.log('  3. For unmapped images with no suggestions, check folder structure');
    console.log('  4. Consider creating new products for orphaned images\n');
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
