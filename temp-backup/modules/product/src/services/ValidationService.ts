import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { ValidationService as BaseValidationService } from '@modules/shared';
import { ProductSchema } from '../validation/schemas';
import type { Product } from '../types';
import type { DeepMutable, ValidationError } from '@modules/shared';

/**
 * Functional validation service for product data
 */
export const ValidationService = {
  /**
   * Validates an array of products
   */  validateProducts: (products: unknown[]): E.Either<ValidationError, Product[]> =>
    pipe(
      BaseValidationService.validateArray(ProductSchema)(products),
      E.map((validProducts: readonly Product[]) => validProducts as DeepMutable<typeof validProducts>),
      E.mapLeft(err => ({ code: 'VALIDATION_ERROR', message: err.message }))
    ),

  /**
   * Validates product data at module boundaries
   */
  validateProduct: (product: unknown): E.Either<Error, Product> =>
    pipe(
      BaseValidationService.validate(ProductSchema)(product),
      E.mapLeft(err => new Error(err.message))
    )
};