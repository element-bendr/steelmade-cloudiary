import type { ImageAsset } from "@/types/image-types"

export const IMAGE_DIMENSIONS = {
  productGrid: {
    width: 400,
    height: 300
  },
  productDetail: {
    width: 800,
    height: 600
  },
  categoryBanner: {
    width: 1200,
    height: 400
  }
} as const;

/**
 * Generate the image path for a product based on category and slug
 * @param category - The product category (e.g., 'chairs', 'desks')
 * @param slug - The product slug (e.g., 'standard-chair')
 * @returns The full image path for the product
 */
export function getProductImagePath(category: string, slug: string): string {
  return `/images/products/${category}/${slug}.webp`;
}


/**
 * Get the URL from an image, whether it's a string or an ImageAsset
 */
export function getImageUrl(image: string | ImageAsset | undefined): string {
  if (!image) return '';
  return typeof image === 'string' ? image : image.url;
}

/**
 * Get the width from an image, whether it's a string or an ImageAsset
 * Returns undefined for string images
 */
export function getImageWidth(image: string | ImageAsset | undefined): number | undefined {
  if (!image || typeof image === 'string') return undefined;
  return image.width;
}

/**
 * Get the height from an image, whether it's a string or an ImageAsset
 * Returns undefined for string images
 */
export function getImageHeight(image: string | ImageAsset | undefined): number | undefined {
  if (!image || typeof image === 'string') return undefined;
  return image.height;
}

/**
 * Convert an image to ImageAsset format, preserving existing ImageAsset objects
 */
export function getImageAsset(image: string | ImageAsset | undefined, alt?: string): ImageAsset | undefined {
  if (!image) return undefined;
  
  if (typeof image === 'string') {
    return {
      url: image,
      // Use default dimensions for string URLs
      width: 1200, 
      height: 630,
      alt: alt || ''
    };
  }
  
  return {
    ...image,
    alt: alt || image.alt || ''
  };
}

/**
 * Convert an image to OpenGraph format for metadata
 */
export function getOpenGraphImage(image: string | ImageAsset | undefined, alt: string): any {
  if (!image) return undefined;
  
  if (typeof image === 'string') {
    return { 
      url: image, 
      alt 
    };
  }
  
  return {
    url: image.url,
    width: image.width,
    height: image.height,
    alt: alt || image.alt || ''
  };
}
