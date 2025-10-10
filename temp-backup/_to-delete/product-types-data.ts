import type { ProductCategory as ImportedProductCategory, SeriesMetadata } from "@/types/collections";
import type { Series } from "@/components/portfolio/types";

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

// Extended product data with variants
export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images?: Array<{ url: string; alt: string; width: number; height: number }>;
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
}

export interface ProductSeries extends Omit<SeriesMetadata, 'products'> {
  products: Record<string, ExtendedProductData>;
}

export type ProductCatalog = {
  [key: string]: Record<string, ProductSeries>;
};