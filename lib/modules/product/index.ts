/**
 * Product Module
 *
 * This module provides a clean API for accessing product data from the modular system.
 * It abstracts away the details of how products are stored and accessed.
 */

import { ProductRepository } from './repository';
import { ModularProductRepository } from './modular-repository';
import { LegacyProductRepository } from './legacy-repository';
import { ProductNotFoundError, SeriesNotFoundError, CategoryNotFoundError } from './repository';
import { productModuleConfig } from './config';
import { ProductCategorySlug } from '@/lib/data/product-categories';

// Create the appropriate repository based on configuration
let repository: ProductRepository;

if (productModuleConfig.features.disableLegacySystem || productModuleConfig.features.fullModularMode) {
  repository = new ModularProductRepository();
} else {
  repository = new LegacyProductRepository();
}

/**
 * Get a product by its ID within a series and category
 */
export async function getProductById(categoryId: ProductCategorySlug, seriesId: string, productId: string) {
  return repository.getProductById(categoryId, seriesId, productId);
}

/**
 * Get a product (simplified API that assumes some defaults)
 */
export async function getProduct(categoryId: ProductCategorySlug, seriesId: string, productId: string) {
  return getProductById(categoryId, seriesId, productId);
}

/**
 * Get all products in a series
 */
export async function getProductsBySeries(seriesId: string, categoryId: ProductCategorySlug) {
  return repository.getProductsBySeries(categoryId, seriesId);
}

/**
 * Get a series by its ID within a category
 */
export async function getSeries(categoryId: ProductCategorySlug, seriesId: string) {
  return repository.getSeriesById(categoryId, seriesId);
}

/**
 * Get all series in a category
 */
export async function getAllSeriesInCategory(categoryId: ProductCategorySlug) {
  return repository.getAllSeries(categoryId);
}

// Export error types for use by consumers
export { ProductNotFoundError, SeriesNotFoundError, CategoryNotFoundError };