// Removed broken export from non-existent products.ts
// export * from "./products";

// Re-export everything from collections.ts
export * from "./collections";

// Re-export everything from image-types.ts
export * from "./image-types";

export interface Organization {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  description?: string;
}

export interface Product {
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  offers?: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

export interface WebPage {
  '@type': 'WebPage';
  name: string;
  description?: string;
  url: string;
  isPartOf?: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
}

export type JsonLdType = {
  '@context': 'https://schema.org';
} & (Organization | Product | WebPage);
