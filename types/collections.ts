import type { ImageAsset } from "./image-types"
import type { ProductData } from "./products"

// Product specifications types
export interface CommonSpecs {
  Warranty: string;
  Assembly: string;
  [key: string]: string;
}

export interface Specifications {
  commonSpecs: CommonSpecs;
  variableSpecs: string[];
}

// Base metadata interface with image assets
export interface BaseImageMetadata {
  coverImage: ImageAsset;
  images: ImageAsset[];
}

// Base interfaces
export interface SeriesMetadata extends BaseImageMetadata {
  id: string;
  title: string;
  description: string;
  seoDescription: string;
  features: string[];
  lastModified: Date | string;
  products: Record<string, ProductData>;
  category: ProductCategory; // Added category
  imageUrl?: string; // Added imageUrl
  specifications?: Record<string, string>; // Added specifications
  tags?: string[]; // Added tags
}

// Collection interfaces
export interface CollectionMetadata extends BaseImageMetadata {
  title: string;
  description: string;
  seoDescription: string;
  features: string[];
  lastModified: Date | string;
}

export interface SeriesWithProducts extends BaseImageMetadata {
  seriesId: string;
  title: string;
  description: string;
  seoDescription: string;
  features: string[];
  products: Record<string, ProductData>;
  lastModified: Date | string;
  metadata?: CollectionMetadata;
}

export interface BaseCollection {
  id: string;
  title: string;
  description: string;
  lastModified: Date | string;
}

export interface SubCategoryCollection extends Partial<BaseCollection> {
  metadata: CollectionMetadata;
  series?: SeriesWithProducts[];
  products?: Record<string, ProductData>;
  priceRange?: { min: string; max: string };
  features?: string[];
  materials?: string[];
  specifications?: Specifications;
  seoDescription?: string;
  coverImage?: ImageAsset;
  images?: ImageAsset[];
  lastModified?: string;
}

export interface EmptySubCategoryCollection extends BaseCollection {}

export type ProductCategories = {
  [key: string]: SubCategoryCollection;
};

export interface CategoryCollections {
  [key: string]: ProductCategories | string | undefined;
  chairs: ProductCategories;
  desks: ProductCategories;
  "storage-solutions": ProductCategories; // Corrected from storage
  "school-furniture": ProductCategories;
  "hospital-furniture": ProductCategories;
  "racking-systems": ProductCategories;
  "modular-furniture": ProductCategories; // Added modular-furniture
  title?: string;
  description?: string;
  subCategories?: ProductCategories;
}

export type SubCategoryCollections = ProductCategories;

export type ProductCategoryKey = 
  | 'chairs' 
  | 'desks' 
  | 'storage-solutions' 
  | 'school-furniture' 
  | 'hospital-furniture' 
  | 'racking-systems' 
  | 'modular-furniture';

export type ProductCategorySlug =
  | "chairs"
  | "desks"
  | "storage-solutions"
  | "school-furniture"
  | "hospital-furniture"
  | "racking-systems"
  | "modular-furniture";

export type ProductCategory = 
  | 'chairs' 
  | 'desks' // Added 'desks'
  | 'storage-solutions'
  | 'school-furniture' // Corrected to 'school-furniture'
  | 'hospital-furniture' // Corrected to 'hospital-furniture'
  | 'racking-systems' // Corrected to 'racking-systems'
  | 'modular-furniture'; // Added modular-furniture

export interface CollectionData extends SeriesMetadata {
  id: string;
  products: Record<string, ProductData>; // Changed to match SeriesMetadata
}

export interface RelatedCollection {
  id: string;
  category: ProductCategory;
  title: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface ViewMoreSlideProps {
  collectionId: string;
  productCategory: ProductCategory;
  isVisible: boolean;
  className?: string;
}

export interface CollectionFilters {
  categories?: ProductCategoryKey[];
  priceRange?: [number, number];
  materials?: string[];
  styles?: string[];
  // Add other filter criteria as needed
}
