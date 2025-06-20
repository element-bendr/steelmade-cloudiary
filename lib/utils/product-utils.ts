// Simple utility functions for product data retrieval
import { productCatalog } from '@/lib/data/product-catalog';

// Local type definitions without external imports
interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images?: ProductImage[];
  features?: string[];
  specifications?: Record<string, string>;
  variants: ProductVariant[];
}

export interface ProductSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  features?: string[];
  specifications?: Record<string, string>;
  products: Record<string, ExtendedProductData>;
}

// Removed mockData and mockSeries. All product and series lookups now use the modular product catalog.

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
        acc[id] = product as ExtendedProductData;
      });
    }
    return acc;
  }, {});
}

/**
 * Get all series in a category
 */
export function getAllSeries(category: string): Record<string, ProductSeries> {
  return (productCatalog as any)[category] || {};
}