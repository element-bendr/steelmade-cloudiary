import { describe, test, expect, beforeEach } from 'vitest';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { ProductDataService, ValidationService } from '../services';
import type { Product } from '../types';

describe('Product Module Integration', () => {
  beforeEach(() => {
    ProductDataService.clearCache();
  });

  test('Product lifecycle flow', async () => {
    const result = await pipe(
      { id: 'test-1', title: 'Test Product', description: 'Test' } as Product,
      ValidationService.validateProduct,
      TE.fromEither,
      TE.chain(product => ProductDataService.getProductById(product.id))
    )();

    expect(result).toBeRight();
  });
});