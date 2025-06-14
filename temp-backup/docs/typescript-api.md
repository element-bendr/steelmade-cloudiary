# TypeScript API Documentation

## Shared Module

### ValidationService
Functional validation utilities:
```typescript
ValidationService.validateWithSchema<T>(schema: z.ZodSchema<T>)
  => (data: unknown) => Either<Error, T>

ValidationService.validateArray<T>(schema: z.ZodSchema<T>)
  => (data: unknown[]) => Either<Error, T[]>

ValidationService.validateNonEmptyString
  => (value: unknown) => Either<Error, string>
```

## Product Module

### Types
```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isDefault?: boolean;
}
```

### Services
```typescript
ProductDataService.getProductById
  => (id: string) => TaskEither<Error, Product>

ImageTransformationService.optimizeProductImage
  => (image: ProductImage, options?: ImageOptions) => Either<Error, ProductImage>
```

## UI Module

### Components
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}