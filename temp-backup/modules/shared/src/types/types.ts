import type { z } from 'zod';

export type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never;

export type ToMutable<T> = T extends ReadonlyArray<infer U>
  ? Array<ToMutable<U>>
  : T extends object
  ? { -readonly [K in keyof T]: ToMutable<T[K]> }
  : T;

export type ValidationError = {
  code: string;
  message: string;
  field?: string;
};

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  error?: ValidationError;
};

export type Schema<T> = z.ZodType<T>;