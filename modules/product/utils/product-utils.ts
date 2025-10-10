import { Product, ProductVariant } from '../types';

/**
 * Find the default variant for a product
 * @param product The product to find the default variant for
 * @returns The default variant or undefined if none is found
 */
export function findDefaultVariant(product: Product): ProductVariant | undefined {
  if (!product.variants || product.variants.length === 0) {
    return undefined;
  }
  
  // First try to find a variant with isDefault=true
  const defaultVariant = product.variants.find(variant => variant.isDefault === true);
  
  // If no default variant is found, return the first variant
  return defaultVariant || product.variants[0];
}

/**
 * Find the images for a product, optionally filtered by variant
 * @param product The product to find images for
 * @param variantId Optional variant ID to filter images by
 * @returns An array of image URLs
 */
export function findProductImages(product: Product, variantId?: string): string[] {
  if (!product.images || product.images.length === 0) {
    // Fall back to the main product image if it exists
    return product.imageUrl ? [product.imageUrl] : [];
  }
  
  // If a variant ID is provided, try to find variant-specific images
  if (variantId) {
    // This implementation assumes that variant-specific images contain the variant ID
    // in the filename. This is a simplification and would need to be adjusted based on
    // the actual image naming/tagging strategy used.
    const variantImages = product.images.filter(image => 
      image.toLowerCase().includes(variantId.toLowerCase())
    );
    
    if (variantImages.length > 0) {
      return variantImages;
    }
  }
  
  // If no variant-specific images were found or no variant was specified, return all images
  return product.images;
}

/**
 * Get a formatted display name for a product
 * @param product The product to get the display name for
 * @param includeVariant Whether to include the variant name in the display name
 * @returns The formatted display name
 */
export function getProductDisplayName(product: Product, includeVariant: boolean = false): string {
  if (!includeVariant) {
    return product.name;
  }
  
  const defaultVariant = findDefaultVariant(product);
  
  if (!defaultVariant) {
    return product.name;
  }
  
  return `${product.name} - ${defaultVariant.variantName}`;
}

/**
 * Check if a product has variants
 * @param product The product to check
 * @returns True if the product has variants, false otherwise
 */
export function hasVariants(product: Product): boolean {
  return !!product.variants && product.variants.length > 0;
}

/**
 * Get a product variant by ID
 * @param product The product to get the variant from
 * @param variantId The ID of the variant to get
 * @returns The variant or undefined if not found
 */
export function getVariantById(product: Product, variantId: string): ProductVariant | undefined {
  if (!product.variants) {
    return undefined;
  }
  
  return product.variants.find(variant => 
    variant.variantId === variantId || variant.id === variantId
  );
}