import { z } from 'zod';

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: ValidationError;
};

export type ValidationError = {
  code: string;
  message: string;
  field?: string;
};

export type Validator<T> = (data: unknown) => ValidationResult<T>;

export type Schema<T> = z.ZodType<T>;