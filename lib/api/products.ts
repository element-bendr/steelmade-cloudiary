import { cache } from 'react'
import { ProductCategory } from '@/types/collections'
import { ProductData, ProductType } from '@/types/products' // Added import
import { APIError as ApiError } from '@/lib/errors'
import { getProductById as getProductFromService } from '@/lib/services/product-service'; // Added import

import { MOCK_PRODUCTS, MOCK_SERIES } from '@/lib/data/mock-data'

export const getProductsByCategoryAndSeries = cache(async (
  category: ProductCategory, 
  seriesId: string
): Promise<ProductData[]> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const products = MOCK_PRODUCTS[category]?.[seriesId] || [];
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new ApiError('Failed to fetch products', 500);
  }
});

export const getSeriesByCategoryAndId = cache(async (
  category: ProductCategory,
  seriesId: string
): Promise<import('@/types/collections').SeriesMetadata | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const series = MOCK_SERIES[category]?.[seriesId] || null;
    return series;
  } catch (error) {
    console.error('Error fetching series by ID:', error);
    throw new ApiError('Failed to fetch series', 500);
  }
});

export const getSeriesForCategory = cache(async (
  category: ProductCategory
): Promise<Record<string, import('@/types/collections').SeriesMetadata>> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const seriesMap = MOCK_SERIES[category] || {};
    return seriesMap;
  } catch (error) {
    console.error(`Error fetching series for category ${category}:`, error);
    throw new ApiError(`Failed to fetch series for category ${category}`, 500);
  }
});

export const getProductById = cache(async (
  category: ProductCategory,
  productId: string
): Promise<ProductData | null> => {
  try {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find the product in all series of the category
    const allCategoryProducts = Object.values(MOCK_PRODUCTS[category] || {}).flat() as ProductData[];
    const product = allCategoryProducts.find((p: ProductData) => p.id === productId) || null;

    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new ApiError('Failed to fetch product', 500);
  }
});

export async function getProductDetails(productId: string, seriesId: string, categorySlug: string): Promise<ProductData | undefined> {
  // Use the getProductById from product-service which uses the consolidated mockData
  const product = await getProductFromService(categorySlug as ProductType, seriesId, productId);
  return product || undefined; // Ensure undefined is returned if product is null
}
