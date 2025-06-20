import type { ProductCategory as ProductCategoryType } from "./collections";

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  images?: ProductImage[];
  price?: string | number;
  inStock?: boolean;
  features?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: string[];
  slug: string;
}

export type ProductType =
  | "chairs"
  | "desks"
  | "storage-solutions" // Changed from "storage"
  | "hospital-furniture"
  | "school-furniture"
  | "racking-systems"
  | "modular-furniture"; // Added modular-furniture

export type ProductCategoryDisplay = // Renamed from ProductCategory
  | "Chairs"
  | "Desks"
  | "Storage Solutions" // Changed from "Storage"
  | "Hospital Furniture"
  | "School Furniture"
  | "Racking Systems"
  | "Modular Furniture"; // Added Modular Furniture

export interface ProductCategoryPageData {
  name: string;
  description?: string;
  products: Product[];
  featuredProducts?: Product[];
  subcategories?: ProductCategoryPageData[];
}

// Make sure the file in lib/types/product-types.ts and the one in types/products.ts
// have consistent definitions for product data types

// Define product-related types

// Define a product variant
export interface ProductVariant {
  variantId: string;
  variantName: string;
  description: string;
  imageUrl?: string;
  price?: number;
  availability?: "in-stock" | "low-stock" | "out-of-stock" | "pre-order";
}

// Define the base product data structure
export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  imageUrl: string;
  price: number;
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  relatedProducts?: string[];
}

// Define extended product data with additional fields
export interface ExtendedProductData extends ProductData {
  category: string;
  seriesId: string;
  weight?: string;
  dimensions?: string;
  materials?: string[];
  warranty?: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  customizationOptions?: {
    name: string;
    options: string[];
  }[];
}

// Define a product series
export interface ProductSeries {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  products: Record<string, ProductData>;
}

// Define a product category
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  series: Record<string, ProductSeries>;
}
