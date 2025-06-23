/**
 * Centralized type definitions for product categories
 * 
 * This file serves as the single source of truth for product category types
 * and provides helper functions for conversion between formats.
 */

/**
 * Internal slug-based product category identifiers
 * Used for URLs and as keys in data structures
 */
export type ProductCategorySlug = 
  | "chairs" 
  | "tables" 
  | "storage" 
  | "desks" 
  | "lighting" 
  | "accessories"
  | "hospital-furniture"
  | "racking-systems"
  | "school-furniture"
  | "storage-solutions"
  | "modular-furniture"
  | "office-accessories";

/**
 * Display names for product categories
 * Used for UI presentation
 */
export type ProductCategoryName = 
  | "Chairs" 
  | "Tables" 
  | "Storage Solutions" 
  | "Desks" 
  | "Lighting" 
  | "Accessories"
  | "Hospital Furniture"
  | "Racking Systems"
  | "School Furniture"
  | "Storage Solutions II"
  | "Modular Furniture"
  | "Office Accessories";

/**
 * Mapping between slugs and display names
 */
export const CATEGORY_DISPLAY_NAMES: Record<ProductCategorySlug, ProductCategoryName> = {
  "chairs": "Chairs",
  "tables": "Tables",
  "storage": "Storage Solutions",
  "desks": "Desks",
  "lighting": "Lighting",
  "accessories": "Accessories",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "school-furniture": "School Furniture",
  "storage-solutions": "Storage Solutions II",
  "modular-furniture": "Modular Furniture",
  "office-accessories": "Office Accessories"
};

/**
 * Mapping between display names and slugs
 */
export const CATEGORY_SLUGS: Record<ProductCategoryName, ProductCategorySlug> = {
  "Chairs": "chairs",
  "Tables": "tables",
  "Storage Solutions": "storage",
  "Desks": "desks",
  "Lighting": "lighting",
  "Accessories": "accessories",
  "Hospital Furniture": "hospital-furniture",
  "Racking Systems": "racking-systems",
  "School Furniture": "school-furniture",
  "Storage Solutions II": "storage-solutions",
  "Modular Furniture": "modular-furniture",
  "Office Accessories": "office-accessories"
};

/**
 * Convert a category slug to its display name
 */
export function getCategoryDisplayName(slug: ProductCategorySlug): ProductCategoryName {
  return CATEGORY_DISPLAY_NAMES[slug];
}

/**
 * Convert a category display name to its slug
 */
export function getCategorySlug(displayName: ProductCategoryName): ProductCategorySlug {
  return CATEGORY_SLUGS[displayName];
}

/**
 * Type guard to check if a string is a valid product category slug
 */
export function isValidCategorySlug(value: string): value is ProductCategorySlug {
  return Object.keys(CATEGORY_DISPLAY_NAMES).includes(value);
}

/**
 * Type guard to check if a string is a valid product category display name
 */
export function isValidCategoryName(value: string): value is ProductCategoryName {
  return Object.keys(CATEGORY_SLUGS).includes(value);
}

/**
 * For backward compatibility - re-export the slug type as ProductType
 * @deprecated Use ProductCategorySlug instead
 */
export type ProductType = ProductCategorySlug;

/**
 * For backward compatibility - re-export the name type as ProductCategory
 * @deprecated Use ProductCategoryName instead
 */
export type ProductCategory = ProductCategoryName;