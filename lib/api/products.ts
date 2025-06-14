import { cache } from 'react'
import { APIError } from '@/lib/errors'
import { collections } from '@/lib/data/collections-data'
import { MOCK_SERIES, FlexibleSeriesData } from '@/lib/data/mock-data'
import { ProductCategorySlug, isValidCategorySlug, ProductCategoryName, getCategoryDisplayName } from '@/types/product-categories'
import { ProductData, ProductType } from '@/types/products'
import { getProductById as getProductFromService } from '@/lib/services/product-service'
import { SeriesMetadata } from '@/types/collections'

// Use imported collections data
const COLLECTIONS_DATA = collections;

// Define a type-safe way to access MOCK_SERIES with any valid ProductCategorySlug
type MockSeriesData = {
  [key in ProductCategorySlug]?: Record<string, SeriesMetadata>;
};

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

export const getSeriesByCategoryAndId = cache(async (
  category: ProductCategorySlug,
  seriesId: string
): Promise<SeriesMetadata | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Use our type-safe MockSeriesData type
    const typedMockSeries = MOCK_SERIES as MockSeriesData;
    const series = typedMockSeries[category]?.[seriesId] || null;
    return series;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new APIError('Failed to fetch series', 500);
  }
});

export const getSeriesForCategory = cache(async (
  category: ProductCategorySlug
): Promise<Record<string, SeriesMetadata>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Use our type-safe MockSeriesData type
    const typedMockSeries = MOCK_SERIES as MockSeriesData;
    const seriesMap = typedMockSeries[category] || {};
    return seriesMap;
  } catch (error) {
    console.error(`Error fetching series for category ${category}:`, error);
    throw new APIError(`Failed to fetch series for category ${category}`, 500);
  }
});

export async function getProductDetails(productId: string, seriesId: string, categorySlug: ProductCategorySlug): Promise<ProductData | undefined> {
  try {
    // Use the getProductById from product-service which uses the consolidated mockData
    const product = await getProductFromService(categorySlug as unknown as ProductType, seriesId, productId);
    return product || undefined; // Ensure undefined is returned if product is null
  } catch (error) {
    console.error(`Error fetching product details for ${categorySlug}/${seriesId}/${productId}:`, error);
    return undefined;
  }
}
