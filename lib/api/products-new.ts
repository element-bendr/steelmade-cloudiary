import { cache } from 'react'
import { APIError } from '@/lib/errors'
import { collections } from '@/lib/data/collections-data'
import { ProductCategorySlug, isValidCategorySlug } from '@/types/product-categories'
import { ProductData } from '@/types/products'
import { SeriesMetadata } from '@/types/collections'

// Use imported collections data
const COLLECTIONS_DATA = collections;

/**
 * Get products by category and series
 */
export const getProductsByCategoryAndSeries = cache(async (
  category: ProductCategorySlug, 
  seriesId: string
): Promise<ProductData[]> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate category and get series data
    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return [];
    }
    
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId];
    if (!seriesData?.products) {
      console.warn(`No products found for series: ${seriesId} in category: ${category}`);
      return [];
    }
    
    // Convert products record to array
    return Object.values(seriesData.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new APIError('Failed to fetch products', 500);
  }
});

/**
 * Get a product by its ID within a category and series
 */
export const getProductById = cache(async (
  category: ProductCategorySlug, 
  seriesId: string, 
  productId: string
): Promise<ProductData | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate category and get series data
    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return null;
    }
    
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId];
    if (!seriesData?.products) {
      console.warn(`No products found for series: ${seriesId} in category: ${category}`);
      return null;
    }
    
    // Get product by ID
    const product = seriesData.products[productId];
    if (!product) {
      console.warn(`Product not found: ${productId}`);
      // List available product IDs for debugging
      console.debug('Available products:', Object.keys(seriesData.products));
      return null;
    }
    
    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new APIError('Failed to fetch product', 500);
  }
});

/**
 * Get a series by category and ID
 */
export const getSeriesByCategoryAndId = cache(async (
  category: ProductCategorySlug,
  seriesId: string
): Promise<SeriesMetadata | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return null;
    }

    const series = COLLECTIONS_DATA[category]?.[seriesId] || null;
    return series;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new APIError('Failed to fetch series', 500);
  }
});

/**
 * Get all series for a specific category
 */
export const getSeriesForCategory = cache(async (
  category: ProductCategorySlug
): Promise<Record<string, SeriesMetadata>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return {};
    }

    const seriesMap = COLLECTIONS_DATA[category] || {};
    return seriesMap;
  } catch (error) {
    console.error(`Error fetching series for category ${category}:`, error);
    throw new APIError(`Failed to fetch series for category ${category}`, 500);
  }
});