import { z } from 'zod';

// Common validation schemas
export const IDSchema = z.string().min(1);
export const SlugSchema = z.string().min(1).regex(/^[a-z0-9-]+$/);
export const EmailSchema = z.string().email();
export const PhoneSchema = z.string().regex(/^\+?[\d\s-]+$/);
export const URLSchema = z.string().url();
export const DateSchema = z.date();

// Shared product schemas
export const ProductCommonSchema = z.object({
  id: IDSchema,
  slug: SlugSchema,
  name: z.string().min(1),
  description: z.string(),
  createdAt: DateSchema,
  updatedAt: DateSchema
});

// Shared UI schemas
export const ComponentBaseSchema = z.object({
  className: z.string().optional(),
  disabled: z.boolean().optional(),
  testId: z.string().optional()
});

export const ValidationErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional()
});

// Helper functions
export const createArraySchema = <T extends z.ZodType>(schema: T) => 
  z.array(schema);

export const createOptionalSchema = <T extends z.ZodType>(schema: T) =>
  schema.optional();