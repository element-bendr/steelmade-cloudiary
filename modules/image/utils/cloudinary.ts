/**
 * Cloudinary image utility functions
 */

const CLOUDINARY_CLOUD_NAME = 'dqde19mfs';
const CLOUDINARY_VERSION = 'v1748785779';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_VERSION}`;

/**
 * Gets the base Cloudinary URL for the SteelMade account
 */
export function getCloudinaryBaseUrl(): string {
  return CLOUDINARY_BASE_URL;
}

/**
 * Gets a complete Cloudinary URL for a product image
 * @param path The path to the image without extension
 * @returns The complete Cloudinary URL
 */
export function getProductImageUrl(path: string): string {
  return `${CLOUDINARY_BASE_URL}/${path}.jpg`;
}

/**
 * Variant code mapping for chair variants
 */
const DIRECTOR_CHAIR_VARIANT_CODES: Record<string, Record<string, string>> = {
  ashley: {
    hb: 'ic-361-hb',
    mb: 'ic-362-mb',
  },
  opera: {
    hb: 'ic-340-hb',
    mb: 'ic-341-mb',
  },
  tycoon: {
    hb: 'ic-01-hb',
    mb: 'ic-02-mb',
  },
};

/**
 * Gets the image URL for a director chair variant
 * @param chairName The chair name (e.g., "ashley", "opera", "tycoon")
 * @param variantId The variant ID (e.g., "hb" for High Back, "mb" for Medium Back)
 * @returns The complete Cloudinary URL for the variant image
 */
export function getDirectorChairVariantImageUrl(chairName: string, variantId: string): string {
  // Get the variant code or use a default
  const variantCode = DIRECTOR_CHAIR_VARIANT_CODES[chairName]?.[variantId] || `ic-default-${variantId}`;
  
  // Construct the path
  const path = `steelmade/chairs/director-series/${chairName}/${variantCode}`;
  
  return getProductImageUrl(path);
}

/**
 * Extracts the chair name from a product slug
 * Example: "ashley-director-chair" -> "ashley"
 * @param productSlug The product slug
 * @returns The chair name
 */
export function getChairNameFromSlug(productSlug: string): string {
  // Split by hyphens and take the first part
  return productSlug.split('-')[0];
}

/**
 * Transforms a Cloudinary URL with additional parameters
 * @param path The path to the image without extension
 * @param options Transformation options
 * @returns The transformed Cloudinary URL
 */
export function getCloudinaryImageWithTransform(
  path: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'crop' | 'scale' | 'fit';
    quality?: number;
  } = {}
): string {
  // Build transformation string
  const transformations = [];
  
  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  
  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }
  
  if (options.quality) {
    transformations.push(`q_${options.quality}`);
  }
  
  const transformString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : '';
  
  return `${CLOUDINARY_BASE_URL}/${transformString}${path}.jpg`;
}