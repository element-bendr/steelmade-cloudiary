import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type { CloudinaryImage, ImageOptions } from '@modules/image';
import { ValidationService } from '@modules/shared';
import { getEnvConfig } from '@modules/shared';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

export const CloudinaryImageService = {  config: (() => {
    const envResult = getEnvConfig();
    if (E.isLeft(envResult)) {
      throw new Error('Missing required Cloudinary environment variables');
    }
    const env = envResult.right;
    return {
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      apiSecret: env.CLOUDINARY_API_SECRET
    };
  })(),

  buildImageUrl: (publicId: string, transformations?: string): string => {
    const baseUrl = `https://res.cloudinary.com/${CloudinaryImageService.config.cloudName}/image/upload/`;
    return transformations ? `${baseUrl}${transformations}/${publicId}` : `${baseUrl}${publicId}`;
  },

  createTransformations: (options: ImageOptions): string => {
    const transforms: string[] = [];
    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.format) transforms.push(`f_${options.format}`);
    if (options.quality) transforms.push(`q_${options.quality}`);
    return transforms.join(',');
  },

  optimizeProductImage: (image: CloudinaryImage, options?: ImageOptions): CloudinaryImage => {
    const defaultOptions: ImageOptions = {
      format: 'webp',
      quality: 85,
      ...options
    };

    const transformations = CloudinaryImageService.createTransformations(defaultOptions);
    return {
      ...image,
      url: CloudinaryImageService.buildImageUrl(image.publicId, transformations),
      format: defaultOptions.format || image.format
    };
  }
};