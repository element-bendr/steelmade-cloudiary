import { ProductSeries } from '@/lib/data/product-types';
import { directorSeries } from './chairs/director-series';
import { executiveSeries } from './chairs/executive-series/index';
import { gamingSeries } from './chairs/gaming-series';

// Define the shape for a product category using canonical types
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  series: Record<string, ProductSeries>;
}

// Define the chairs category
const chairs: ProductCategory = {
  id: 'chairs',
  name: 'Chairs',
  description: 'High-quality, ergonomic chairs for every setting, from executive offices to gaming setups.',
  imageUrl: '/images/categories/chairs.jpg',
  series: {
    'director-series': directorSeries,
    'executive-series': executiveSeries,
    'gaming-series': gamingSeries as any // TODO: Refactor gamingSeries to canonical ProductSeries
  }
};

// Define the tables category
const tables: ProductCategory = {
  id: 'tables',
  name: 'Tables',
  description: 'Premium tables for offices, conference rooms, and home environments.',
  imageUrl: '/images/categories/tables.jpg',
  series: {}
};

// Define the storage category
const storage: ProductCategory = {
  id: 'storage',
  name: 'Storage Solutions',
  description: 'Stylish and functional storage solutions for organizing your space.',
  imageUrl: '/images/categories/storage.jpg',
  series: {}
};

// Export all categories
const categories: Record<string, ProductCategory> = {
  chairs,
  tables,
  storage
};

/**
 * Get a specific category by ID
 * @param categoryId The ID of the category to get
 * @returns The category or undefined if not found
 */
export function getCategory(categoryId: string): ProductCategory | undefined {
  return categories[categoryId];
}

/**
 * Get all categories
 * @returns An array of all categories
 */
export function getAllCategories(): ProductCategory[] {
  return Object.values(categories);
}

/**
 * Get a product by ID, searching across all categories and series
 * @param productId The ID of the product to find
 * @returns The product or undefined if not found
 */
export function getProductById(productId: string) {
  for (const category of Object.values(categories)) {
    for (const series of Object.values(category.series)) {
      if (series.products[productId]) {
        return series.products[productId];
      }
    }
  }
  return undefined;
}

export { categories };