import { cache } from 'react'
import { APIError } from '../errors';
import { collections } from '../data/collections-data';
import { ProductCategorySlug, isValidCategorySlug, ProductCategoryName, getCategoryDisplayName } from '../../types/product-categories'
import { ExtendedProductData, ProductType, ProductSeries } from '../data/product-types'

// Use imported collections data
const COLLECTIONS_DATA = collections;

// Define a type-safe way to access MOCK_SERIES with any valid ProductCategorySlug
type MockSeriesData = {
  [key in ProductCategorySlug]?: Record<string, ProductSeries>;
};

/**
 * Get products by category and series
 */
export const getProductsByCategoryAndSeries = cache(async (
  category: ProductCategorySlug, 
  seriesId: string
): Promise<ExtendedProductData[]> => {
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
): Promise<ExtendedProductData | null> => {
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

export async function getProductDetails(productId: string, seriesId: string, categorySlug: ProductCategorySlug): Promise<ExtendedProductData | undefined> {
  try {
    // Use the getProductById from this module
    const product = await getProductById(categorySlug, seriesId, productId);
    return product || undefined; // Ensure undefined is returned if product is null
  } catch (error) {
    console.error(`Error fetching product details for ${categorySlug}/${seriesId}/${productId}:`, error);
    return undefined;
  }
}
