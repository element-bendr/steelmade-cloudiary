export interface ProductData {
  id: string;
  name: string;
  productId: string; // Used as the slug in URLs
  description: string;
  imageUrl?: string;
  price: number | string;
  features?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: string[];
}

export interface SeriesData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  categoryId: string;
  products?: ProductData[];
}
