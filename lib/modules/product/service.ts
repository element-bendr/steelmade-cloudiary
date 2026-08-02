import { ProductRepository } from './repository';
import { ModularProductRepository } from './modular-repository';
import { ProductCategorySlug } from '../../../types/product-categories';

// Service class that provides product-related business logic
export class ProductService {
  private repository: ProductRepository;
  
  constructor(repository?: ProductRepository) {
    // Default to the ModularProductRepository if none is provided
    this.repository = repository || new ModularProductRepository();
  }
  
  /**
   * Get a product by its ID
   */
  async getProduct(category: ProductCategorySlug, seriesId: string, productId: string) {
    return this.repository.getProductById(category, seriesId, productId);
  }
  
  /**
   * Get all products in a series
   */
  async getProductsInSeries(category: ProductCategorySlug, seriesId: string) {
    return this.repository.getProductsBySeries(category, seriesId);
  }
  
  /**
   * Get series information
   */
  async getSeries(category: ProductCategorySlug, seriesId: string) {
    return this.repository.getSeriesById(category, seriesId);
  }
  
  /**
   * Get all series in a category
   */
  async getAllSeriesInCategory(category: ProductCategorySlug) {
    return this.repository.getAllSeries(category);
  }
  
  /**
   * Get a specific variant of a product
   */
  async getProductVariant(
    category: ProductCategorySlug, 
    seriesId: string, 
    productId: string, 
    variantId: string
  ) {
    const product = await this.getProduct(category, seriesId, productId);
    
    if (!product.variants) {
      throw new Error(`Product does not have variants: ${productId}`);
    }
    
    const variant = product.variants.find((v: any) => v.variantId === variantId);
    
    if (!variant) {
      throw new Error(
        `Variant not found: ${variantId}. ` +
        `Available variants: ${product.variants.map((v: any) => v.variantId).join(', ')}`
      );
    }
    
    return variant;
  }
}