import { z } from 'zod';

/**
 * Core type definitions for the application
 * This module has no external dependencies and serves as the foundation
 * for type safety throughout the application.
 */

// Basic primitive type validations
export const StringSchema = z.string();
export const NumberSchema = z.number();
export const BooleanSchema = z.boolean();
export const DateSchema = z.date();
export const NullableStringSchema = z.string().nullable();
export const OptionalStringSchema = z.string().optional();

// Common string formats
export const EmailSchema = z.string().email();
export const UrlSchema = z.string().url();
export const UuidSchema = z.string().uuid();
export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

// ID validation
export const IdSchema = z.union([z.string(), z.number()]);

// Generic validation helpers
export const createArraySchema = <T extends z.ZodTypeAny>(schema: T) => z.array(schema);
export const createRecordSchema = <T extends z.ZodTypeAny>(schema: T) => z.record(z.string(), schema);
export const createOptionalSchema = <T extends z.ZodTypeAny>(schema: T) => schema.optional();
export const createNullableSchema = <T extends z.ZodTypeAny>(schema: T) => schema.nullable();

// Type exports
export type CoreString = z.infer<typeof StringSchema>;
export type CoreNumber = z.infer<typeof NumberSchema>;
export type CoreBoolean = z.infer<typeof BooleanSchema>;
export type CoreDate = z.infer<typeof DateSchema>;
export type CoreEmail = z.infer<typeof EmailSchema>;
export type CoreUrl = z.infer<typeof UrlSchema>;
export type CoreUuid = z.infer<typeof UuidSchema>;
export type CoreSlug = z.infer<typeof SlugSchema>;
export type CoreId = z.infer<typeof IdSchema>;

/**
 * Validation result type
 */
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
};

/**
 * Generic validator function
 */
export function validate<T>(schema: z.ZodType<T>, data: unknown): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error
      };
    }
    throw error;
  }
}

/**
 * Safe validator that returns null instead of throwing
 */
export function safeParse<T>(schema: z.ZodType<T>, data: unknown): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * Format validation errors into a human-readable string
 */
export function formatValidationErrors(error: z.ZodError): string {
  return error.errors
    .map((err) => {
      const path = err.path.join('.');
      return `${path ? path + ': ' : ''}${err.message}`;
    })
    .join('\n');
}