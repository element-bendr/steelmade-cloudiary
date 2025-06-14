export * from './array';
export * from './validation';
export * from './error';

import type { z } from 'zod';

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] 
    ? U[] 
    : T[P] extends object 
      ? Mutable<T[P]> 
      : T[P]
};

export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
};

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: ValidationError;
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public code: string = 'VALIDATION_ERROR',
    public field?: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export type Schema<T> = z.ZodType<T>;