/**
 * Collections API - Unified
 * 
 * Provides functions for retrieving collection data using the unified type system.
 */

import { cache } from 'react'
import { APIError } from '@/lib/errors'
import { collections } from '@/lib/data/collections-data'
import { 
  ProductCategorySlug, 
  isValidCategorySlug,
  getAllCategorySlugs
} from '@/types/product-categories-unified'
import type { SeriesMetadata, CategoryCollections } from '@/types/collections'

// Use imported collections data with type assertion to match our unified type system
const COLLECTIONS_DATA = collections as any;

/**
 * Get all series for a specific category or all categories
 */
export const getAllSeries = cache(async (
  category: ProductCategorySlug | 'all'
): Promise<Record<string, SeriesMetadata>> => {
  try {
    // Validate inputs
    if (!category) {
      console.warn('Invalid argument: category is required');
      return {};
    }
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return all series across all categories
    if (category === 'all') {
      return Object.entries(COLLECTIONS_DATA).reduce((acc, [cat, series]) => {
        if (typeof series === 'object' && series !== null) {
          return { ...acc, ...(series as Record<string, SeriesMetadata>) };
        }
        return acc;
      }, {});
    }
    
    // Validate category for specific category requests
    if (!isValidCategorySlug(category)) {
      console.warn(`Invalid category slug: ${category}`);
      return {};
    }
    
    // Return series for specific category
    return COLLECTIONS_DATA[category] || {};
  } catch (error) {
    console.error('Error fetching series data:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});

/**
 * Get a specific series by its ID and category
 */
export const getSeriesById = cache(async (
  category: ProductCategorySlug, 
  seriesId: string
): Promise<SeriesMetadata | null> => {
  try {
    // Validate inputs
    if (!category || !seriesId) {
      console.warn('Invalid arguments: category and seriesId are required');
      return null;
    }
    
    // Validate category
    if (!isValidCategorySlug(category)) {
      console.warn(`Invalid category slug: ${category}`);
      return null;
    }
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get series data
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId];
    if (!seriesData) {
      return null;
    }
    
    // Ensure the metadata field is properly included
    const result: SeriesMetadata = {
      ...seriesData,
      metadata: seriesData.metadata || undefined,
      category: category as any // Type assertion to resolve compatibility issues
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new APIError('Failed to fetch series data', 500);
  }
});

/**
 * Get all available product categories
 */
export const getAllCategories = cache(async (): Promise<ProductCategorySlug[]> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return all category slugs
    return getAllCategorySlugs();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new APIError('Failed to fetch categories', 500);
  }
});

/**
 * Get featured series across all categories
 */
export const getFeaturedSeries = cache(async (
  limit: number = 6
): Promise<Array<SeriesMetadata & { id: string, category: ProductCategorySlug }>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Collect featured series from all categories
    const featured: Array<SeriesMetadata & { id: string, category: ProductCategorySlug }> = [];
    
    // Get all valid category slugs that exist in our data
    const categories = Object.keys(COLLECTIONS_DATA).filter(isValidCategorySlug);
    
    // Iterate through categories and collect featured series
    for (const category of categories) {
      const seriesInCategory = COLLECTIONS_DATA[category] || {};
      
      // Add series with category and id information
      Object.entries(seriesInCategory).forEach(([id, seriesObj]) => {
        if (!seriesObj || typeof seriesObj !== 'object') return;
        
        // Cast to SeriesMetadata to access properties safely
        const series = seriesObj as any;
        
        // Check if series has featured property
        const isFeatured = series.metadata?.featured === true;
        
        if (isFeatured) {
          // Create entry with complete required fields and proper type assertions
          const entry: SeriesMetadata & { id: string, category: ProductCategorySlug } = {
            ...series,
            id,
            category: category as ProductCategorySlug,
            metadata: series.metadata || undefined,
          };
          
          featured.push(entry);
        }
      });
    }
    
    // Sort by lastModified date if available, otherwise randomly
    const sorted = featured.sort((a, b) => {
      if (a.lastModified && b.lastModified) {
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
      return Math.random() - 0.5;
    });
    
    // Return limited number of featured series
    return sorted.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured series:', error);
    throw new APIError('Failed to fetch featured series', 500);
  }
});