/**
 * Unified Product Variants Type System
 * 
 * This module provides a standardized type system for product variants
 * across the application. It includes:
 * 
 * - ProductVariant: Standard format for product variants
 * - Helper functions for adapter patterns and type conversion
 * - Type guards for runtime validation
 */

/**
 * ProductVariant represents the standard format for product variants
 */
export interface ProductVariant {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
}

/**
 * Legacy variant format using different property names
 * (for backward compatibility)
 */
export interface LegacyVariant {
  variantId: string;
  variantName: string;
  description: string;
  imageUrl: string;
  specifications?: Record<string, string>;
}

/**
 * Check if an object is a valid ProductVariant
 */
export function isVariant(variant: any): variant is ProductVariant {
  return (
    variant !== null &&
    typeof variant === 'object' &&
    typeof variant.id === 'string' &&
    typeof variant.name === 'string' &&
    (variant.description === undefined || typeof variant.description === 'string') &&
    (variant.imageUrl === undefined || typeof variant.imageUrl === 'string')
  );
}

/**
 * Check if an object is a LegacyVariant
 */
export function isLegacyVariant(variant: any): variant is LegacyVariant {
  return (
    variant !== null &&
    typeof variant === 'object' &&
    typeof variant.variantId === 'string' &&
    typeof variant.variantName === 'string' &&
    typeof variant.description === 'string' &&
    typeof variant.imageUrl === 'string'
  );
}

/**
 * Convert a LegacyVariant to a ProductVariant
 */
export function adaptLegacyVariant(legacy: LegacyVariant): ProductVariant {
  return {
    id: legacy.variantId,
    name: legacy.variantName,
    description: legacy.description || undefined,
    imageUrl: legacy.imageUrl || undefined,
    specifications: legacy.specifications
  };
}

/**
 * Convert a ProductVariant to a LegacyVariant
 */
export function adaptToLegacyVariant(variant: ProductVariant): LegacyVariant {
  return {
    variantId: variant.id,
    variantName: variant.name,
    description: variant.description || '',
    imageUrl: variant.imageUrl || '',
    specifications: variant.specifications
  };
}

/**
 * Try to convert any variant-like object to a ProductVariant
 */
export function normalizeVariant(variant: any): ProductVariant | null {
  if (!variant) return null;
  
  if (isVariant(variant)) {
    return variant;
  }
  
  if (isLegacyVariant(variant)) {
    return adaptLegacyVariant(variant);
  }
    // Try to adapt based on available properties
  if (typeof variant === 'object') {
    const hasLegacyProps = 'variantId' in variant && 'variantName' in variant;
    const hasStandardProps = 'id' in variant && 'name' in variant;
    
    if (hasLegacyProps) {
      return {
        id: variant.variantId,
        name: variant.variantName,
        description: variant.description || undefined,
        imageUrl: variant.imageUrl || undefined,
        specifications: variant.specifications
      };
    }
    
    if (hasStandardProps) {
      return {
        id: variant.id,
        name: variant.name,
        description: variant.description || undefined,
        imageUrl: variant.imageUrl || undefined,
        specifications: variant.specifications
      };
    }
  }
  
  return null;
}