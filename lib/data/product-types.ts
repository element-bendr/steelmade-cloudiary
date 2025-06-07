import type { ProductCategory, SeriesMetadata } from "@/types/collections";
import type { Series } from "@/components/portfolio/types";
import type { ProductData } from "@/types/products";

// Add this export to the product-types.ts file
export type ProductCategory = "chairs" | "tables" | "accessories";

// Extended product data with variants
export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications: Record<string, string>;
}

export interface ExtendedProductData extends ProductData {
  variants?: ProductVariant[];
}

export interface ProductSeries extends Omit<SeriesMetadata, 'products'> {
  products: Record<string, ExtendedProductData>;
}

export type ProductCatalog = Record<ProductCategory, Record<string, ProductSeries>>;