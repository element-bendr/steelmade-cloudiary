// Define basic product data types
export interface ProductVariant {
  variantId: string;
  variantName: string;
  name?: string;
  description?: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  seriesId: string;
  imageUrl: string;
  price?: string;
  features?: string[];
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  images?: ImageAsset[];
  inStock?: boolean;
}

export interface ImageAsset {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSeries {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  products: Record<string, ProductData>;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  series: Record<string, ProductSeries>;
}