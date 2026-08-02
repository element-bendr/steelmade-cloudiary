import { Image, ImageTransformation, CloudinaryImage } from '../types';

/**
 * Default Cloudinary configuration
 */
const DEFAULT_CONFIG = {
  cloudName: 'steelmade',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true
};

/**
 * Default transformation options
 */
const DEFAULT_TRANSFORMATION: ImageTransformation = {
  quality: 85,
  format: 'auto'
};

/**
 * CloudinaryService for handling Cloudinary images
 */
export class CloudinaryService {
  private cloudName: string;

  constructor(cloudName: string = DEFAULT_CONFIG.cloudName) {
    this.cloudName = cloudName;
  }

  /**
   * Build a Cloudinary URL for the given public ID and options
   */
  buildUrl(publicId: string, options: Partial<ImageTransformation> = {}): string {
    const transformation = { ...DEFAULT_TRANSFORMATION, ...options };
    
    // Build the transformation string
    const transformationParts: string[] = [];
    
    if (transformation.width) {
      transformationParts.push(`w_${transformation.width}`);
    }
    
    if (transformation.height) {
      transformationParts.push(`h_${transformation.height}`);
    }
    
    if (transformation.quality) {
      transformationParts.push(`q_${transformation.quality}`);
    }
    
    if (transformation.crop) {
      transformationParts.push(`c_${transformation.crop}`);
    }
    
    if (transformation.gravity) {
      transformationParts.push(`g_${transformation.gravity}`);
    }
    
    if (transformation.format && transformation.format !== 'auto') {
      transformationParts.push(`f_${transformation.format}`);
    }
    
    const transformationString = transformationParts.length > 0
      ? `${transformationParts.join(',')}` 
      : '';
    
    const transformationSegment = transformationString
      ? `${transformationString}/`
      : '';
    
    // Build the URL
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformationSegment}${publicId}`;
  }

  /**
   * Create a CloudinaryImage object for the given public ID and options
   */
  createImage(publicId: string, options: Partial<{
    alt: string;
    width: number;
    height: number;
    transformation: Partial<ImageTransformation>;
  }> = {}): CloudinaryImage {
    const transformation = { ...DEFAULT_TRANSFORMATION, ...(options.transformation || {}) };
    
    return {
      id: publicId,
      publicId,
      url: this.buildUrl(publicId, transformation),
      alt: options.alt || '',
      width: options.width,
      height: options.height,
      provider: 'cloudinary',
      cloudName: this.cloudName,
      transformation
    };
  }

  /**
   * Get a placeholder blur data URL for the image
   * This can be used with Next.js Image component's blurDataURL prop
   */
  getPlaceholderDataUrl(): string {
    // Simple 1x1 pixel transparent image
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8Y3KWvAAAAABJRU5ErkJggg==';
  }
}