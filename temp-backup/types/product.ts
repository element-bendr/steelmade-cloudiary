export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  variantId: string;
  variantName: string;
  name: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  inStock: boolean;
  imageUrl: string;
  images?: ProductImage[];
  features?: string[];
  specifications?: Record<string, string>;
  variants: ProductVariant[];
  price?: number;
}

export interface SeriesData {
  id: string;
  title: string;
  description: string;
  category: string;
  features?: string[];
  specifications?: Record<string, string>;
  products: Record<string, ProductData>;
}