import { describe, it, expect } from 'vitest';
import { CartService } from '../services/CartService';
import { expectRight, expectValidationError } from '@modules/shared/test/utils';
import { pipe } from 'fp-ts/function';

describe('CartService', () => {
  it('should create an empty cart', () => {
    const cart = expectRight(CartService.create());
    expect(cart.items).toHaveLength(0);
    expect(cart.id).toBeDefined();
  });

  it('should add item to cart', () => {
    const result = pipe(
      CartService.create(),
      E.chain(cart => CartService.addItem(cart, {
        productId: 'test-id',
        quantity: 1,
        addedAt: new Date()
      }))
    );

    const cart = expectRight(result);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].productId).toBe('test-id');
  });

  it('should remove item from cart', () => {
    const result = pipe(
      CartService.create(),
      E.chain(cart => CartService.addItem(cart, {
        productId: 'test-id',
        quantity: 1,
        addedAt: new Date()
      })),
      E.chain(cart => CartService.removeItem(cart, 'test-id'))
    );

    const cart = expectRight(result);
    expect(cart.items).toHaveLength(0);
  });
});