import { describe, test, expect, beforeEach } from 'vitest';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { ProductDataService, ValidationService } from '../services';
import type { Product } from '../types';

describe('[integration][product] product module lifecycle', () => {
  beforeEach(() => {
    ProductDataService.clearCache();
  });

  test('[lifecycle] validates and resolves product through data service', async () => {
    const result = await pipe(
      { id: 'test-1', title: 'Test Product', description: 'Test' } as Product,
      ValidationService.validateProduct,
      TE.fromEither,
      TE.chain(product => ProductDataService.getProductById(product.id))
    )();

    expect(result).toBeRight();
  });
});