#!/usr/bin/env node
/**
 * Fetch all images from Cloudinary and match with Sanity products
 * 
 * This script:
 * 1. Fetches all images from Cloudinary using the Admin API
 * 2. Fetches all products from Sanity
 * 3. Matches Cloudinary images to products by slug/ID
 * 4. Generates a mapping file for syncing
 * 5. Optionally updates Sanity with Cloudinary URLs
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
  console.error('Please set the following in .env.local:');
  console.error('  CLOUDINARY_API_KEY=your_api_key');
  console.error('  CLOUDINARY_API_SECRET=your_api_secret');
  console.error('  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dqde19mfs');
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
  mainImageUrl: string | null;
}

interface ImageMatch {
  productId: string;
  productName: string;
  productSlug: string;
  currentImageUrl: string | null;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  matchConfidence: 'high' | 'medium' | 'low';
  matchReason: string;
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
    "mainImageUrl": mainImage.asset->url
  }`;
  
  const products = await sanityClient.fetch(query);
  console.log(`✅ Found ${products.length} products in Sanity\n`);
  
  return products;
}

/**
 * Match Cloudinary images to Sanity products
 */
function matchImagesToProducts(
  cloudinaryImages: CloudinaryAsset[],
  sanityProducts: SanityProduct[]
): ImageMatch[] {
  console.log('🔄 Matching Cloudinary images to Sanity products...\n');
  
  const matches: ImageMatch[] = [];
  
  for (const product of sanityProducts) {
    const slug = product.slug;
    if (!slug) continue;
    
    // Try to find matching Cloudinary image
    // Match strategies (in order of confidence):
    // 1. Exact slug match in public_id
    // 2. Slug appears in public_id or folder
    // 3. Product name normalized matches public_id
    
    let bestMatch: CloudinaryAsset | null = null;
    let confidence: 'high' | 'medium' | 'low' = 'low';
    let reason = '';
    
    // Strategy 1: Exact match
    const exactMatch = cloudinaryImages.find(img => 
      img.public_id === slug || img.public_id.endsWith(`/${slug}`)
    );
    
    if (exactMatch) {
      bestMatch = exactMatch;
      confidence = 'high';
      reason = 'Exact slug match in public_id';
    } else {
      // Strategy 2: Slug contained in public_id
      const containsMatch = cloudinaryImages.find(img =>
        img.public_id.includes(slug) || img.public_id.includes(slug.replace(/-/g, '_'))
      );
      
      if (containsMatch) {
        bestMatch = containsMatch;
        confidence = 'medium';
        reason = 'Slug found in public_id';
      } else {
        // Strategy 3: Normalized name match
        const normalizedName = product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_|_$/g, '');
        
        const normalizedMatch = cloudinaryImages.find(img =>
          img.public_id.toLowerCase().includes(normalizedName) ||
          normalizedName.includes(img.public_id.toLowerCase().replace(/\//g, '_'))
        );
        
        if (normalizedMatch) {
          bestMatch = normalizedMatch;
          confidence = 'low';
          reason = 'Fuzzy match on product name';
        }
      }
    }
    
    if (bestMatch) {
      matches.push({
        productId: product._id,
        productName: product.name,
        productSlug: slug,
        currentImageUrl: product.mainImageUrl,
        cloudinaryUrl: bestMatch.secure_url,
        cloudinaryPublicId: bestMatch.public_id,
        matchConfidence: confidence,
        matchReason: reason,
      });
    }
  }
  
  console.log(`✅ Matched ${matches.length} products with Cloudinary images\n`);
  console.log(`   High confidence: ${matches.filter(m => m.matchConfidence === 'high').length}`);
  console.log(`   Medium confidence: ${matches.filter(m => m.matchConfidence === 'medium').length}`);
  console.log(`   Low confidence: ${matches.filter(m => m.matchConfidence === 'low').length}\n`);
  
  return matches;
}

/**
 * Update Sanity products with Cloudinary URLs
 */
async function updateSanityProducts(matches: ImageMatch[], dryRun: boolean = true): Promise<void> {
  if (dryRun) {
    console.log('📋 DRY RUN: Would update the following products:\n');
    matches.slice(0, 5).forEach(match => {
      console.log(`  ${match.productName}`);
      console.log(`    Current: ${match.currentImageUrl || 'NONE'}`);
      console.log(`    New:     ${match.cloudinaryUrl}`);
      console.log(`    Match:   ${match.matchConfidence} - ${match.matchReason}\n`);
    });
    console.log(`  ... and ${matches.length - 5} more\n`);
    return;
  }
  
  console.log('🔄 Updating Sanity products with Cloudinary URLs...\n');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const match of matches) {
    try {
      // Extract asset ID from Cloudinary URL
      // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}
      await sanityClient
        .patch(match.productId)
        .set({
          mainImage: {
            _type: 'cloudinaryImage',
            cloudinaryUrl: match.cloudinaryUrl,
            publicId: match.cloudinaryPublicId,
          }
        })
        .commit();
      
      successCount++;
      console.log(`✅ ${match.productName}`);
    } catch (error: any) {
      errorCount++;
      console.error(`❌ ${match.productName}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ Updated ${successCount} products`);
  console.log(`❌ Failed ${errorCount} products\n`);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--analyze';
  
  try {
    // Fetch data from both services
    const [cloudinaryImages, sanityProducts] = await Promise.all([
      fetchCloudinaryImages(),
      fetchSanityProducts(),
    ]);
    
    // Match images to products
    const matches = matchImagesToProducts(cloudinaryImages, sanityProducts);
    
    // Save matches to file
    const outputPath = path.join(process.cwd(), 'cloudinary-sanity-matches.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalCloudinaryImages: cloudinaryImages.length,
      totalSanityProducts: sanityProducts.length,
      totalMatches: matches.length,
      unmatchedProducts: sanityProducts.length - matches.length,
      matches,
    }, null, 2));
    
    console.log(`📄 Matches saved to: ${outputPath}\n`);
    
    // Handle different modes
    switch (mode) {
      case '--analyze':
        console.log('📊 Analysis complete. Review cloudinary-sanity-matches.json');
        console.log('Run with --preview to see what would be updated');
        console.log('Run with --execute to apply updates to Sanity');
        break;
        
      case '--preview':
        await updateSanityProducts(matches, true);
        console.log('Run with --execute to apply these updates');
        break;
        
      case '--execute':
        console.log('⚠️  This will update Sanity products with Cloudinary URLs!');
        console.log('Press Ctrl+C to cancel, or Enter to continue...');
        await new Promise(resolve => {
          process.stdin.once('data', resolve);
        });
        await updateSanityProducts(matches, false);
        break;
        
      default:
        console.log('Usage: npx tsx scripts/fetch-cloudinary-images.ts [--analyze|--preview|--execute]');
        process.exit(1);
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
