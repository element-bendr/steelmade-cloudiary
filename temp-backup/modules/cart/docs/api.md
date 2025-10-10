# Cart Module API

## Services

### CartService
Pure functions for cart operations:
```typescript
CartService.create(): Either<Error, Cart>
CartService.addItem(cart: Cart, item: CartItem): Either<Error, Cart>
CartService.removeItem(cart: Cart, productId: string): Either<Error, Cart>
```

### CartStorageService
Local storage persistence:
```typescript
CartStorageService.save(cart: Cart): Either<Error, Cart>
CartStorageService.load(): Either<Error, Cart | null>
CartStorageService.clear(): Either<Error, void>
```

## Types

### Cart
```typescript
interface Cart {
  id: string;
  items: CartItem[];
  lastUpdated: Date;
}
```

### CartItem
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  variantId?: string;
  addedAt: Date;
}
```

## Usage Example
```typescript
import { CartService, CartStorageService } from '@modules/cart';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';

const result = pipe(
  CartService.create(),
  E.chain(cart => CartService.addItem(cart, newItem)),
  E.chain(CartStorageService.save)
);