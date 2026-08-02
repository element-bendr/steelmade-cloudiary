/**
 * Product Module
 * Centralizes product-related functionality and data management
 */

import { ProductSchema, type Product } from './validation/schemas';
import { type ProductVariant } from './types';
import { ProductService } from './services/ProductService';

export {
  ProductService,
  ProductSchema,
  type Product,
  type ProductVariant
};