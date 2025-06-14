# Product Module API Documentation

## Core Services

### ProductDataService

Functional service for managing product data with built-in caching.

```typescript
const product = await pipe(
  ProductDataService.getProductById('product-id'),
  TE.fold(
    error => handleError(error),
    product => handleSuccess(product)
  )
)();
```

### ValidationService

Handles data validation at module boundaries using Zod and fp-ts.

```typescript
const validatedProduct = pipe(
  data,
  ValidationService.validateProduct,
  E.fold(
    error => handleError(error),
    product => handleSuccess(product)
  )
);
```

### CloudinaryImageService

Manages product image transformations and optimizations.

```typescript
const optimizedImage = pipe(
  productImage,
  image => CloudinaryImageService.optimizeProductImage(image, { width: 800 })
);
```

## Types

### Product
```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}
```

### ProductImage
```typescript
interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isDefault?: boolean;
}
```

### ProductVariant
```typescript
interface ProductVariant {
  variantId: string;
  variantName: string;
  isDefault?: boolean;
}
```

## Error Handling

All operations return `Either` or `TaskEither` for proper error handling:

```typescript
type Result<T> = E.Either<Error, T>;
type AsyncResult<T> = TE.TaskEither<Error, T>;
```