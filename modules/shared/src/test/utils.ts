import { expect } from 'vitest';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import { ValidationError } from '../validation/types';

export const expectRight = <T>(result: E.Either<any, T>): T => {
  expect(E.isRight(result)).toBe(true);
  return (result as E.Right<T>).right;
};

export const expectLeft = <E>(result: E.Either<E, any>): E => {
  expect(E.isLeft(result)).toBe(true);
  return (result as E.Left<E>).left;
};

export const expectValidationError = (result: E.Either<ValidationError, any>, field?: string): void => {
  const error = expectLeft(result);
  expect(error.code).toBe('VALIDATION_ERROR');
  if (field) {
    expect(error.field).toBe(field);
  }
};

export const mockProduct = {
  id: 'test-id',
  slug: 'test-product',
  name: 'Test Product',
  description: 'Test description',
  createdAt: new Date(),
  updatedAt: new Date()
};