#!/usr/bin/env node
import { createClient } from 'next-sanity';
import { v2 as cloudinary } from 'cloudinary';
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
});

async function verify() {
  console.log('\n🔍 FINAL VERIFICATION - All Cloudinary Assets Coverage\n');

  // Get all products
  const products = await sanityClient.fetch(`
    *[_type == "product"] {
      _id,
      name,
      "cloudinaryUrl": mainImage.cloudinaryUrl,
      "publicId": mainImage.publicId
    }
  `);

  const withImages = products.filter(p => p.cloudinaryUrl);

  console.log(`📊 SANITY PRODUCTS:`);
  console.log(`  Total: ${products.length}`);
  console.log(`  With Cloudinary Images: ${withImages.length}\n`);

  // Get all Cloudinary assets
  let allImages = [];
  let nextCursor = null;

  do {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'steelmade/',
      max_results: 500,
      next_cursor: nextCursor,
    });
    allImages.push(...result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  console.log(`☁️  CLOUDINARY ASSETS: ${allImages.length}\n`);

  // Get used publicIds
  const usedPublicIds = new Set(withImages.map(p => p.publicId).filter(Boolean));

  const unmappedCount = allImages.length - usedPublicIds.size;

  console.log(`📈 COVERAGE ANALYSIS:`);
  console.log(`  Total Cloudinary Assets: ${allImages.length}`);
  console.log(`  Unique Assets Mapped to Products: ${usedPublicIds.size}`);
  console.log(`  Unmapped Assets: ${unmappedCount}`);
  console.log(`  Coverage: ${((usedPublicIds.size / allImages.length) * 100).toFixed(1)}%\n`);

  if (unmappedCount === 0) {
    console.log(`🎉 SUCCESS: 100% Coverage Achieved!`);
    console.log(`✅ All ${allImages.length} Cloudinary assets now have corresponding products!\n`);
  } else {
    console.log(`⚠️  ${unmappedCount} assets remaining to map\n`);
  }

  // Summary
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                          FINAL ACHIEVEMENT                                 ║');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`  📦 Cloudinary Assets: ${allImages.length}`);
  console.log(`  🏷️  Sanity Products: ${products.length}`);
  console.log(`  ✅ Products with Images: ${withImages.length}`);
  console.log( `  🎯 Unique Assets Mapped: ${usedPublicIds.size}/${allImages.length} (${((usedPublicIds.size / allImages.length) * 100).toFixed(1)}%)\n`);
}

verify().catch(console.error);
