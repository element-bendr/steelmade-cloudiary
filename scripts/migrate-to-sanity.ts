import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { productCatalog } from '../lib/data/product-catalog';
import { chairs } from '../lib/data/products/chairs';

// Load env vars
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImageFromUrl(url: string, altText: string) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    // Upload the asset to Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: url.split('/').pop() || 'image.jpg',
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`Failed to upload image from URL ${url}:`, error);
    return null;
  }
}

async function migrate() {
  console.log('Starting migration...');
  
  // Example: Let's migrate just the chairs to test
  for (const [seriesId, series] of Object.entries(chairs)) {
    console.log(`Migrating series: ${series.title}`);
    
    for (const [productId, product] of Object.entries(series.products)) {
        console.log(`[x] Migrating product: ${product.name}`);
        
        let mainImage = null;
        if (product.imageUrl) {
           console.log(`Uploading main image for ${product.name}...`);
           mainImage = await uploadImageFromUrl(product.imageUrl, product.name);
        }

        const productDoc = {
           _type: 'product',
           _id: `imported-product-${product.id}`,
           name: product.name,
           slug: {
             _type: 'slug',
             current: product.id
           },
           description: product.description,
           category: 'chairs',
           series: series.title, // or link to a formal 'series' document if you have one
           features: product.features,
           specifications: Object.entries(product.specifications || {}).map(([key, value]) => ({
             _type: 'specification',
             name: key,
             value: value
           })),
           mainImage: mainImage,
        };

        try {
           const result = await client.createOrReplace(productDoc);
           console.log(`Successfully migrated ${product.name} (ID: ${result._id})`);
        } catch (error) {
           console.error(`Error saving ${product.name}:`, error);
        }
    }
  }
  
  console.log('Finished migrating!');
}

migrate().catch(console.error);
