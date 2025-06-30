// LegacyProductRepository is deprecated and should not be used in production.
// This file exists only for backward compatibility and migration purposes.
import { ProductRepository } from './repository';
import { ProductCategorySlug } from '../../../types/product-categories';
import { ProductSeries } from '@/lib/data/product-types';

export class LegacyProductRepository implements ProductRepository {
  async getProductById(_category: ProductCategorySlug, _seriesId: string, _productId: string): Promise<any> {
    throw new Error('LegacyProductRepository is deprecated.');
  }
  async getProductsBySeries(_category: ProductCategorySlug, _seriesId: string): Promise<any[]> {
    throw new Error('LegacyProductRepository is deprecated.');
  }
  async getSeriesById(_category: ProductCategorySlug, _seriesId: string): Promise<ProductSeries | null> {
    throw new Error('LegacyProductRepository is deprecated.');
  }
  async getAllSeries(_category: ProductCategorySlug): Promise<Record<string, ProductSeries>> {
    throw new Error('LegacyProductRepository is deprecated.');
  }
}