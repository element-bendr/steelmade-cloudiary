import type { ProductCategory } from "@/types/collections";
import type { Series } from "@/components/portfolio/types";
import { getPortfolioSeries as getPortfolioSeriesHelper, getMockData as getMockDataHelper, getMockProductsData as getMockProductsDataHelper, ProductCatalogData } from "./product-helpers";
import type { ProductSeries } from "@/lib/data/product-types";
import { chairs } from "./products/chairs";
import { desks } from "./products/desks";
import { storage } from "./products/storage";

// Single source of truth for all product data
export const productCatalog: ProductCatalogData = {
  chairs,
  desks,
  "storage-solutions": storage,
  "school-furniture": {},
  "hospital-furniture": {},
  "racking-systems": {},
  "modular-furniture": {},
  "office-accessories": {}
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
export function getMockProductsData(): Record<ProductCategory, Record<string, unknown[]>> {
  return getMockProductsDataHelper(productCatalog);
}