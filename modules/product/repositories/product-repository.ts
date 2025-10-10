import { safeObjectEntries, safeObjectValues } from '@/modules/utility';
import {
  Product,
  ProductVariant,
  ProductSeries,
  ProductCategory
} from '../types';

/**
 * ProductRepository interface
 * This defines the contract for accessing product data
 */
export interface IProductRepository {
  // Product retrieval
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategorySlug(categorySlug: string): Promise<Product[]>;
  getProductsBySeriesSlug(categorySlug: string, seriesSlug: string): Promise<Product[]>;
  
  // Series retrieval
  getSeriesBySlug(categorySlug: string, seriesSlug: string): Promise<ProductSeries | null>;
  getSeriesByCategorySlug(categorySlug: string): Promise<ProductSeries[]>;
  
  // Category retrieval
  getCategoryBySlug(categorySlug: string): Promise<ProductCategory | null>;
  getAllCategories(): Promise<ProductCategory[]>;
}

/**
 * InMemoryProductRepository implementation
 * This is a simple implementation that uses in-memory data
 */
export class InMemoryProductRepository implements IProductRepository {
  private productData: Record<string, any>;
  
  constructor(initialData: Record<string, any> = {}) {
    this.productData = initialData;
  }
  
  /**
   * Get a product by its slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      // Search through all categories and series to find the product
      for (const categoryEntry of safeObjectEntries(this.productData)) {
        const [categorySlug, categoryData] = categoryEntry;
        
        if (!categoryData || typeof categoryData !== 'object') {
          continue;
        }
        
        for (const seriesEntry of safeObjectEntries(categoryData)) {
          const [seriesSlug, seriesData] = seriesEntry;
          
          if (!seriesData || typeof seriesData !== 'object' || !seriesData.products) {
            continue;
          }
          
          for (const productEntry of safeObjectEntries(seriesData.products)) {
            const [productId, productData] = productEntry;
            
            if (productData && typeof productData === 'object' && productData.slug === slug) {
              return {
                ...productData,
                id: productId,
                categorySlug,
                seriesSlug
              } as Product;
            }
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error getting product by slug ${slug}:`, error);
      return null;
    }
  }
  
  /**
   * Get all products in a category
   */
  async getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
    try {
      const result: Product[] = [];
      const categoryData = this.productData[categorySlug];
      
      if (!categoryData || typeof categoryData !== 'object') {
        return result;
      }
      
      for (const seriesEntry of safeObjectEntries(categoryData)) {
        const [seriesSlug, seriesData] = seriesEntry;
        
        if (!seriesData || typeof seriesData !== 'object' || !seriesData.products) {
          continue;
        }
        
        for (const productEntry of safeObjectEntries(seriesData.products)) {
          const [productId, productData] = productEntry;
          
          if (productData && typeof productData === 'object') {
            result.push({
              ...productData,
              id: productId,
              categorySlug,
              seriesSlug
            } as Product);
          }
        }
      }
      
      return result;
    } catch (error) {
      console.error(`Error getting products by category ${categorySlug}:`, error);
      return [];
    }
  }
  
  /**
   * Get all products in a series
   */
  async getProductsBySeriesSlug(categorySlug: string, seriesSlug: string): Promise<Product[]> {
    try {
      const result: Product[] = [];
      const categoryData = this.productData[categorySlug];
      
      if (!categoryData || typeof categoryData !== 'object') {
        return result;
      }
      
      const seriesData = categoryData[seriesSlug];
      
      if (!seriesData || typeof seriesData !== 'object' || !seriesData.products) {
        return result;
      }
      
      for (const productEntry of safeObjectEntries(seriesData.products)) {
        const [productId, productData] = productEntry;
        
        if (productData && typeof productData === 'object') {
          result.push({
            ...productData,
            id: productId,
            categorySlug,
            seriesSlug
          } as Product);
        }
      }
      
      return result;
    } catch (error) {
      console.error(`Error getting products by series ${categorySlug}/${seriesSlug}:`, error);
      return [];
    }
  }
  
  /**
   * Get a series by its slug
   */
  async getSeriesBySlug(categorySlug: string, seriesSlug: string): Promise<ProductSeries | null> {
    try {
      const categoryData = this.productData[categorySlug];
      
      if (!categoryData || typeof categoryData !== 'object') {
        return null;
      }
      
      const seriesData = categoryData[seriesSlug];
      
      if (!seriesData || typeof seriesData !== 'object') {
        return null;
      }
      
      // Get products for this series
      const products = await this.getProductsBySeriesSlug(categorySlug, seriesSlug);
      
      return {
        ...seriesData,
        id: seriesSlug,
        slug: seriesSlug,
        categorySlug,
        products
      } as ProductSeries;
    } catch (error) {
      console.error(`Error getting series ${categorySlug}/${seriesSlug}:`, error);
      return null;
    }
  }
  
  /**
   * Get all series in a category
   */
  async getSeriesByCategorySlug(categorySlug: string): Promise<ProductSeries[]> {
    try {
      const result: ProductSeries[] = [];
      const categoryData = this.productData[categorySlug];
      
      if (!categoryData || typeof categoryData !== 'object') {
        return result;
      }
      
      for (const seriesEntry of safeObjectEntries(categoryData)) {
        const [seriesSlug, seriesData] = seriesEntry;
        
        if (!seriesData || typeof seriesData !== 'object') {
          continue;
        }
        
        // Get products for this series
        const products = await this.getProductsBySeriesSlug(categorySlug, seriesSlug);
        
        result.push({
          ...seriesData,
          id: seriesSlug,
          slug: seriesSlug,
          categorySlug,
          products
        } as ProductSeries);
      }
      
      return result;
    } catch (error) {
      console.error(`Error getting series by category ${categorySlug}:`, error);
      return [];
    }
  }
  
  /**
   * Get a category by its slug
   */
  async getCategoryBySlug(categorySlug: string): Promise<ProductCategory | null> {
    try {
      const categoryData = this.productData[categorySlug];
      
      if (!categoryData || typeof categoryData !== 'object') {
        return null;
      }
      
      // Get series for this category
      const series = await this.getSeriesByCategorySlug(categorySlug);
      
      return {
        id: categorySlug,
        slug: categorySlug,
        name: categoryData.title || categorySlug,
        description: categoryData.description || '',
        series
      } as ProductCategory;
    } catch (error) {
      console.error(`Error getting category ${categorySlug}:`, error);
      return null;
    }
  }
  
  /**
   * Get all categories
   */
  async getAllCategories(): Promise<ProductCategory[]> {
    try {
      const result: ProductCategory[] = [];
      
      for (const categoryEntry of safeObjectEntries(this.productData)) {
        const [categorySlug, categoryData] = categoryEntry;
        
        if (!categoryData || typeof categoryData !== 'object') {
          continue;
        }
        
        // Get series for this category
        const series = await this.getSeriesByCategorySlug(categorySlug);
        
        result.push({
          id: categorySlug,
          slug: categorySlug,
          name: categoryData.title || categorySlug,
          description: categoryData.description || '',
          series
        } as ProductCategory);
      }
      
      return result;
    } catch (error) {
      console.error('Error getting all categories:', error);
      return [];
    }
  }
}