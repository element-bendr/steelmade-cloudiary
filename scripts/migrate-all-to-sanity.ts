import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { productCatalog } from '../lib/data/product-catalog';

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
  console.log('Starting full catalog migration...');
  
  // Migrate all categories
  for (const [categoryId, categoryData] of Object.entries(productCatalog)) {
    if (!categoryData || Object.keys(categoryData).length === 0) continue;
    
    console.log(`\n\n--- Migrating category: ${categoryId} ---\n`);

    for (const [seriesId, series] of Object.entries(categoryData as any)) {
      console.log(`Migrating series: ${series.title || seriesId}`);
      
      const products = series.products || {};
      for (const [productId, product] of Object.entries(products as any)) {
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
             category: categoryId,
             series: series.title || seriesId,
             features: product.features || [],
             specifications: Object.entries(product.specifications || {}).map(([key, value]) => ({
               _type: 'specification',
               name: key,
               value: value
             })),
             mainImage: mainImage,
          };

          try {
             // Create or replace so we can re-run this script safely
             const result = await client.createOrReplace(productDoc);
             console.log(`Successfully migrated ${product.name} (ID: ${result._id})`);
          } catch (error) {
             console.error(`Error saving ${product.name}:`, error);
          }
      }
    }
  }
  
  console.log('Finished migrating full catalog!');
}

migrate().catch(console.error);
