# Image Module API

## Core Services

### ImageTransformationService

Functional service for transforming images through Cloudinary:

```typescript
import { ImageTransformationService } from '@modules/image';

// Initialize with config
ImageTransformationService.init({ cloudName: 'your-cloud-name' });

// Transform images
const result = pipe(
  image,
  ImageTransformationService.applyTransformation({ width: 800 }),
  E.chain(ImageTransformationService.buildUrl)
);
```

### ImageOptimizationService

Pre-configured optimizations for common use cases:

```typescript
import { ImageOptimizationService } from '@modules/image';

// Create responsive image set
const images = pipe(
  originalImage,
  ImageOptimizationService.createResponsiveSet,
  E.map(urls => urls.join(', '))
);
```

## Type System

### CloudinaryImage
Represents an image with its transformation metadata:

```typescript
interface CloudinaryImage {
  publicId: string;
  format?: string;
  version?: number;
  transformation?: ImageTransformation;
}
```

### ImageTransformation
Configuration for image processing:

```typescript
interface ImageTransformation {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpeg' | 'png';
  crop?: 'fill' | 'fit' | 'crop';
}
```

## Error Handling

All operations return `Either` for proper error handling:

```typescript
type Result<T> = E.Either<Error, T>;
```

## Best Practices

1. Always initialize ImageTransformationService before use
2. Use pre-configured optimizations when possible
3. Handle errors with fp-ts operators
4. Use responsive sets for optimal performance
5. Cache transformed URLs when appropriate