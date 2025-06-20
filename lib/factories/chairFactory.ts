/**
 * Chair Types - Standardized interfaces for chair data
 */
export interface ChairVariant {
  id: string;
  name: string;
  imageUrl: string;
  imageCode?: string; // Used for internal reference
}

export interface Chair {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  variants: ChairVariant[];
  features: string[];
  defaultVariant: string;
}

/**
 * Chair creation parameters
 */
export interface CreateDirectorChairParams {
  id: string;
  name: string;
  description: string;
  variants: Array<{
    id: string;
    name: string;
    imageCode: string;
  }>;
  features: string[];
  defaultVariant?: string;
}

/**
 * Generates a Cloudinary URL for a chair image
 */
export function getChairImageUrl(chairName: string, imageCode: string): string {
  return `https://res.cloudinary.com/dqde19mfs/image/upload/v1749458919/steelmade/chairs/director-series/${chairName}/${imageCode}.jpg`;
}

/**
 * Factory function to create a director chair with consistent structure
 */
export function createDirectorChair(params: CreateDirectorChairParams): Chair {
  const variants: ChairVariant[] = params.variants.map(variant => ({
    id: variant.id,
    name: variant.name,
    imageUrl: getChairImageUrl(params.id, variant.imageCode),
    imageCode: variant.imageCode
  }));

  const defaultVariant = params.defaultVariant || variants[0].id;
  const defaultVariantImage = variants.find(v => v.id === defaultVariant)?.imageUrl || variants[0].imageUrl;

  return {
    id: params.id,
    name: params.name,
    description: params.description,
    price: 'Contact for pricing',
    imageUrl: defaultVariantImage,
    category: 'director-series',
    variants,
    features: params.features,
    defaultVariant
  };
}