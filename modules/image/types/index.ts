import { z } from 'zod';
import {
  StringSchema,
  NumberSchema,
  OptionalStringSchema,
  UrlSchema
} from '@/modules/core/types';

/**
 * Image transformation options schema
 */
export const ImageTransformationSchema = z.object({
  width: NumberSchema.optional(),
  height: NumberSchema.optional(),
  quality: z.number().min(1).max(100).optional(),
  format: z.enum(['auto', 'webp', 'jpeg', 'png', 'avif']).optional(),
  crop: z.enum(['fill', 'limit', 'fit', 'crop', 'thumb']).optional(),
  gravity: z.enum(['auto', 'center', 'face', 'faces', 'north', 'south', 'east', 'west']).optional(),
});

/**
 * Image schema
 */
export const ImageSchema = z.object({
  id: StringSchema,
  publicId: StringSchema,
  url: UrlSchema,
  alt: OptionalStringSchema,
  width: NumberSchema.optional(),
  height: NumberSchema.optional(),
  format: StringSchema.optional(),
  resourceType: StringSchema.optional(),
});

/**
 * Cloudinary image schema
 */
export const CloudinaryImageSchema = ImageSchema.extend({
  provider: z.literal('cloudinary'),
  cloudName: StringSchema,
  transformation: ImageTransformationSchema.optional(),
});

/**
 * Type exports
 */
export type ImageTransformation = z.infer<typeof ImageTransformationSchema>;
export type Image = z.infer<typeof ImageSchema>;
export type CloudinaryImage = z.infer<typeof CloudinaryImageSchema>;