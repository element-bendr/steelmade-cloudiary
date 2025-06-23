// Core product data types for the modular system

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description?: string;
  imageUrl: string;
  specifications?: Record<string, string>;
  price?: string;
  sku?: string;
  inStock?: boolean;
  imageClass?: string; // Optional custom image class for styling
}

export interface BaseProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  inStock?: boolean;
  imageUrl: string;
}

export interface ExtendedProductData extends BaseProductData {
  images?: ProductImage[];
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  price?: string;
  sku?: string;
}

export interface ProductSeries {
  id: string;
  title?: string;
  description?: string;
  seoDescription: string; // now required
  category?: string;
  imageUrl?: string;
  coverImage: ProductImage; // now required
  images?: ProductImage[];
  features?: string[];
  lastModified?: string;
  products: Record<string, ExtendedProductData>;
}

export type ProductCategoryData = Record<string, ProductSeries>;

// Add this export to the product-types.ts file
export type ProductType = 
  | "chairs" 
  | "tables" 
  | "accessories" 
  | "desks" 
  | "storage" 
  | "lighting"
  | "hospital-furniture"
  | "racking-systems"
  | "school-furniture"
  | "storage-solutions"
  | "modular-furniture"
  | "office-accessories";