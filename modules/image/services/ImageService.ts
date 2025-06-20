/**
 * ImageService class for handling image-related operations
 */

import { logError, tryCatch } from '@modules/shared/utils/errors';

/**
 * Configuration for the ImageService
 */
interface ImageServiceConfig {
  cloudName: string;
  apiVersion: string;
  defaultFormat: string;
  defaultQuality: number;
}

/**
 * Default configuration for the ImageService
 */
const DEFAULT_CONFIG: ImageServiceConfig = {
  cloudName: 'dqde19mfs',
  apiVersion: 'v1748785779',
  defaultFormat: 'jpg',
  defaultQuality: 80,
};

/**
 * Options for image transformations
 */
export interface ImageTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'crop' | 'scale' | 'fit' | 'limit' | 'thumb';
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'auto';
}

/**
 * ImageService class for managing Cloudinary images
 */
export class ImageService {
  private config: ImageServiceConfig;
  private baseUrl: string;

  /**
   * Create a new ImageService instance
   */
  constructor(config: Partial<ImageServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.baseUrl = `https://res.cloudinary.com/${this.config.cloudName}/image/upload/${this.config.apiVersion}`;
  }

  /**
   * Get the base URL for Cloudinary images
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Generate a Cloudinary URL for the given path
   */
  getImageUrl(path: string, options: ImageTransformOptions = {}): string {
    try {
      if (!path) return '';
      
      // If the path is already a full URL, return it as is
      if (path.startsWith('http')) {
        return path;
      }
      
      // Build transformation string
      const transformations: string[] = [];
      
      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.crop) transformations.push(`c_${options.crop}`);
      if (options.quality) transformations.push(`q_${options.quality || this.config.defaultQuality}`);
      if (options.format) transformations.push(`f_${options.format}`);
      
      const transformString = transformations.length > 0 
        ? transformations.join(',') + '/'
        : '';
      
      const format = options.format || this.config.defaultFormat;
      const formatExtension = format === 'auto' ? '' : `.${format}`;
      
      return `${this.baseUrl}/${transformString}${path}${formatExtension}`;
    } catch (error) {
      logError(error, 'ImageService.getImageUrl');
      return '';
    }
  }

  /**
   * Generate a URL for a director chair variant image
   */
  getDirectorChairVariantImageUrl(chairName: string, variantId: string): string {
    return tryCatch(
      () => {
        // Map variant ID to specific image codes
        const variantCode = this.getVariantCode(chairName, variantId);
        
        return `${this.baseUrl}/steelmade/chairs/director-series/${chairName}/${variantCode}.jpg`;
      },
      // Fallback to a default image on error
      `${this.baseUrl}/steelmade/chairs/director-series/default.jpg`
    );
  }

  /**
   * Get the variant code for a specific chair and variant
   */
  private getVariantCode(chairName: string, variantId: string): string {
    // Mapping of director chair variants to their image codes
    const DIRECTOR_CHAIR_VARIANT_CODES: Record<string, Record<string, string>> = {
      'ashley': {
        'hb': 'ic-361-hb',
        'mb': 'ic-362-mb'
      },
      'opera': {
        'hb': 'ic-340-hb',
        'mb': 'ic-341-mb'
      },
      'tycoon': {
        'hb': 'ic-01-hb',
        'mb': 'ic-02-mb'
      }
    };

    // Get variant code from mapping, or use default format
    return (DIRECTOR_CHAIR_VARIANT_CODES[chairName]?.[variantId]) || `ic-${variantId}`;
  }
}