import { describe, it, expect } from 'vitest';
import { CartService } from '@modules/cart';
import { ProductSchema } from '@modules/shared';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

describe.skip('[legacy][ecommerce][integration] cart-product integration', () => {
  const testProduct = {
    id: 'test-id',
    slug: 'test-product',
    name: 'Test Product',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('[legacy] validates product before adding item to cart', () => {
    const result = pipe(
      CartService.create(),
      E.chain(cart => CartService.addItem(cart, {
        productId: testProduct.id,
        quantity: 1,
        addedAt: new Date()
      }))
    );

    expect(E.isRight(result)).toBe(true);
  });

  it('[legacy] validates invalid product payload handling', () => {
    const result = pipe(
      testProduct,
      ProductSchema.safeParse,
      E.fromPredicate(
        (result): result is { success: true; data: unknown } => result.success,
        () => new Error('Invalid product data')
      )
    );

    expect(E.isRight(result)).toBe(true);
  });
});