import type { ProductCategoryDisplay, ProductType } from "@/types/products";

// Maps ProductType (slug) to its display name (string that should be a ProductCategoryDisplay value)
export const productCategoryDisplayNames: Record<ProductType, string> = {
  "chairs": "Chairs",
  "desks": "Desks",
  "storage-solutions": "Storage Solutions",
  "school-furniture": "School Furniture",
  "hospital-furniture": "Hospital Furniture",
  "racking-systems": "Racking Systems",
  "modular-furniture": "Modular Furniture"
};

// Maps ProductType (slug) to its base URL path
export const productCategoryPaths: Record<ProductType, string> = {
  "chairs": "/chairs",
  "desks": "/desks",
  "storage-solutions": "/storage-solutions",
  "school-furniture": "/school-furniture",
  "hospital-furniture": "/hospital-furniture",
  "racking-systems": "/racking-systems",
  "modular-furniture": "/modular-furniture"
};

// Helper to map ProductCategoryDisplay display name to ProductType slug
const displayNameToSlugMap: Partial<Record<ProductCategoryDisplay, ProductType>> = {};
// Safely iterate over productCategoryDisplayNames keys
(Object.keys(productCategoryDisplayNames) as ProductType[]).forEach(slug => {
  const displayName = productCategoryDisplayNames[slug] as ProductCategoryDisplay;
  displayNameToSlugMap[displayName] = slug;
});

export interface NavigationItem {
  title: string;
  href: string;
  category?: ProductCategoryDisplay; // e.g. "Chairs"
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
        category: displayName as ProductCategoryDisplay, // category is the display name "Chairs", "Desks"
      };
    }),
  }
  // ... other main navigation items like "About Us", "Contact", etc. should be preserved if they exist below
];