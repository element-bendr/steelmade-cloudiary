/**
 * Standardized Variant interface for product variants
 */
export interface Variant {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  inStock?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Legacy variant interface (for compatibility)
 * @deprecated Use Variant interface instead
 */
export interface LegacyVariant {
  variantId: string;
  variantName: string;
  description?: string;
  imageUrl?: string;
}

/**
 * Convert a legacy variant to the standardized format
 */
export function adaptLegacyVariant(legacyVariant: LegacyVariant): Variant {
  return {
    id: legacyVariant.variantId,
    name: legacyVariant.variantName,
    description: legacyVariant.description,
    imageUrl: legacyVariant.imageUrl
  };
}

/**
 * Convert a standardized variant to the legacy format
 */
export function adaptToLegacyVariant(variant: Variant): LegacyVariant {
  return {
    variantId: variant.id,
    variantName: variant.name,
    description: variant.description,
    imageUrl: variant.imageUrl
  };
}

/**
 * Type guard to check if an object is a LegacyVariant
 */
export function isLegacyVariant(variant: any): variant is LegacyVariant {
  return variant && 
    typeof variant === 'object' && 
    'variantId' in variant && 
    'variantName' in variant;
}

/**
 * Type guard to check if an object is a Variant
 */
export function isVariant(variant: any): variant is Variant {
  return variant && 
    typeof variant === 'object' && 
    'id' in variant && 
    'name' in variant;
}