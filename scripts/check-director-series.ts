#!/usr/bin/env node
import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkDirectorSeries() {
  console.log('\n🔍 CHECKING DIRECTOR SERIES PRODUCTS\n');

  const products = await sanityClient.fetch(`
    *[_type == "product" && category == "chairs" && series == "director series"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      category,
      series,
      "hasMainImage": defined(mainImage),
      "mainImageType": mainImage._type,
      "publicId": mainImage.publicId,
      "sanityImageRef": mainImage.asset._ref,
      features,
      specifications
    }
  `);

  console.log(`📦 Found ${products.length} director series products\n`);

  products.forEach((p: any) => {
    console.log(`\n📌 ${p.name} (${p.slug})`);
    console.log(`   ID: ${p._id}`);
    console.log(`   Has mainImage: ${p.hasMainImage}`);
    console.log(`   Image type: ${p.mainImageType || 'N/A'}`);
    console.log(`   Cloudinary publicId: ${p.publicId || 'MISSING'}`);
    console.log(`   Sanity image ref: ${p.sanityImageRef || 'N/A'}`);
    console.log(`   Has description: ${!!p.description}`);
    console.log(`   Has features: ${p.features?.length || 0}`);
    console.log(`   Has specifications: ${!!p.specifications}`);
  });

  console.log('\n\n📊 SUMMARY:');
  const withImages = products.filter((p: any) => p.publicId);
  const withDescription = products.filter((p: any) => p.description);
  const withFeatures = products.filter((p: any) => p.features?.length > 0);

  console.log(`  Total products: ${products.length}`);
  console.log(`  With Cloudinary images: ${withImages.length}`);
  console.log(`  With descriptions: ${withDescription.length}`);
  console.log(`  With features: ${withFeatures.length}`);
  console.log(`  Missing images: ${products.length - withImages.length}\n`);

  if (products.length - withImages.length > 0) {
    console.log('⚠️  PRODUCTS WITHOUT CLOUDINARY IMAGES:\n');
    products.filter((p: any) => !p.publicId).forEach((p: any) => {
      console.log(`  - ${p.name} (${p.slug})`);
    });
    console.log();
  }
}

checkDirectorSeries().catch(console.error);
