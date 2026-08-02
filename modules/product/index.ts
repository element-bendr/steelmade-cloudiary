/**
 * Product module exports
 */

// Export types
export * from './types';

// Export services
export * from './services';

// Create the ProductModule object for easier access to functionality
export const ProductModule = {
  // Product retrieval methods
  getProductBySlug: async (slug: string) => {
    const { ProductService } = await import('./services/product-service');
    return ProductService.getProductBySlug(slug);
  },
  
  getAllProducts: async () => {
    const { ProductService } = await import('./services/product-service');
    return ProductService.getAllProducts();
  },
  
  getProductsBySeriesSlug: async (categorySlug: string, seriesSlug: string) => {
    const { ProductService } = await import('./services/product-service');
    return ProductService.getProductsBySeriesSlug(categorySlug, seriesSlug);
  },
  
  // Series retrieval methods
  getSeriesBySlug: async (categorySlug: string, seriesSlug: string) => {
    const { ProductService } = await import('./services/product-service');
    return ProductService.getSeriesBySlug(categorySlug, seriesSlug);
  },
  
  getSeriesByCategory: async (categorySlug: string) => {
    const { ProductService } = await import('./services/product-service');
    return ProductService.getSeriesByCategory(categorySlug);
  }
};

// Module info for debugging and introspection
export const MODULE_INFO = {
  name: 'Product',
  version: '1.0.0',
  description: 'Product data and services',
  dependencies: ['Core', 'Utility', 'Image']
};