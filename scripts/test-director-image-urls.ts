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

async function testDirectorImageUrls() {
  console.log('\n🧪 TESTING DIRECTOR SERIES IMAGE URLs AFTER FIX\n');

  const query = `
    *[_type == "product" && category == "chairs" && series == "director series"] | order(name asc) [0...5] {
      _id,
      name,
      "slug": slug.current,
      "imageUrl": select(
        mainImage._type == "cloudinaryImage" => "https://res.cloudinary.com/dqde19mfs/image/upload/" + mainImage.publicId,
        mainImage.asset->url
      ),
      "mainImageType": mainImage._type,
      "publicId": mainImage.publicId
    }
  `;

  const products = await sanityClient.fetch(query);

  console.log(`✅ Query returned ${products.length} products\n`);

  products.forEach((p: any) => {
    console.log(`📌 ${p.name} (${p.slug})`);
    console.log(`   Type: ${p.mainImageType}`);
    console.log(`   PublicId: ${p.publicId}`);
    console.log(`   ImageUrl: ${p.imageUrl ? '✅ ' + p.imageUrl.substring(0, 80) + '...' : '❌ MISSING'}\n`);
  });

  const withUrls = products.filter((p: any) => p.imageUrl);
  const withoutUrls = products.filter((p: any) => !p.imageUrl);

  console.log('📊 SUMMARY:');
  console.log(`  ✅ Products with imageUrl: ${withUrls.length}/${products.length}`);
  console.log(`  ❌ Products without imageUrl: ${withoutUrls.length}/${products.length}\n`);

  if (withUrls.length === products.length) {
    console.log('🎉 SUCCESS! All products have imageUrl\n');
  } else {
    console.log('⚠️  Some products still missing imageUrl\n');
  }
}

testDirectorImageUrls().catch(console.error);
