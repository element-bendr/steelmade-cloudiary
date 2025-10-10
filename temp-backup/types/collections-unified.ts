/**
 * Updated SeriesMetadata interface to include ProductCategorySlug type
 */
import { ProductCategorySlug } from './product-categories-unified';
import { ProductData } from './products';

export interface SeriesMetadata {
  title: string;
  description: string;
  imageUrl?: string;
  products?: Record<string, ProductData>;
  features?: string[];
  specifications?: Record<string, string>;
  // Add other properties as needed
  featured?: boolean;
  category?: ProductCategorySlug;
}