import { Product as BaseProduct } from '@/modules/product/types';

/**
 * Extended product type with features
 */
interface EnhancedProduct extends BaseProduct {
  features?: string[];
}

/**
 * Re-export the base types
 */
export type { EnhancedProduct };