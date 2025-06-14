import type { Either } from 'fp-ts/Either';
import type { ValidationError } from './types';

export type Transform<A, B> = (input: A) => B;

export type ValidatedTransform<A, B> = (input: unknown) => Either<ValidationError, B>;

export type ArrayTransform<A, B> = (input: readonly A[]) => B[];