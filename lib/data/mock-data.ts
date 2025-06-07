import type { ProductCategory, SeriesMetadata } from "@/types/collections";
import type { ProductData } from "@/types/products";
import { getMockData, getMockProductsData } from "./product-catalog";

// Use data from our consolidated catalog
export const MOCK_SERIES: Record<ProductCategory, Record<string, SeriesMetadata>> = getMockData();

// Generate MOCK_PRODUCTS based on the catalog
export const MOCK_PRODUCTS: Record<ProductCategory, Record<string, ProductData[]>> = getMockProductsData();
