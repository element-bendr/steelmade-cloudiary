import { z } from 'zod';

export const ImageConfigSchema = z.object({
  cloudName: z.string(),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional()
});

export const ImageOptionsSchema = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  quality: z.number().min(1).max(100).optional(),
  format: z.enum(['webp', 'jpeg', 'png']).optional(),
  blur: z.number().min(0).max(100).optional()
});

export const ImageTransformationSchema = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  quality: z.number().min(1).max(100).optional(),
  format: z.enum(['auto', 'webp', 'jpeg', 'png']).optional(),
  crop: z.enum(['fill', 'fit', 'crop']).optional()
});

export const CloudinaryImageSchema = z.object({
  publicId: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  resourceType: z.string(),
  transformation: ImageTransformationSchema.optional()
});

export type ImageConfig = z.infer<typeof ImageConfigSchema>;
export type ImageOptions = z.infer<typeof ImageOptionsSchema>;
export type ImageTransformation = z.infer<typeof ImageTransformationSchema>;
export type CloudinaryImage = z.infer<typeof CloudinaryImageSchema>;