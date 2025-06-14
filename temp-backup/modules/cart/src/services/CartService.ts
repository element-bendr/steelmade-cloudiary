import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { Cart, CartItem, CartSchema } from '../types';

export const CartService = {
  create: (): E.Either<Error, Cart> => 
    pipe(
      {
        id: crypto.randomUUID(),
        items: [],
        lastUpdated: new Date()
      },
      cart => CartSchema.safeParse(cart),
      result => result.success
        ? E.right(result.data)
        : E.left(new Error('Failed to create cart'))
    ),

  addItem: (cart: Cart, item: CartItem): E.Either<Error, Cart> =>
    pipe(
      {
        ...cart,
        items: [...cart.items, item],
        lastUpdated: new Date()
      },
      updatedCart => CartSchema.safeParse(updatedCart),
      result => result.success
        ? E.right(result.data)
        : E.left(new Error('Failed to add item to cart'))
    ),

  removeItem: (cart: Cart, productId: string): E.Either<Error, Cart> =>
    pipe(
      {
        ...cart,
        items: cart.items.filter(item => item.productId !== productId),
        lastUpdated: new Date()
      },
      updatedCart => CartSchema.safeParse(updatedCart),
      result => result.success
        ? E.right(result.data)
        : E.left(new Error('Failed to remove item from cart'))
    )
};