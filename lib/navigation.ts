import type { ProductType } from "../lib/data/product-types";

// Maps ProductType (slug) to its display name (string that should be a ProductCategoryDisplay value)
export const productCategoryDisplayNames: Record<ProductType, string> = {
  "chairs": "Chairs",
  "tables": "Tables",
  "accessories": "Accessories",
  "desks": "Desks",
  "storage": "Storage",
  "lighting": "Lighting",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "school-furniture": "School Furniture",
  "storage-solutions": "Storage Solutions",
  "modular-furniture": "Modular Furniture",
  "office-accessories": "Office Accessories"
};

// Maps ProductType (slug) to its base URL path
export const productCategoryPaths: Record<ProductType, string> = {
  "chairs": "/chairs",
  "tables": "/tables",
  "accessories": "/accessories",
  "desks": "/desks",
  "storage": "/storage",
  "lighting": "/lighting",
  "hospital-furniture": "/hospital-furniture",
  "racking-systems": "/racking-systems",
  "school-furniture": "/school-furniture",
  "storage-solutions": "/storage-solutions",
  "modular-furniture": "/modular-furniture",
  "office-accessories": "/office-accessories"
};

// Helper to map display name to ProductType slug
const displayNameToSlugMap: Partial<Record<string, ProductType>> = {};
(Object.keys(productCategoryDisplayNames) as ProductType[]).forEach(slug => {
  const displayName = productCategoryDisplayNames[slug];
  displayNameToSlugMap[displayName] = slug;
});

export interface NavigationItem {
  title: string;
  href: string;
  category?: string; // e.g. "Chairs"
  children?: NavigationItem[];
}

// Updated to link to correct slug-based paths
export function getCategoryUrl(categorySlug: ProductType, seriesId?: string): string {
  const basePath = productCategoryPaths[categorySlug];
  if (!basePath) {
    console.warn(`Path not found for category slug: ${categorySlug}`);
    // Fallback to a generic slug construction
    const genericSlug = String(categorySlug).toLowerCase().replace(/\s+/g, '-');
    return seriesId ? `/${genericSlug}/${seriesId}` : `/${genericSlug}`;
  }
  return seriesId ? `${basePath}/${seriesId}` : basePath;
}

export function getProductUrl(categorySlug: ProductType, seriesId: string, productId: string): string {
  const basePath = productCategoryPaths[categorySlug];
  if (!basePath) {
    console.warn(`Path not found for category slug: ${categorySlug}`);
    // Fallback to a generic slug construction
    const genericSlug = String(categorySlug).toLowerCase().replace(/\s+/g, '-');
    return `/${genericSlug}/${seriesId}/${productId}`;
  }
  return `${basePath}/${seriesId}/${productId}`;
}

export const mainNavigation: NavigationItem[] = [
  {
    title: "Products",
    href: "/products", // Link to a potential top-level products overview page
    children: (Object.keys(productCategoryDisplayNames) as ProductType[]).map((slug) => {
      const displayName = productCategoryDisplayNames[slug];
      return {
        title: displayName,
        href: productCategoryPaths[slug], // Links to slug-based paths like /chairs, /desks
        category: displayName, // category is the display name "Chairs", "Desks"
      };
    }),
  }
  // ... other main navigation items like "About Us", "Contact", etc. should be preserved if they exist below
];