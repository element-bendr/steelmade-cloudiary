/**
 * Core UI module types
 */

import { z } from 'zod';
import { StringSchema, NumberSchema, OptionalStringSchema, IdSchema } from '@/modules/core/types';

/**
 * UI Component props schema
 */
export const ComponentPropsSchema = z.object({
  className: OptionalStringSchema,
  id: OptionalStringSchema,
  testId: OptionalStringSchema,
});

/**
 * Card component props schema
 */
export const CardPropsSchema = ComponentPropsSchema.extend({
  title: OptionalStringSchema,
  description: OptionalStringSchema,
  imageSrc: OptionalStringSchema,
  imageAlt: OptionalStringSchema,
  href: OptionalStringSchema,
  variant: z.enum(['default', 'featured', 'compact']).optional(),
});

/**
 * Button component props schema
 */
export const ButtonPropsSchema = ComponentPropsSchema.extend({
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost', 'link']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
  disabled: z.boolean().optional(),
  isLoading: z.boolean().optional(),
});

/**
 * UI Types
 */

// Export core UI types
export * from './card';

// Export enhanced product types
export * from './enhanced-product';

/**
 * Type exports
 */
export type ComponentProps = z.infer<typeof ComponentPropsSchema>;
export type CardProps = z.infer<typeof CardPropsSchema>;
export type ButtonProps = z.infer<typeof ButtonPropsSchema>;