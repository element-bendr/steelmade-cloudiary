/**
 * Utility functions for Cloudinary image handling
 */

/**
 * Extract chair name from product slug
 * Example: "ashley-director-chair" -> "ashley"
 */
export function getChairNameFromSlug(productSlug: string): string {
  // Handle empty or undefined slugs
  if (!productSlug) {
    return '';
  }
  
  // Extract the first part of the slug (before first hyphen)
  const parts = productSlug.split('-');
  return parts[0] || '';
}

/**
 * Get the Cloudinary URL for a director chair variant
 * Maps variant IDs to specific image codes for different chair models
 */
export function getDirectorChairVariantImageUrl(chairName: string, variantId: string): string {
  // If chair name or variant ID is missing, return a placeholder
  if (!chairName || !variantId) {
    return 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/placeholder.jpg';
  }
  
  // Map variant ID to specific image codes
  let variantCode = '';
  
  if (chairName === 'ashley') {
    variantCode = variantId === 'hb' ? 'ic-361-hb' : 'ic-362-mb';
  } else if (chairName === 'opera') {
    variantCode = variantId === 'hb' ? 'ic-340-hb' : 'ic-341-mb';
  } else if (chairName === 'tycoon') {
    variantCode = variantId === 'hb' ? 'ic-01-hb' : 'ic-02-mb';
  } else {
    // For other chairs, use the variant ID directly
    variantCode = variantId;
  }
  
  // Return the full Cloudinary URL
  return `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/${chairName}/${variantCode}.jpg`;
}

/**
 * Get Cloudinary image with transformations
 */
export function getCloudinaryImageWithTransform(
  path: string, 
  options: { width?: number; height?: number; crop?: string; quality?: number }
): string {
  const base = 'https://res.cloudinary.com/dqde19mfs/image/upload';
  const transforms = [];
  
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  
  const transformString = transforms.length > 0 ? `${transforms.join(',')}/` : '';
  
  return `${base}/${transformString}${path}`;
}

/**
 * Get product image URL
 */
export function getProductImageUrl(path: string): string {
  return `https://res.cloudinary.com/dqde19mfs/image/upload/${path}.jpg`;
}