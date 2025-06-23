import type { ProductCategoryData, ProductSeries, ExtendedProductData } from "@/lib/data/product-types";
import type { Series } from "@/components/portfolio/types";

// Canonical type for the full product catalog
export type ProductCatalogData = Record<string, ProductCategoryData>;

// Helper functions to extract simplified data for portfolio view
export function getPortfolioSeries(catalog: ProductCatalogData): Series[] {
  return Object.values(catalog).flatMap((categoryData) =>
    Object.values(categoryData).map((series, index) => ({
      id: index + 1, // Generate sequential IDs for backward compatibility
      title: series.title ?? '',
      description: series.description ?? '',
      imageUrl: series.imageUrl || '', // Ensure imageUrl is never undefined
      products: (Object.values(series.products) as ExtendedProductData[]).map((product, prodIndex) => ({
        id: ((index + 1) * 100) + (prodIndex + 1), // Generate compatible IDs (101, 102, 201, 202, etc.)
        title: product.name,
        description: product.description,
        imageUrl: product.imageUrl || ''
      }))
    }))
  ).filter(series => series.products.length > 0); // Only include series with products
}

// For development/testing
export function getMockData(catalog: ProductCatalogData) {
  return catalog as unknown as Record<string, Record<string, import("@/types/collections").SeriesMetadata>>;
}

// Helper to get product data in the format expected by the mock data
export function getMockProductsData(catalog: ProductCatalogData): Record<string, Record<string, any[]>> {
  return Object.entries(catalog).reduce((acc, [category, seriesMap]) => {
    if (!acc[category]) {
      acc[category] = {};
    }
    Object.entries(seriesMap).forEach(([seriesId, series]) => {
      const productsArray = (Object.values(series.products) as ExtendedProductData[]).map(product => ({
        ...(product as ExtendedProductData),
        category,
        seriesId
      }));
      acc[category][seriesId] = productsArray;
    });
    return acc;
  }, {} as Record<string, Record<string, any[]>>);
}

/**
 * Simple product data type for internal use
 */
interface SimpleProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  categorySlug?: string;
  seriesSlug?: string;
  images?: string[];
  variants?: any[];
  [key: string]: any;
}

/**
 * Get products by series slug - stub implementation that won't try to import missing modules
 */
export const getProductsBySeriesSlug = async (categorySlug: string, seriesSlug: string): Promise<SimpleProduct[]> => {
  console.log(`Getting products for ${categorySlug}/${seriesSlug}`);
  
  // Return empty array instead of trying to import missing modules
  return [];
};

/**
 * Get product by slug - stub implementation that won't try to import missing modules
 */
export const getProductBySlug = async (slug: string): Promise<SimpleProduct | null> => {
  console.log(`Getting product with slug: ${slug}`);
  
  // Return null instead of trying to import missing modules
  return null;
};

/**
 * Process series data safely
 */
export const processSeriesData = (seriesMap: Record<string, any> | null | undefined) => {
  if (!seriesMap) {
    console.warn('Invalid series map provided:', seriesMap);
    return [];
  }
  
  const result = [];
  
  // Process each series in the category using safe approach
  try {
    // Use for...in loop which is safer with potentially null objects
    for (const seriesId in seriesMap) {
      if (Object.prototype.hasOwnProperty.call(seriesMap, seriesId)) {
        const series = seriesMap[seriesId];
        if (series && typeof series === 'object') {
          result.push({
            id: seriesId,
            ...series
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing series data:', error);
  }
  
  return result;
};