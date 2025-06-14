import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import type { ValidationError } from '../types/types';

export const traverseValidation = <A, B>(
  items: readonly A[],
  validate: (item: A) => E.Either<ValidationError, B>
): E.Either<ValidationError, B[]> =>  pipe(
    items,
    E.traverseArray(validate),
    E.map((validItems: readonly B[]) => Array.from(validItems))
  );

export const traverseValidationAsync = <A, B>(
  items: readonly A[],
  validate: (item: A) => TE.TaskEither<ValidationError, B>
): TE.TaskEither<ValidationError, B[]> =>  pipe(
    items,
    TE.traverseArray(validate),
    TE.map((validItems: readonly B[]) => Array.from(validItems))
  );