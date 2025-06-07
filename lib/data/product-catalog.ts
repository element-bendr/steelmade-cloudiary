import type { ProductCategory } from "@/types/collections";
import type { Series } from "@/components/portfolio/types";
import type { ProductData } from "@/types/products";
import { ProductCatalog } from "./product-types";
import { chairs, desks, storage } from "./products";
import { getPortfolioSeries as getPortfolioSeriesHelper, getMockData as getMockDataHelper, getMockProductsData as getMockProductsDataHelper } from "./product-helpers";

// Single source of truth for all product data
export const productCatalog: ProductCatalog = {
  chairs,
  desks,
  "storage-solutions": storage,
  "school-furniture": {},
  "hospital-furniture": {},
  "racking-systems": {},
  "modular-furniture": {}
};

// Helper functions that use the helpers from product-helpers.ts
export function getPortfolioSeries(): Series[] {
  return getPortfolioSeriesHelper(productCatalog);
}

// For development/testing
export function getMockData() {
  return getMockDataHelper(productCatalog);
}

// Helper to get product data in the format expected by the mock data
export function getMockProductsData(): Record<ProductCategory, Record<string, ProductData[]>> {
  return getMockProductsDataHelper(productCatalog);
}