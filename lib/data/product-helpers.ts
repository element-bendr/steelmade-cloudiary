import { Series } from "@/components/portfolio/types";
import type { ProductCategory } from "@/types/collections";
import type { ProductData } from "@/types/products";
import { ProductCatalog } from "./product-types";

// Helper functions to extract simplified data for portfolio view
export function getPortfolioSeries(catalog: ProductCatalog): Series[] {
  return Object.values(catalog).flatMap(categoryData => 
    Object.values(categoryData).map((series, index) => ({
      id: index + 1, // Generate sequential IDs for backward compatibility
      title: series.title,
      description: series.description,
      imageUrl: series.imageUrl || '', // Ensure imageUrl is never undefined
      products: Object.values(series.products).map((product, prodIndex) => ({
        id: ((index + 1) * 100) + (prodIndex + 1), // Generate compatible IDs (101, 102, 201, 202, etc.)
        title: product.name,
        description: product.description,
        imageUrl: product.imageUrl || ''
      }))
    }))
  ).filter(series => series.products.length > 0); // Only include series with products
}

// For development/testing
export function getMockData(catalog: ProductCatalog) {
  return catalog;
}

// Helper to get product data in the format expected by the mock data
export function getMockProductsData(catalog: ProductCatalog): Record<ProductCategory, Record<string, ProductData[]>> {  return Object.entries(catalog).reduce((acc, [category, seriesMap]) => {
    acc[category as ProductCategory] = {};
    
    Object.entries(seriesMap).forEach(([seriesId, series]) => {
      acc[category as ProductCategory][seriesId] = Object.values(series.products);
    });
    
    return acc;
  }, {} as Record<ProductCategory, Record<string, ProductData[]>>);
}