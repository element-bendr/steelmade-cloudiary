interface SchemaContext {
  '@context': 'https://schema.org' | string;
}

interface SchemaType {
  '@type': string;
}

interface ContactPoint extends SchemaType {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  email?: string;
  contactOption?: string[];
}

interface GeoCoordinates extends SchemaType {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

interface PostalAddress extends SchemaType {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface Offer extends SchemaType {
  '@type': 'Offer';
  price: string | number;
  priceCurrency: string;
  availability: string;
  url?: string;
}

export interface Organization extends SchemaContext, SchemaType {
  '@type': 'Organization' | string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: ContactPoint;
}

export interface Product extends SchemaContext, SchemaType {
  '@type': 'Product' | string;
  name: string;
  description: string;
  image: string | string[];
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: Offer;
}

export interface BreadcrumbList extends SchemaContext, SchemaType {
  '@type': 'BreadcrumbList' | string;
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface LocalBusiness extends SchemaContext, SchemaType {
  '@type': 'FurnitureStore' | string;
  name: string;
  image: string;
  '@id': string;
  url: string;
  telephone: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange: string;
}

export interface WebSite extends SchemaContext, SchemaType {
  '@type': 'WebSite' | string;
  name: string;
  url: string;
  potentialAction?: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

export type JsonLdType = Organization | Product | WebSite | BreadcrumbList | LocalBusiness;