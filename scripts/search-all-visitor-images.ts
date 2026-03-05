#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqde19mfs',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function searchAllVisitorImages() {
  console.log('\n🔍 SEARCHING ALL CLOUDINARY FOLDERS FOR VISITOR IMAGES\n');

  // Get all chair images
  console.log('📊 SUMMARY OF ALL CHAIRS/ FOLDER:\n');
  const allChairs = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'steelmade/chairs/',
    max_results: 500,
  });

  const chairFolders = new Map<string, number>();
  allChairs.resources.forEach((asset: any) => {
    const parts = asset.public_id.split('/');
    if (parts.length >= 4) {
      const subfolder = parts[2]; // steelmade/chairs/[subfolder]
      chairFolders.set(subfolder, (chairFolders.get(subfolder) || 0) + 1);
    }
  });

  console.log('  Chair subfolders:');
  Array.from(chairFolders.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([folder, count]) => {
      console.log(`    ${folder}/: ${count} images`);
    });

  console.log(`\n💡 ANALYSIS:`);
  console.log(`  - Need: 12 more images for the 43 products`);
  console.log(`  - Check if visitor images exist in other folders\n`);

  const visitorAssets = allChairs.resources.filter((r: any) => 
    r.public_id.toLowerCase().includes('visitor')
  );

  const report = {
    totalChairImages: allChairs.resources.length,
    allChairFolders: Object.fromEntries(chairFolders),
    visitorImages: visitorAssets.length,
    visitorAssets: visitorAssets.map((r: any) => r.public_id),
  };

  fs.writeFileSync(
    'cloudinary-visitor-search.json',
    JSON.stringify(report, null, 2)
  );
  console.log('💾 Saved: cloudinary-visitor-search.json\n');
}

searchAllVisitorImages().catch(console.error);
