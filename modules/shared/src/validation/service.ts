import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { z } from 'zod';
import type { ValidationError } from '../types/types';

const createValidationError = (error: z.ZodError): ValidationError => ({
  code: 'VALIDATION_ERROR',
  message: error.errors[0]?.message || 'Validation failed',
  field: error.errors[0]?.path.join('.')
});

export const ValidationService = {
  validate: <T>(schema: z.ZodType<T>) => (data: unknown): E.Either<ValidationError, T> =>
    pipe(
      schema.safeParse(data),
      E.fromPredicate(
        (result): result is z.SafeParseSuccess<T> => result.success,
        (result) => createValidationError((result as z.SafeParseError<T>).error)
      ),
      E.map((result) => result.data)
    ),

  validateArray: <T>(schema: z.ZodType<T>) => (data: unknown[]): E.Either<ValidationError, readonly T[]> =>
    pipe(
      z.array(schema).safeParse(data),
      E.fromPredicate(
        (result): result is z.SafeParseSuccess<T[]> => result.success,
        (result) => createValidationError((result as z.SafeParseError<T[]>).error)
      ),
      E.map((result) => result.data)
    ),

  validateAsync: <T>(schema: z.ZodType<T>) => (data: unknown): TE.TaskEither<ValidationError, T> =>
    pipe(
      TE.tryCatch(
        () => schema.parseAsync(data),
        (error) => createValidationError(error as z.ZodError)
      )
    )
};