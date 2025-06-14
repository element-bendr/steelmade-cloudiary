/**
 * Unified Product Categories Type System
 * 
 * This module provides a standardized type system for product categories
 * across the application. It includes:
 * 
 * - ProductCategorySlug: URL-friendly identifiers (e.g., "chairs", "tables")
 * - ProductCategoryName: User-friendly display names (e.g., "Chairs", "Tables")
 * - Helper functions for conversion between formats
 * - Type guards for runtime validation
 */

/**
 * ProductCategorySlug represents URL-friendly identifiers for product categories
 */
export type ProductCategorySlug = 
  | "chairs"
  | "desks"
  | "tables"
  | "storage-solutions"
  | "school-furniture"
  | "hospital-furniture"
  | "racking-systems"
  | "modular-furniture"
  | "office-accessories";

/**
 * ProductCategoryName represents user-friendly display names for product categories
 */
export type ProductCategoryName =
  | "Chairs"
  | "Desks"
  | "Tables"
  | "Storage Solutions"
  | "School Furniture"
  | "Hospital Furniture"
  | "Racking Systems"
  | "Modular Furniture"
  | "Office Accessories";

/**
 * Mapping between slugs and display names
 */
export const CATEGORY_MAP: Record<ProductCategorySlug, ProductCategoryName> = {
  "chairs": "Chairs",
  "desks": "Desks",
  "tables": "Tables",
  "storage-solutions": "Storage Solutions",
  "school-furniture": "School Furniture",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "modular-furniture": "Modular Furniture",
  "office-accessories": "Office Accessories",
};

/**
 * Check if a string is a valid ProductCategorySlug
 */
export function isValidCategorySlug(slug: string): slug is ProductCategorySlug {
  return Object.keys(CATEGORY_MAP).includes(slug as ProductCategorySlug);
}

/**
 * Check if a string is a valid ProductCategoryName
 */
export function isValidCategoryName(name: string): name is ProductCategoryName {
  return Object.values(CATEGORY_MAP).includes(name as ProductCategoryName);
}

/**
 * Convert a ProductCategorySlug to a ProductCategoryName
 */
export function getCategoryNameFromSlug(slug: ProductCategorySlug): ProductCategoryName {
  return CATEGORY_MAP[slug];
}

/**
 * For backward compatibility with existing code
 * @deprecated Use getCategoryNameFromSlug instead
 */
export function getCategoryDisplayName(slug: ProductCategorySlug): ProductCategoryName {
  return CATEGORY_MAP[slug];
}

/**
 * Convert a ProductCategoryName to a ProductCategorySlug
 */
export function getCategorySlugFromName(name: ProductCategoryName): ProductCategorySlug {
  const entry = Object.entries(CATEGORY_MAP).find(([_, value]) => value === name);
  if (!entry) {
    throw new Error(`Invalid category name: ${name}`);
  }
  return entry[0] as ProductCategorySlug;
}

/**
 * Get all valid category slugs
 */
export function getAllCategorySlugs(): ProductCategorySlug[] {
  return Object.keys(CATEGORY_MAP) as ProductCategorySlug[];
}

/**
 * Get all valid category names
 */
export function getAllCategoryNames(): ProductCategoryName[] {
  return Object.values(CATEGORY_MAP);
}

/**
 * Format a ProductCategorySlug for display
 * This is useful when you need to display a slug without converting it to a name
 */
export function formatCategorySlug(slug: ProductCategorySlug): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}