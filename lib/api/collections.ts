import { cache } from 'react'
import { APIError } from '../errors';
import { collections } from '../data/collections-data';
import { ProductCategorySlug, isValidCategorySlug } from '../../types/product-categories';
import { ProductSeries } from '../data/product-types'

// Use imported collections data instead of hardcoded data
const COLLECTIONS_DATA = collections;

/**
 * Get all series for a specific category or all categories
 */
export const getAllSeries = cache(async (category: ProductCategorySlug | 'all'): Promise<Record<string, ProductSeries>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return all series or filter by category
    if (category === 'all') {
      return Object.entries(COLLECTIONS_DATA).reduce((acc, [cat, series]) => {
        if (typeof series === 'object' && series !== null) {
          return { ...acc, ...(series as Record<string, ProductSeries>) };
        }
        return acc;
      }, {});
    }

    // Get series for the specific category
    if (isValidCategorySlug(category) && COLLECTIONS_DATA[category]) {
      return COLLECTIONS_DATA[category] as Record<string, ProductSeries>;
    }
    
    // Return empty object if category doesn't exist
    return {};
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});

/**
 * Get a specific series by its ID and category
 */
export const getSeriesById = cache(async (category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get the series data if category is valid
    if (isValidCategorySlug(category) && COLLECTIONS_DATA[category]) {
      const seriesData = COLLECTIONS_DATA[category]?.[seriesId] as ProductSeries | undefined;
      return seriesData || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});

export { isValidCategorySlug };
