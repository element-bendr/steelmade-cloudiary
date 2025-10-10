export interface ChairVariant {
  id: string;
  name: string;
  features?: string[];
  image?: string;
  imageUrl?: string;
  images?: string[];
  imageCode?: string;
  [key: string]: unknown;
}

export interface Chair {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  variants?: ChairVariant[];
  features?: string[];
  defaultVariant?: string;
  [key: string]: unknown;
}
