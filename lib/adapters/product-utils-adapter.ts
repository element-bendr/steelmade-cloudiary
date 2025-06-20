import { getProductService } from '../../modules/product';

/**
 * Adapter functions to provide backward compatibility during migration
 * These functions will maintain the same interface as the old product-utils functions
 * but will use the new product module under the hood
 */

/**
 * Get product data by ID (legacy API adapter)
 * @deprecated Use ProductService directly
 */
export async function getProductById(category: string, seriesId: string, productId: string) {
  const productService = getProductService();
  return await productService.getProductByCategoryAndSeries(category, seriesId, productId);
}

/**
 * Get series data by ID (legacy API adapter)
 * @deprecated Use ProductService directly
 */
export async function getSeriesById(category: string, seriesId: string) {
  const productService = getProductService();
  return await productService.getSeriesByCategoryAndId(category, seriesId);
}

/**
 * Get all products in a category (legacy API adapter)
 * @deprecated Use ProductService directly
 */
export async function getAllProducts(category: string) {
  const productService = getProductService();
  return await productService.getProductsByCategory(category);
}

/**
 * Get all series in a category (legacy API adapter)
 * @deprecated Use ProductService directly
 */
export async function getAllSeries(category: string) {
  // TODO: Implement when ProductService has this method
  return {};
}