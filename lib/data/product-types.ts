/**
 * Global Product Types Configuration Map
 * (Bridged against Sanity for React Props backward compatibility)
 */

export type ProductType = 
  | 'chairs'
  | 'desks'
  | 'storage-solutions'
  | 'modular-furniture'
  | 'hospital-furniture'
  | 'racking-systems'
  | 'school-furniture'
  | 'office-accessories';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type?: 'primary' | 'gallery' | 'environment';
}

export interface Specification {
  name: string;
  value: string;
}

export interface ExtendedProductData {
  id: string;
  name: string;
  description: string;
  // Make features optional but default to array to avoid crashes
  features?: string[];
  // Fallback to array string for legacy compats, mapped objects for standard usage
  specifications: Record<string, string> | Specification[];
  
  // Mapping cloud links
  imageUrl: string;
  url?: string;
  images?: string[] | ProductImage[];
  
  // Legacy routing bindings
  series?: string;
  category?: ProductType | string;
  price?: Record<string, number>;
  
  // Internal tags
  new?: boolean;
}

export interface ProductSeries {
  id: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  products?: Record<string, ExtendedProductData> | ExtendedProductData[];
}
