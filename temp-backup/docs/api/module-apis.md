# Module APIs Documentation

## Shared Module API

### ValidationService
```typescript
// Validate data against schema
ValidationService.validate<T>(schema: ZodSchema<T>): (data: unknown) => Either<ValidationError, T>

// Validate array of items
ValidationService.validateArray<T>(schema: ZodSchema<T>): (data: unknown[]) => Either<ValidationError, T[]>
```

## Cart Module API

### CartService
```typescript
// Create new cart
CartService.create(): Either<Error, Cart>

// Add item to cart
CartService.addItem(cart: Cart, item: CartItem): Either<Error, Cart>

// Remove item from cart
CartService.removeItem(cart: Cart, productId: string): Either<Error, Cart>
```

## Product Module API

### ProductService
```typescript
// Get product by ID
ProductService.getById(id: string): TaskEither<Error, Product>

// Get product variants
ProductService.getVariants(productId: string): TaskEither<Error, ProductVariant[]>
```

## UI Module API

### Components
```typescript
// Button component
<Button
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
/>

// Card component
<Card
  title?: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
/>