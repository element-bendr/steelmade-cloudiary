/**
 * Product Repository Interface
 * 
 * This file defines the interface for product repositories and common error types.
 */

import { ProductCategorySlug } from '@/lib/data/product-categories';
import { ProductSeries } from '@/lib/data/product-types';

/**
 * Interface that all product repositories must implement
 */
export interface ProductRepository {
  /**
   * Get a product by its ID within a series and category
   */
  getProductById(category: ProductCategorySlug, seriesId: string, productId: string): Promise<any>;
  
  /**
   * Get all products in a series
   */
  getProductsBySeries(category: ProductCategorySlug, seriesId: string): Promise<any[]>;
  
  /**
   * Get a series by its ID within a category
   */
  getSeriesById(category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null>;
  
  /**
   * Get all series in a category
   */
  getAllSeries(category: ProductCategorySlug): Promise<Record<string, ProductSeries>>;
}

/**
 * Error thrown when a product is not found
 */
export class ProductNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

/**
 * Error thrown when a series is not found
 */
export class SeriesNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeriesNotFoundError';
  }
}

/**
 * Error thrown when a category is not found
 */
export class CategoryNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CategoryNotFoundError';
  }
}