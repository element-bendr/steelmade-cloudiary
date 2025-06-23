import { ModularProductRepository } from './modular-repository';
import { ProductCategorySlug } from '../../types/product-categories';

// Create a singleton instance of the ModularProductRepository
const productRepository = new ModularProductRepository();

/**
 * Get a product by its ID
 * This function is used as a transitional API to replace the legacy getProductById
 */
export async function getProductById(productId: string, categoryId?: string, seriesId?: string) {
  // If category and series are provided, use them
  if (categoryId && seriesId) {
    return productRepository.getProductById(categoryId as ProductCategorySlug, seriesId, productId);
  }
  
  // For backward compatibility with legacy code that only provides productId
  // We'll need to search through all categories and series
  // This is inefficient but necessary during the transition
  try {
    // First try chairs category
    return await productRepository.getProductById('chairs', 'director-series', productId);
  } catch (error) {
    // If not found, try other categories
    // Add more categories as they're migrated to the modular system
    // This is a temporary solution until all code is updated to use the new API
    throw new Error(`Product not found: ${productId}. Please provide categoryId and seriesId.`);
  }
}

/**
 * Get a series by its ID
 * This function is used as a transitional API to replace the legacy getSeriesById
 */
export async function getSeriesById(seriesId: string, categoryId?: string) {
  // If category is provided, use it
  if (categoryId) {
    return productRepository.getSeriesById(categoryId as ProductCategorySlug, seriesId);
  }
  
  // For backward compatibility with legacy code that only provides seriesId
  try {
    // First try chairs category
    return await productRepository.getSeriesById('chairs', seriesId);
  } catch (error) {
    // If not found, try other categories
    throw new Error(`Series not found: ${seriesId}. Please provide categoryId.`);
  }
}

/**
 * Get all products in a series
 * This function is used as a transitional API to replace the legacy getProductsBySeries
 */
export async function getProductsBySeries(seriesId: string, categoryId?: string) {
  // If category is provided, use it
  if (categoryId) {
    return productRepository.getProductsBySeries(categoryId as ProductCategorySlug, seriesId);
  }
  
  // For backward compatibility with legacy code that only provides seriesId
  try {
    // First try chairs category
    return await productRepository.getProductsBySeries('chairs', seriesId);
  } catch (error) {
    // If not found, try other categories
    throw new Error(`Series not found: ${seriesId}. Please provide categoryId.`);
  }
}