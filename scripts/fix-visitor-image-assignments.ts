#!/usr/bin/env node
import { createClient } from 'next-sanity';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

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

interface Product {
  _id: string;
  name: string;
  slug: string;
  series: string;
  publicId: string;
}

async function analyzeImageAssignments() {
  console.log('\n🔍 ANALYZING VISITOR SERIES IMAGE ASSIGNMENTS\n');

  // Get Cloudinary assets
  const cloudinaryResult = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'steelmade/chairs/visitor-series/',
    max_results: 500,
  });

  const cloudinaryAssets = cloudinaryResult.resources.map((r: any) => r.public_id);
  console.log(`☁️  Cloudinary Assets: ${cloudinaryAssets.length}`);

  // Get visitor series products
  const products: Product[] = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && lower(series) match "*visitor*"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      series,
      "publicId": mainImage.publicId
    }
  `);

  console.log(`📦 Visitor Series Products: ${products.length}\n`);

  // Group by publicId
  const byPublicId = new Map<string, Product[]>();
  products.forEach(p => {
    if (p.publicId) {
      const existing = byPublicId.get(p.publicId) || [];
      existing.push(p);
      byPublicId.set(p.publicId, existing);
    }
  });

  // Find products sharing images
  const sharedImages = Array.from(byPublicId.entries()).filter(([_, prods]) => prods.length > 1);

  console.log('📊 IMAGE SHARING ANALYSIS:\n');
  console.log(`  Products: ${products.length}`);
  console.log(`  Unique images in use: ${byPublicId.size}`);
  console.log(`  Images shared by multiple products: ${sharedImages.length}`);
  console.log(`  Available Cloudinary assets: ${cloudinaryAssets.length}\n`);

  // Map products to available Cloudinary assets
  const usedImages = new Set(products.map(p => p.publicId).filter(Boolean));
  const availableImages = cloudinaryAssets.filter(id => !usedImages.has(id));

  console.log(`  Available unused Cloudinary images: ${availableImages.length}\n`);

  if (availableImages.length > 0) {
    console.log('✨ UNUSED CLOUDINARY ASSETS:\n');
    availableImages.forEach(id => {
      const filename = id.split('/').pop();
      console.log(`  - ${filename}`);
    });
    console.log();
  }

  console.log('🔍 PRODUCTS SHARING IMAGES (need unique assignment):\n');

  const needsReassignment: any[] = [];

  sharedImages.forEach(([publicId, prods]) => {
    const filename = publicId.split('/').pop();
    console.log(`📷 Image: ${filename} (shared by ${prods.length} products)`);
    
    prods.forEach((p, idx) => {
      const status = idx === 0 ? '✅ KEEP' : '🔄 NEEDS NEW IMAGE';
      console.log(`  ${status}: ${p.name} (${p.slug})`);
      
      if (idx > 0) {
        needsReassignment.push({
          productId: p._id,
          name: p.name,
          slug: p.slug,
          currentImage: filename,
          needsImage: true,
        });
      }
    });
    console.log();
  });

  console.log('\n📋 SUMMARY:\n');
  console.log(`  ✅ Products with correct unique images: ${products.length - needsReassignment.length}`);
  console.log(`  🔄 Products needing image reassignment: ${needsReassignment.length}`);
  console.log(`  📷 Available unused Cloudinary assets: ${availableImages.length}\n`);

  const report = {
    cloudinaryAssets: cloudinaryAssets.length,
    products: products.length,
    uniqueImagesInUse: byPublicId.size,
    needsReassignment: needsReassignment.length,
    availableImages: availableImages.length,
    productsNeedingImages: needsReassignment,
    unusedCloudinaryAssets: availableImages,
  };

  fs.writeFileSync(
    'visitor-image-assignment-report.json',
    JSON.stringify(report, null, 2)
  );
  console.log('💾 Report saved: visitor-image-assignment-report.json\n');

  if (needsReassignment.length > availableImages.length) {
    console.log('⚠️  WARNING: Not enough unused Cloudinary assets!');
    console.log(`  Need: ${needsReassignment.length} unique images`);
    console.log(`  Available: ${availableImages.length} unused assets`);
    console.log(`  Missing: ${needsReassignment.length - availableImages.length} images\n`);
    console.log('💡 ACTION REQUIRED:');
    console.log('  - Upload missing product images to Cloudinary (steelmade/chairs/visitor-series/)');
    console.log('  - Or consolidate products if they are true duplicates\n');
  } else {
    console.log('✅ Sufficient Cloudinary assets available for reassignment\n');
    console.log('💡 NEXT STEPS:');
    console.log('  1. Review visitor-image-assignment-report.json');
    console.log('  2. Match products to correct Cloudinary images');
    console.log('  3. Run update script to assign correct images\n');
  }

  console.log('🎯 GOAL: Each of the 43 visitor series products should have its own unique image\n');
}

analyzeImageAssignments().catch(console.error);
