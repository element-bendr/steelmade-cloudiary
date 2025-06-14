import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import type { ValidationError } from '../types/types';
import type { Transform, ValidatedTransform } from '../types/transform';

export const createSafeTransform = <A, B>(
  transform: Transform<A, B>
): ValidatedTransform<A, B> => (input: unknown) =>
  pipe(
    E.tryCatch(
      () => transform(input as A),
      (error) => ({
        code: 'TRANSFORM_ERROR',
        message: error instanceof Error ? error.message : 'Transform failed',
      } as ValidationError)
    )
  );