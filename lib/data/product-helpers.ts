import type { ProductSeries, ExtendedProductData } from "@/lib/data/product-types";
import type { Series } from "@/components/portfolio/types";

// Canonical type for the full product catalog
export type ProductCatalogData = Record<string, Record<string, any>>;

// Helper functions to extract simplified data for portfolio view
export function getPortfolioSeries(): Series[] {
  return [];
}

// For development/testing
export function getMockData(catalog: ProductCatalogData) {
  return catalog as unknown as Record<string, Record<string, import("@/types/collections").SeriesMetadata>>;
}

// Helper to get product data in the format expected by the mock data
export function getProductData(catalog: ProductCatalogData) {
  return catalog as unknown as Record<string, Record<string, any>>;
}
