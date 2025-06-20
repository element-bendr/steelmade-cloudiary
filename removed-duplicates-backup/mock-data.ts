import type { ProductCategory, SeriesMetadata } from "@/types/collections";
import type { ProductData } from "@/types/products";
import { getMockData, getMockProductsData } from "./product-catalog";
import { ProductCategorySlug } from "@/types/product-categories";

// Define a more flexible type that can work with both slugs and display names
export type FlexibleSeriesData = {
  [key: string]: Record<string, SeriesMetadata>;
};

// Use data from our consolidated catalog with a more flexible type
export const MOCK_SERIES: FlexibleSeriesData = getMockData();

// Generate MOCK_PRODUCTS based on the catalog
export const MOCK_PRODUCTS: Record<ProductCategory, Record<string, ProductData[]>> = getMockProductsData();
