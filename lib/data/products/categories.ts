import { ProductSeries } from '../product-types';
import { directorSeries } from './chairs/director-series';
import { executiveSeries } from './chairs/executive-series/index';
import { gamingSeries } from './chairs/gaming-series';
import { workstationsSeries } from './modular-furniture/workstations';

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

// Define the modular-furniture category
const modularFurniture: ProductCategory = {
  id: 'modular-furniture',
  name: 'Modular Furniture',
  description: 'Create flexible and efficient workspaces with our modular furniture solutions including workstations and office systems.',
  imageUrl: '/images/categories/modular-furniture.jpg',
  series: {
    'workstations': workstationsSeries
  }
};

// Define the hospital-furniture category
const hospitalFurniture: ProductCategory = {
  id: 'hospital-furniture',
  name: 'Hospital Furniture',
  description: 'Professional medical furniture designed for healthcare environments, combining functionality with patient comfort and safety.',
  imageUrl: '/images/categories/hospital-furniture.jpg',
  series: {}
};

// Define the school-furniture category
const schoolFurniture: ProductCategory = {
  id: 'school-furniture',
  name: 'School Furniture',
  description: 'Durable and ergonomic furniture solutions for educational institutions, designed to enhance learning environments.',
  imageUrl: '/images/categories/school-furniture.jpg',
  series: {}
};

// Define the racking-systems category
const rackingSystems: ProductCategory = {
  id: 'racking-systems',
  name: 'Racking Systems',
  description: 'Industrial-strength storage and racking solutions for warehouses, offices, and commercial spaces.',
  imageUrl: '/images/categories/racking-systems.jpg',
  series: {}
};

// Export all categories
const categories: Record<string, ProductCategory> = {
  chairs,
  tables,
  storage,
  'modular-furniture': modularFurniture,
  'hospital-furniture': hospitalFurniture,
  'school-furniture': schoolFurniture,
  'racking-systems': rackingSystems
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