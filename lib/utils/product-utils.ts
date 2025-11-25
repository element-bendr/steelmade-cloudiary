// Utility functions for product data retrieval, now using canonical types
import { productCatalog } from '../data/product-catalog';
import type {
  ProductImage,
  ProductVariant,
  ExtendedProductData,
  ProductSeries
} from '../data/product-types';

/**
 * Get product data by ID (modular, production-ready)
 */
export function getProductById(category: string, seriesId: string, productId: string): ExtendedProductData | undefined {
  const series = (productCatalog as any)[category]?.[seriesId];
  if (!series || !series.products) return undefined;
  const product = series.products[productId];
  if (!product) {
    console.error(`Product not found: ${category}/${seriesId}/${productId}`);
    console.log('Available products:', Object.keys(series.products));
  }
  return product;
}

/**
 * Get series data by ID (modular, production-ready)
 */
export function getSeriesById(category: string, seriesId: string): ProductSeries | undefined {
  return (productCatalog as any)[category]?.[seriesId];
}

/**
 * Get all products in a category (modular, production-ready)
 */
export function getAllProducts(category: string): Record<string, ExtendedProductData> {
  const cat = (productCatalog as any)[category];
  if (!cat) return {};
  return Object.values(cat).reduce((acc: Record<string, ExtendedProductData>, series: any) => {
    if (series && series.products) {
      Object.entries(series.products).forEach(([id, product]) => {
        // Annotate product objects with category and seriesId so components
        // that build links (e.g. `/${product.category}/${product.seriesId}/${product.id}`)
        // have the required fields. This also helps generateStaticParams.
        acc[id] = {
          ...(product as ExtendedProductData),
          category,
          seriesId: series.id,
        } as ExtendedProductData;
      });
    }
    return acc;
  }, {});
}

/**
 * Get all series in a category, ensuring canonical ProductSeries type
 */
export function getAllSeries(category: string): Record<string, ProductSeries> {
  const raw = (productCatalog as any)[category] || {};
  // Optionally, add runtime validation or mapping here if needed
  return raw;
}