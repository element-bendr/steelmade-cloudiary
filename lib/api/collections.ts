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
