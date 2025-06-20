/**
 * Legacy Product Repository
 * 
 * This is a compatibility layer that allows the new modular system to access 
 * data from the legacy product system during the transition period.
 * 
 * It will be removed once all products are migrated to the modular system.
 */

import { ProductRepository } from './repository';
import { ProductCategorySlug } from '@/lib/data/product-categories';
import { ProductSeries } from '@/lib/data/product-types';

/**
 * This repository implementation adapts the legacy product system to the new repository interface.
 * It's used as a fallback when products haven't been migrated to the modular system yet.
 */
export class LegacyProductRepository implements ProductRepository {
  
  async getProductById(category: ProductCategorySlug, seriesId: string, productId: string): Promise<any> {
    throw new Error('Legacy product system has been removed. Use the modular system instead.');
  }
  
  async getProductsBySeries(category: ProductCategorySlug, seriesId: string): Promise<any[]> {
    throw new Error('Legacy product system has been removed. Use the modular system instead.');
  }
  
  async getSeriesById(category: ProductCategorySlug, seriesId: string): Promise<ProductSeries | null> {
    throw new Error('Legacy product system has been removed. Use the modular system instead.');
  }
  
  async getAllSeries(category: ProductCategorySlug): Promise<Record<string, ProductSeries>> {
    throw new Error('Legacy product system has been removed. Use the modular system instead.');
  }
}