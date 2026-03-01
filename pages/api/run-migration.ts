import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import { chairs } from '@/lib/data/products/chairs';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const operations: any[] = [];

    // Create Category
    operations.push(
      client.createOrReplace({
        _id: 'category-chairs',
        _type: 'category',
        id: 'chairs',
        name: 'Chairs',
        title: 'Office Chairs & Seating',
        description: 'Premium modern office chairs for comfort and style.',
      })
    );

    // Create Series
    const seriesGroups: Record<string, any> = {};
    chairs.forEach(chair => {
      if (!seriesGroups[chair.seriesId]) {
        seriesGroups[chair.seriesId] = {
          _id: `series-${chair.categoryId}-${chair.seriesId}`,
          _type: 'series',
          id: chair.seriesId,
          categoryId: chair.categoryId,
          name: chair.seriesId.charAt(0).toUpperCase() + chair.seriesId.slice(1),
          title: `${chair.seriesId.charAt(0).toUpperCase() + chair.seriesId.slice(1)} Series`,
          description: `The ${chair.seriesId} series collection.`
        };
      }
    });

    for (const s of Object.values(seriesGroups)) {
      operations.push(client.createOrReplace(s));
    }

    // Create Products
    for (const chair of chairs) {
      const productId = `product-${chair.categoryId}-${chair.seriesId}-${chair.id}`;
      
      const sanityProduct = {
        _id: productId,
        _type: 'product',
        id: chair.id,
        categoryId: chair.categoryId,
        seriesId: chair.seriesId,
        name: chair.name,
        description: chair.description,
        price: chair.price,
        features: chair.features || [],
        specifications: chair.specifications || {},
        images: chair.images || [],
        colors: chair.colors || [],
        tags: chair.tags || [],
        slug: { _type: 'slug', current: chair.id }
      };

      operations.push(client.createOrReplace(sanityProduct));
    }

    // Execute in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      await Promise.all(batch);
    }

    res.status(200).json({ success: true, message: `Migration Complete! Processed ${operations.length} items.` });
  } catch (error: any) {
    console.error('Migration failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
