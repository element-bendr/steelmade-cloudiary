 
 import { cache } from 'react'
import { ProductCategory, SeriesMetadata } from '@/types/collections'
import { APIError } from '@/lib/errors'
import { collections } from '@/lib/data/collections-data'

// Use imported collections data instead of hardcoded data
const COLLECTIONS_DATA = collections;

export const getAllSeries = cache(async (category: ProductCategory | 'all'): Promise<Record<string, SeriesMetadata>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return all series or filter by category
    if (category === 'all') {
      return Object.entries(COLLECTIONS_DATA).reduce((acc, [cat, series]) => {
        if (typeof series === 'object' && series !== null) {
          return { ...acc, ...(series as Record<string, SeriesMetadata>) };
        }
        return acc;
      }, {});
    }
    
    return COLLECTIONS_DATA[category] || {};
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});

export const getSeriesById = cache(async (category: ProductCategory, seriesId: string): Promise<SeriesMetadata | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId] as SeriesMetadata | undefined;
    return seriesData || null;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});


## 2. In lib/data/mock-data.ts

Replace the `designer-series` section with:
chairs: {
  'director-series': [
    {
      id: "ashley-director-chair",
      name: "Ashley Director Chair",
      description: "The Ashley Director Chair offers versatile and durable seating solutions for professional environments, available in high-back and mid-back configurations.",
      seoDescription: "Discover the Ashley Director Chair series - premium, durable, and stylish seating for film sets and productions. Available in high-back and mid-back variants.",
      category: "chairs",
      seriesId: "director-series",
      imageUrl: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp",
      images: [
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-361-hb.webp", alt: "Ashley High-Back Director Chair", width: 800, height: 600 },
        { url: "https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/ashley/ic-362-mb.webp", alt: "Ashley Mid-Back Director Chair", width: 800, height: 600 }
      ],
      features: ["Durable Construction", "Professional Design", "Multiple Back Heights"],
      materials: ["Aircraft-grade aluminum", "Heavy-duty canvas"],
      lastModified: new Date("2025-06-04T00:00:00.000Z").toISOString(),
      variants: [
        {
          variantId: "ic-361-hb",
          variantName: "High-Back",
          name: "Ashley High-Back Director Chair IC-361-HB",
          // ...variant details as in the original changes
        },
        {
          variantId: "ic-362-mb",
          variantName: "Mid-Back",
          name: "Ashley Mid-Back Director Chair IC-362-MB",
          // ...variant details as in the original changes
        }
      ]
    },
    {
      id: "milano-director-chair",
      // ...Milano chair details as in the original changes
    },
    {
      id: "trident-director-chair",
      // ...Trident chair details as in the original changes
    }
  ]
}
