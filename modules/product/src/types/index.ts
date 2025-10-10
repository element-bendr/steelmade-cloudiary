import { z } from 'zod';

/**
 * Core product types and schemas
 */

export const ProductImageSchema = z.object({
  id: z.string(),
  url: z.string(),
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

export const ProductSeriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  products: z.array(ProductSchema)
});

export type ProductImage = z.infer<typeof ProductImageSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductSeries = z.infer<typeof ProductSeriesSchema>;