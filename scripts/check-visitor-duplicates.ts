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

async function checkDuplicates() {
  console.log('\n🔍 CHECKING FOR DUPLICATE VISITOR SERIES PRODUCTS\n');

  // Get Cloudinary assets
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'steelmade/chairs/visitor-series/',
    max_results: 500,
  });

  console.log(`☁️  Cloudinary Assets: ${result.resources.length}\n`);

  // Get visitor series products
  const products = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && lower(series) match "*visitor*"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      series,
      "publicId": mainImage.publicId
    }
  `);

  console.log(`📊 Visitor Series Products: ${products.length}\n`);

  // Group by publicId
  const byPublicId = new Map<string, any[]>();
  products.forEach(p => {
    if (p.publicId) {
      const existing = byPublicId.get(p.publicId) || [];
      existing.push(p);
      byPublicId.set(p.publicId, existing);
    }
  });

  // Find duplicates
  const duplicates = Array.from(byPublicId.entries()).filter(([_, prods]) => prods.length > 1);
  const uniqueImages = byPublicId.size;

  console.log(`📈 ANALYSIS:`);
  console.log(`  Total products: ${products.length}`);
  console.log(`  Unique images: ${uniqueImages}`);
  console.log(`  Duplicate entries: ${duplicates.length}`);
  console.log(`  Cloudinary assets: ${result.resources.length}\n`);

  if (duplicates.length > 0) {
    console.log('🔍 DUPLICATE PRODUCTS (same image):\n');
    duplicates.forEach(([publicId, prods]) => {
      console.log(`Image: ${publicId.split('/').pop()}`);
      prods.forEach(p => {
        console.log(`  - ${p.name} (${p.slug})`);
      });
      console.log();
    });
  }

  // Check products without publicId in visitor series
  const productsWithoutImage = products.filter(p => !p.publicId);
  if (productsWithoutImage.length > 0) {
    console.log(`\n⚠️  ${productsWithoutImage.length} products without images:\n`);
    productsWithoutImage.forEach(p => {
      console.log(`  - ${p.name} (${p.slug})`);
    });
  }

  console.log('\n📊 EXPECTED vs ACTUAL:');
  console.log(`  Cloudinary assets: ${result.resources.length}`);
  console.log(`  Should show on website: ~${result.resources.length} products`);
  console.log(`  Currently in Sanity: ${products.length} products`);
  console.log(`  Unique images used: ${uniqueImages}`);
  console.log(`  Extra products (duplicates): ${products.length - uniqueImages}\n`);

  if (products.length - uniqueImages > 0) {
    console.log('💡 RECOMMENDATION:');
    console.log(`  The ${duplicates.length} duplicate product entries should be reviewed.`);
    console.log(`  Consider consolidating or ensuring they represent distinct variants.\n`);
  }
}

checkDuplicates().catch(console.error);
