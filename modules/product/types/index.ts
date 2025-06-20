/**
 * Core Product module types and schemas
 * These types are shared across the entire product module
 */

import { z } from 'zod';
import { StringSchema, NumberSchema, OptionalStringSchema, IdSchema, SlugSchema } from '@/modules/core/types';
import { ImageSchema } from '@/modules/image/types';

/**
 * Product variant schema
 */
export const ProductVariantSchema = z.object({
  id: IdSchema,
  variantId: StringSchema,
  variantName: StringSchema,
  sku: OptionalStringSchema,
  price: z.number().optional(),
  isAvailable: z.boolean().optional().default(true),
  images: z.array(StringSchema).optional(),
  specifications: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});

/**
 * Product schema
 */
export const ProductSchema = z.object({
  id: IdSchema,
  slug: SlugSchema,
  name: StringSchema,
  description: StringSchema,
  categorySlug: StringSchema,
  seriesSlug: StringSchema,
  images: z.array(StringSchema),
  variants: z.array(ProductVariantSchema),
  specifications: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
  featured: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Product series schema
 */
export const ProductSeriesSchema = z.object({
  id: IdSchema,
  slug: SlugSchema,
  name: StringSchema,
  description: StringSchema,
  categorySlug: StringSchema,
  image: StringSchema.optional(),
  products: z.array(z.string()).optional(), // Array of product IDs
});

/**
 * Product category schema
 */
export const ProductCategorySchema = z.object({
  id: IdSchema,
  slug: SlugSchema,
  name: StringSchema,
  description: StringSchema,
  image: StringSchema.optional(),
  series: z.array(z.string()).optional(), // Array of series IDs
});

/**
 * Type exports
 */
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductSeries = z.infer<typeof ProductSeriesSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;