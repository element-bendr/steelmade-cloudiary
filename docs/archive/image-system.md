# Image System Documentation

## Cloudinary Integration

The SteelMade website uses Cloudinary for optimized image delivery. This document outlines the implementation details and usage patterns.

## Directory Structure

```
modules/
└── image/
    ├── components/
    │   ├── CloudinaryImage.tsx     # Reusable Cloudinary image component
    │   └── index.ts                # Component exports
    ├── utils/
    │   ├── cloudinary.ts           # Cloudinary utility functions
    │   └── index.ts                # Utility exports
    └── index.ts                    # Module exports
```

## Cloudinary Configuration

The system uses the following Cloudinary configuration:

- **Cloud Name:** dqde19mfs
- **Version:** v1748785779
- **Base URL:** `https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779`

## URL Structure

### Standard Product Images

Standard product images follow this pattern:
```
https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/[category]/[series]/[product]/[image-name].jpg
```

### Director Series Chair Images

Director series chair images follow a specific pattern for variant images:
```
https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/[chair-name]/[variant-code].jpg
```

Where:
- `[chair-name]` is the first part of the product slug (e.g., "ashley" from "ashley-director-chair")
- `[variant-code]` follows specific naming conventions:
  - High Back (HB) variants: `ic-361-hb.jpg` (Ashley), `ic-340-hb.jpg` (Opera), `ic-01-hb.jpg` (Tycoon)
  - Medium Back (MB) variants: `ic-362-mb.jpg` (Ashley), `ic-341-mb.jpg` (Opera), `ic-02-mb.jpg` (Tycoon)

## Utility Functions

### `getProductImageUrl(path: string): string`

Generates a standard Cloudinary URL for a product image.

```typescript
// Example usage
const imageUrl = getProductImageUrl('steelmade/chairs/ergonomic-series/comfort-pro/main');
// Returns: https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/ergonomic-series/comfort-pro/main.jpg
```

### `getDirectorChairVariantImageUrl(chairName: string, variantId: string): string`

Generates a Cloudinary URL for a director series chair variant.

```typescript
// Example usage
const imageUrl = getDirectorChairVariantImageUrl('ashley', 'hb');
// Returns: https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg
```

### `getChairNameFromSlug(productSlug: string): string`

Extracts the chair name from a product slug.

```typescript
// Example usage
const chairName = getChairNameFromSlug('ashley-director-chair');
// Returns: ashley
```

### `getCloudinaryImageWithTransform(path: string, options: object): string`

Generates a Cloudinary URL with specified transformations.

```typescript
// Example usage
const imageUrl = getCloudinaryImageWithTransform('steelmade/chairs/director-series/ashley/main', {
  width: 500,
  height: 300,
  crop: 'fill',
  quality: 80
});
// Returns: https://res.cloudinary.com/dqde19mfs/image/upload/w_500,h_300,c_fill,q_80/steelmade/chairs/director-series/ashley/main
```

## CloudinaryImage Component

A reusable component for displaying Cloudinary images with proper optimization.

### Props

| Prop | Type | Description |
|------|------|-------------|
| publicId | string | The Cloudinary public ID or path |
| transformations | object | Optional transformations (width, height, crop, quality) |
| alt | string | Alternative text for the image |
| ...rest | ImageProps | All other Next.js Image component props |

### Example Usage

```tsx
import { CloudinaryImage } from '@/modules/image/components';

// Basic usage
<CloudinaryImage 
  publicId="steelmade/chairs/director-series/ashley/ic-361-hb" 
  alt="Ashley Director Chair - High Back" 
  fill 
  className="object-contain"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// With transformations
<CloudinaryImage 
  publicId="steelmade/chairs/director-series/ashley/ic-361-hb" 
  transformations={{ width: 500, height: 300, crop: 'fill', quality: 80 }}
  alt="Ashley Director Chair - High Back" 
  width={500}
  height={300}
/>
```

## Best Practices

1. **Always use the CloudinaryImage component** for consistent rendering and optimization.
2. **Provide proper `sizes` attribute** when using `fill` to optimize responsive loading.
3. **Use appropriate `object-fit` styles** (`object-contain` for product images, `object-cover` for thumbnails).
4. **Add fallback handling** for cases where images might be missing.
5. **Use the utility functions** instead of hardcoding URLs for maintainability.

## Chair Variant Image Mapping

| Chair | Variant | Image Code | Full Path |
|-------|---------|------------|-----------|
| Ashley | High Back | ic-361-hb | `/steelmade/chairs/director-series/ashley/ic-361-hb.jpg` |
| Ashley | Medium Back | ic-362-mb | `/steelmade/chairs/director-series/ashley/ic-362-mb.jpg` |
| Opera | High Back | ic-340-hb | `/steelmade/chairs/director-series/opera/ic-340-hb.jpg` |
| Opera | Medium Back | ic-341-mb | `/steelmade/chairs/director-series/opera/ic-341-mb.jpg` |
| Tycoon | High Back | ic-01-hb | `/steelmade/chairs/director-series/tycoon/ic-01-hb.jpg` |
| Tycoon | Medium Back | ic-02-mb | `/steelmade/chairs/director-series/tycoon/ic-02-mb.jpg` |

## Future Improvements

1. **Add image optimization presets** for common use cases (thumbnails, hero images, etc.)
2. **Implement automatic format selection** based on browser support
3. **Add responsive art direction** for different device types
4. **Create image placeholders** for improved loading experience
5. **Implement error tracking** for failed image loads