/**
 * Products API
 * 
 * Provides functions for retrieving product data using the unified type system.
 */

import { cache } from 'react'
import { APIError } from '../errors';
import { collections } from '../data/collections-data';
import { ProductCategorySlug } from '../data/product-categories';
import { ExtendedProductData, ProductSeries } from '../data/product-types';

// Use imported collections data
const COLLECTIONS_DATA = collections;

/**
 * Get all products for a specific category and series
 */
export const getProductsByCategoryAndSeries = cache(async (
  category: ProductCategorySlug, 
  seriesId: string
): Promise<ExtendedProductData[]> => {
  try {
    // Validate inputs
    if (!category || !seriesId) {
      console.warn('Invalid arguments: category and seriesId are required');
      return [];
    }
    
    // Validate category
    if (!isValidCategorySlug(category)) {
      console.warn(`Invalid category slug: ${category}`);
      return [];
    }
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get series data
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
 * Get a specific product by its ID within a category and series
 */
export const getProductById = cache(async (
  category: ProductCategorySlug, 
  seriesId: string, 
  productId: string
): Promise<ExtendedProductData | null> => {
  try {
    // Validate inputs
    if (!category || !seriesId || !productId) {
      console.warn('Invalid arguments: category, seriesId, and productId are required');
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
 * Get a specific series by category and ID
 */
export const getSeriesByCategoryAndId = cache(async (
  category: ProductCategorySlug,
  seriesId: string
): Promise<ProductSeries | null> => {
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
): Promise<Record<string, ProductSeries>> => {
  try {
    // Validate inputs
    if (!category) {
      console.warn('Invalid argument: category is required');
      return {};
    }
    
    // Validate category
    if (!isValidCategorySlug(category)) {
      console.warn(`Invalid category slug: ${category}`);
      return {};
    }
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get series data
    const seriesMap = COLLECTIONS_DATA[category] || {};
    return seriesMap;
  } catch (error) {
    console.error(`Error fetching series for category ${category}:`, error);
    throw new APIError(`Failed to fetch series for category ${category}`, 500);
  }
});

/**
 * Check if the category slug is valid
 */
function isValidCategorySlug(category: string): category is ProductCategorySlug {
  return [
    'chairs',
    'hospital-furniture',
    'racking-systems',
    'school-furniture',
    'storage-solutions',
    'modular-furniture',
    'office-accessories',
  ].includes(category);
}