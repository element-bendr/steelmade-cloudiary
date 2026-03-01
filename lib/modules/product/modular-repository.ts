import { categoryMap as products } from "@/lib/data/products/categories";
import { ProductCategorySlug } from '../../../types/product-categories';
import { 
  ProductRepository, 
  ProductNotFoundError, 
  SeriesNotFoundError, 
  CategoryNotFoundError 
} from './repository';
import { ProductSeries } from '@/lib/data/product-types';
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
    
    const product = seriesData.products?.[productId as keyof typeof seriesData.products];
    
    if (!product) {
      throw new ProductNotFoundError(
        `Product not found: ${category}/${seriesId}/${productId}. ` +
        `Available products: ${seriesData.products ? Object.keys(seriesData.products).join(', ') : 'none'}`
      );
    }
    
    return product;
  }
  
  async getProductsBySeries(category: ProductCategorySlug, seriesId: string): Promise<any[]> {
    const seriesData = await this.getSeriesById(category, seriesId);
    
    if (!seriesData || !seriesData.products) {
      throw new SeriesNotFoundError(`Series not found: ${category}/${seriesId}`);
    }
    
    return Object.values(seriesData.products);
  }

  async getSeriesById(category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null> {
    const categoryData: any = products[category as keyof typeof products];
    
    if (!categoryData || !categoryData.series) {
      throw new CategoryNotFoundError(`Category not found: ${category}`);
    }
    
    return (categoryData.series as Record<string, ProductSeries>)[seriesId] || null;
  }

  async getAllSeries(category: ProductCategorySlug): Promise<Record<string, ProductSeries>> {
    const categoryData: any = products[category as keyof typeof products];
    
    if (!categoryData || !categoryData.series) {
      throw new CategoryNotFoundError(`Category not found: ${category}`);
    }
    
    return categoryData.series as Record<string, ProductSeries>;
  }
}
