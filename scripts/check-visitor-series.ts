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

async function checkVisitorSeries() {
  console.log('\n🔍 VISITOR SERIES ANALYSIS\n');

  // Get Cloudinary assets in visitor-series folder
  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: 'steelmade/chairs/visitor-series/',
    max_results: 500,
  });

  const cloudinaryAssets = result.resources;
  console.log(`☁️  Cloudinary Assets in visitor-series folder: ${cloudinaryAssets.length}\n`);

  // Get all products with visitor series
  const visitorProducts = await sanityClient.fetch(`
    *[_type == "product" && (
      category == "chairs" && (
        series match "*visitor*" ||
        series match "*Visitor*" ||
        lower(series) match "*visitor*"
      )
    )] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "publicId": mainImage.publicId,
      "cloudinaryUrl": mainImage.cloudinaryUrl
    }
  `);

  console.log(`📊 Sanity Products with "visitor" in series: ${visitorProducts.length}\n`);

  // Check for products with "Visitor" in the name (like "Ace Visitor Chair")
  const allVisitorRelated = await sanityClient.fetch(`
    *[_type == "product" && (
      lower(category) match "*visitor*" ||
      lower(series) match "*visitor*" ||
      lower(name) match "*visitor*"
    )] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "publicId": mainImage.publicId
    }
  `);

  console.log(`📋 All products with "visitor" in name/category/series: ${allVisitorRelated.length}\n`);

  // Check products with visitor-series in publicId path
  const productsWithVisitorPath = await sanityClient.fetch(`
    *[_type == "product" && defined(mainImage.publicId) && mainImage.publicId match "*visitor-series*"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      category,
      series,
      "publicId": mainImage.publicId
    }
  `);

  console.log(`🔍 Products with "visitor-series" in publicId path: ${productsWithVisitorPath.length}\n`);

  // Check which Cloudinary assets are mapped
  const mappedPublicIds = new Set(productsWithVisitorPath.map(p => p.publicId).filter(Boolean));
  const unmappedAssets = cloudinaryAssets.filter(asset => 
    !mappedPublicIds.has(asset.public_id)
  );

  console.log(`✅ Mapped visitor-series assets: ${cloudinaryAssets.length - unmappedAssets.length}`);
  console.log(`❌ Unmapped visitor-series assets: ${unmappedAssets.length}\n`);

  if (unmappedAssets.length > 0) {
    console.log('🔍 UNMAPPED ASSETS:\n');
    unmappedAssets.forEach(asset => {
      const filename = asset.public_id.split('/').pop();
      console.log(`  - ${filename} (${asset.public_id})`);
    });
    console.log();
  }

  // Show all visitor-series products
  console.log(`\n📋 ALL PRODUCTS WITH VISITOR-SERIES PATH (${productsWithVisitorPath.length}):\n`);
  productsWithVisitorPath.forEach((p, i) => {
    console.log(`[${i + 1}] ${p.name}`);
    console.log(`    Category: ${p.category}`);
    console.log(`    Series: ${p.series || 'none'}`);
    console.log(`    Slug: ${p.slug}\n`);
  });

  console.log('\n📈 SUMMARY:');
  console.log(`  Cloudinary visitor-series folder: ${cloudinaryAssets.length} assets`);
  console.log(`  Products with visitor-series path: ${productsWithVisitorPath.length} products`);
  console.log(`  Products with "Visitor" in name: ${allVisitorRelated.length} products`);
  console.log(`  Gap: ${cloudinaryAssets.length - productsWithVisitorPath.length} products need series assignment\n`);

  if (productsWithVisitorPath.length < cloudinaryAssets.length) {
    console.log('\n⚠️  ACTION NEEDED:');
    console.log(`  ${cloudinaryAssets.length - productsWithVisitorPath.length} products need series field updated to "visitor-series" or "visitor"`);
    console.log(`  Run fix script to update series field for these products\n`);
  }
}

checkVisitorSeries().catch(console.error);
