/**
 * Product module type definitions
 */

/**
 * Product category
 */
export type ProductCategory = 'chairs' | 'desks' | 'storage' | 'modular-furniture';

/**
 * Product series
 */
export type ProductSeries = 'director-series' | 'executive-series' | 'ergonomic-series';

/**
 * Product variant interface
 */
export interface ProductVariant {
  id: string;
  variantId: string;
  variantName: string;
  images: string[];
  specifications?: Record<string, string | number | boolean>;
}

/**
 * Product interface
 */
export interface Product {
  id: string | number;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  seriesSlug: string;
  images: string[];
  variants: ProductVariant[];
  specifications?: Record<string, string | number | boolean>;
  featured?: boolean;
  features?: string[];
}

/**
 * Extended product data with additional fields
 */
export interface ExtendedProductData extends Product {
  materialOptions?: string[];
  colorOptions?: string[];
  relatedProducts?: string[];
}