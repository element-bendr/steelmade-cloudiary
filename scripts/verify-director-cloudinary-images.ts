#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqde19mfs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkDirectorImages() {
  console.log('\n🔍 CHECKING CLOUDINARY DIRECTOR SERIES IMAGES\n');

  // Get all director series images
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'steelmade/chairs/director-series/',
    max_results: 500,
  });

  console.log(`☁️  Found ${result.resources.length} images in director-series folder\n`);

  // Test specific images from the products
  const testImages = [
    'steelmade/chairs/director-series/kotak/ic-12-mb',
    'steelmade/chairs/director-series/grandezza/ic-04-hb',
    'steelmade/chairs/director-series/grandezza/ic-05-mb',
    'steelmade/chairs/director-series/milano/ic-252-mb',
  ];

  console.log('🔍 TESTING SPECIFIC PRODUCT IMAGES:\n');

  for (const publicId of testImages) {
    try {
      const asset = await cloudinary.api.resource(publicId);
      console.log(`✅ ${publicId}`);
      console.log(`   URL: ${asset.secure_url}`);
      console.log(`   Size: ${asset.width}x${asset.height}`);
      console.log(`   Format: ${asset.format}\n`);
    } catch (err: any) {
      console.log(`❌ ${publicId}`);
      console.log(`   ERROR: ${err.error?.message || err.message}\n`);
    }
  }

  console.log('\n📁 ALL DIRECTOR SERIES IMAGES:\n');
  result.resources.forEach((r: any) => {
    console.log(`  - ${r.public_id}`);
  });

  console.log(`\n📊 Total: ${result.resources.length} images in Cloudinary\n`);
}

checkDirectorImages().catch(console.error);
