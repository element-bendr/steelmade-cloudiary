#!/usr/bin/env node
/**
 * Check what was actually updated in Sanity products
 */

import { createClient } from 'next-sanity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkProducts() {
  // Fetch some products that should have been updated
  const query = `*[_type == "product" && name in ["Amazon Executive Chair", "18mm Privacy Screen", "Benz Executive Chair"]] {
    _id,
    name,
    mainImage,
    "mainImageUrl": mainImage.asset->url
  }`;
  
  const products = await sanityClient.fetch(query);
  
  console.log('\n📋 Sample Products After Update:\n');
  products.forEach((product: any) => {
    console.log(`\n${product.name}:`);
    console.log(`  mainImage structure:`, JSON.stringify(product.mainImage, null, 2));
    console.log(`  mainImageUrl:`, product.mainImageUrl);
  });
}

checkProducts();