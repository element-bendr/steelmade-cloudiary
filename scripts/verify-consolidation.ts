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

async function verifyConsolidation() {
  console.log('\n🔍 VERIFYING VARIANT CONSOLIDATION\n');

  // Check some consolidated products
  const testProducts = ['grandezza', 'kotak', 'milano', 'nano'];

  for (const slug of testProducts) {
    const product = await sanityClient.fetch(`
      *[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        "slug": slug.current,
        category,
        series,
        "mainImage": mainImage.publicId,
        variants[]{
          id,
          name,
          "image": image.publicId
        }
      }
    `, { slug });

    if (product) {
      console.log(`✅ ${product.name} (${product.slug})`);
      console.log(`   Series: ${product.series}`);
      console.log(`   Main Image: ${product.mainImage}`);
      console.log(`   Variants: ${product.variants?.length || 0}`);
      product.variants?.forEach((v: any) => {
        console.log(`     - ${v.name}: ${v.image}`);
      });
      console.log();
    } else {
      console.log(`❌ ${slug} NOT FOUND\n`);
    }
  }

  // Count total products
  const totalProducts = await sanityClient.fetch(`count(*[_type == "product"])`);
  const withVariants = await sanityClient.fetch(`count(*[_type == "product" && defined(variants) && length(variants) > 0])`);

  console.log('📊 SUMMARY:');
  console.log(`  Total products: ${totalProducts}`);
  console.log(`  Products with variants: ${withVariants}`);
  console.log(`  Products without variants: ${totalProducts - withVariants}\n`);
}

verifyConsolidation().catch(console.error);
