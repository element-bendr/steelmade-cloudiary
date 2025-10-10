import { z } from 'zod';

export const RawProductVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  productId: z.string(),
  sku: z.string(),
  attributes: z.record(z.string()),
  isDefault: z.boolean().optional()
});

export type RawProduct = z.infer<typeof RawProductSchema>;
export type RawProductVariant = z.infer<typeof RawProductVariantSchema>;

export const RawProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  images: z.array(z.string()),
  variants: z.array(RawProductVariantSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  attributes: z.record(z.string()).optional()
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
  images: z.array(z.object({
    id: z.string(),
    url: z.string(),
    alt: z.string(),
    isDefault: z.boolean().optional()
  })).optional(),
  variants: z.array(ProductVariantSchema).optional(),
  specifications: z.record(z.string()).optional()
});

export type { Product, ProductVariant } from '../types';