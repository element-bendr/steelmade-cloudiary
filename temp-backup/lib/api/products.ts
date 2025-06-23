import { cache } from 'react'
import { APIError } from '@/lib/errors'
import { collections } from '@/lib/data/collections-data'
import { ProductCategorySlug, isValidCategorySlug } from '@/types/product-categories'
import { ExtendedProductData, ProductType } from '@/lib/data/product-types'
import { getProductById as getProductFromService } from '@/lib/services/product-service'
import { SeriesMetadata } from '@/types/collections'

// Canonical collections data
const COLLECTIONS_DATA = collections;

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
    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return [];
    }
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId];
    if (!seriesData?.products) {
      console.warn(`No products found for series: ${seriesId} in category: ${category}`);
      return [];
    }
    return Object.values(seriesData.products) as ExtendedProductData[];
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
    if (!isValidCategorySlug(category) || !COLLECTIONS_DATA[category]) {
      console.warn(`Invalid category: ${category}`);
      return null;
    }
    const seriesData = COLLECTIONS_DATA[category]?.[seriesId];
    if (!seriesData?.products) {
      console.warn(`No products found for series: ${seriesId} in category: ${category}`);
      return null;
    }
    const product = seriesData.products[productId] as ExtendedProductData;
    if (!product) {
      console.warn(`Product not found: ${productId}`);
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
    await new Promise(resolve => setTimeout(resolve, 300));
    const series = COLLECTIONS_DATA[category]?.[seriesId] || null;
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
    await new Promise(resolve => setTimeout(resolve, 300));
    const seriesMap = COLLECTIONS_DATA[category] || {};
    return seriesMap;
  } catch (error) {
    console.error(`Error fetching series for category ${category}:`, error);
    throw new APIError(`Failed to fetch series for category ${category}`, 500);
  }
});

export async function getProductDetails(productId: string, seriesId: string, categorySlug: ProductCategorySlug): Promise<ExtendedProductData | undefined> {
  try {
    // Only allow ProductCategory subset for product-service
    const product = await getProductFromService(categorySlug as import('@/types/collections').ProductCategory, seriesId, productId);
    return product || undefined;
  } catch (error) {
    console.error(`Error fetching product details for ${categorySlug}/${seriesId}/${productId}:`, error);
    return undefined;
  }
}
