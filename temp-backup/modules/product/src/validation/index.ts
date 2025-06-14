import { z } from 'zod';
import type { Product } from '../types';

export const ProductImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
  isDefault: z.boolean().optional()
});

export const ProductVariantSchema = z.object({
  variantId: z.string(),
  variantName: z.string(),
  isDefault: z.boolean().optional()
});

export const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(ProductImageSchema).optional(),
  variants: z.array(ProductVariantSchema).optional(),
  specifications: z.record(z.string()).optional()
});

export function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}