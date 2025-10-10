import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { Cart, CartSchema } from '../types';

const CART_STORAGE_KEY = 'cart_data';

export const CartStorageService = {
  save: (cart: Cart): E.Either<Error, Cart> =>
    pipe(
      cart,
      CartSchema.safeParse,
      result => result.success
        ? E.right(cart)
        : E.left(new Error('Invalid cart data')),
      E.map(validCart => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
        return validCart;
      })
    ),

  load: (): E.Either<Error, Cart | null> =>
    pipe(
      localStorage.getItem(CART_STORAGE_KEY),
      E.fromNullable(new Error('No cart data found')),
      E.chain(data => 
        pipe(
          JSON.parse(data),
          CartSchema.safeParse,
          result => result.success
            ? E.right(result.data)
            : E.left(new Error('Invalid stored cart data'))
        )
      )
    ),

  clear: (): E.Either<Error, void> =>
    pipe(
      E.right(localStorage.removeItem(CART_STORAGE_KEY))
    )
};