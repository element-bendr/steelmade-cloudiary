// Product types and interfaces

// Series metadata with extended product collection
export interface SeriesMetadata {
  id: string;
  title: string;
  description: string;
  seoDescription: string;
  coverImage: string;
  images?: string[];
  features: string[];
  lastModified: Date;
  products: Record<string, ProductData>; // Collection of products in this series
}

// Individual product data
export interface ProductData {
  id: string;
  name: string;
  description: string;
  seoDescription: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  price?: string;
  materials: string[];
  dimensions: {
    width: string;
    height: string;
    depth: string;
    weight: string;
  };
  lastModified: Date;
}

// For JSON-LD structured data
export interface BreadcrumbItem {
  name: string;
  item: string;
}