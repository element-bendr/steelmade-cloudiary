import { chairs } from '@/lib/data/products/chairs';
import { ProductCategorySlug } from '../../../types/product-categories';
import { 
  ProductRepository, 
  ProductNotFoundError, 
  SeriesNotFoundError, 
  CategoryNotFoundError 
} from './repository';
import { ProductSeries } from '@/lib/data/product-types';
import { products } from '@/lib/data/products';
import { productModuleConfig } from './config';

/**
 * A repository implementation that uses the modular data structure
 * from lib/data/products/
 */
export class ModularProductRepository implements ProductRepository {
  
  async getProductById(category: ProductCategorySlug, seriesId: string, productId: string): Promise<any> {
    const seriesData = await this.getSeriesById(category, seriesId);
    
    if (!seriesData) {
      throw new SeriesNotFoundError(`Series not found: ${category}/${seriesId}`);
    }
    
    const product = seriesData.products[productId];
    
    if (!product) {
      throw new ProductNotFoundError(
        `Product not found: ${category}/${seriesId}/${productId}. ` +
        `Available products: ${Object.keys(seriesData.products).join(', ')}`
      );
    }
    
    return product;
  }
  
  async getProductsBySeries(category: ProductCategorySlug, seriesId: string): Promise<any[]> {
    const seriesData = await this.getSeriesById(category, seriesId);
    
    if (!seriesData) {
      throw new SeriesNotFoundError(`Series not found: ${category}/${seriesId}`);
    }
    
    return Object.values(seriesData.products);
  }
    async getSeriesById(category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null> {
    // If we're in full modular mode, use the consolidated products object
    if (productModuleConfig.features.fullModularMode) {
      const categoryData = products[category as keyof typeof products];
      
      if (!categoryData) {
        throw new CategoryNotFoundError(`Category not found: ${category}`);
      }
      
      return (categoryData as Record<string, ProductSeries>)[seriesId] || null;
    }
    
    // Otherwise, use the individual category exports based on migration status
    switch(category) {
      case 'chairs':
        return chairs[seriesId] || null;
      // Add cases for other categories as they're migrated
      default:
        // Check if the category is marked as migrated in the config
        const migratedCategories = productModuleConfig.features.migratedCategories as Record<string, boolean>;
        if (migratedCategories[category]) {
          const categoryData = products[category as keyof typeof products];
          return categoryData ? (categoryData as Record<string, ProductSeries>)[seriesId] || null : null;
        }
        throw new CategoryNotFoundError(`Category not implemented in modular system: ${category}`);
    }
  }
    async getAllSeries(category: ProductCategorySlug): Promise<Record<string, ProductSeries>> {
    // If we're in full modular mode, use the consolidated products object
    if (productModuleConfig.features.fullModularMode) {
      const categoryData = products[category as keyof typeof products];
      
      if (!categoryData) {
        throw new CategoryNotFoundError(`Category not found: ${category}`);
      }
      
      return categoryData as Record<string, ProductSeries>;
    }
    
    // Otherwise, use the individual category exports based on migration status
    switch(category) {
      case 'chairs':
        return chairs;
      // Add cases for other categories as they're migrated
      default:
        // Check if the category is marked as migrated in the config
        const migratedCategories = productModuleConfig.features.migratedCategories as Record<string, boolean>;
        if (migratedCategories[category]) {
          const categoryData = products[category as keyof typeof products];
          return (categoryData as Record<string, ProductSeries>) || {};
        }
        throw new CategoryNotFoundError(`Category not implemented in modular system: ${category}`);
    }
  }
}