# Image Module Usage Patterns

## Responsive Images

```typescript
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { ImageOptimizationService } from '@modules/image';

const createResponsiveImage = (publicId: string) => pipe(
  { publicId },
  ImageOptimizationService.createResponsiveSet,
  E.map(images => images.map(img => `<source srcset="${img}" ...>`))
);
```

## Performance Optimization

1. **Eager Loading**
   - Pre-generate transformations
   - Cache results
   - Monitor metrics

2. **Lazy Loading**
   - Defer non-critical images
   - Use placeholder thumbnails
   - Load on viewport entry

## Error Handling

1. **Graceful Degradation**
   - Fallback images
   - Default dimensions
   - Error boundaries

2. **Runtime Validation**
   - Input validation
   - Format checking
   - Size constraints