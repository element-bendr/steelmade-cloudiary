# BigBoss Gold Chair Integration Guide

## Overview
This document provides instructions for integrating the BigBoss Gold Director Chair into the director-series page properly.

## Issues Identified
The BigBoss Gold chair is not appearing on the director-series page due to the following issues:

1. The chair data is correctly defined in `lib/data/products/chairs/director-series/bigbossgold-director-chair.ts`
2. However, the chair is not being properly loaded and displayed on the director-series page

## Integration Steps

### 1. Fix the Product Type
The director-series page expects products to match the `Product` type, which requires the following properties:
- `categorySlug`
- `seriesSlug`
- `images` array

Update the hardcoded products in the `loadProducts` function to include these properties:

```typescript
{
  id: 'bigbossgold-director-chair',
  name: 'BigBoss Gold Director Chair',
  description: 'The BigBoss Gold Director Chair combines luxury with ergonomic design for executive comfort and style.',
  slug: 'bigbossgold-director-chair',
  price: '₦499.99',
  category: 'chairs',
  categorySlug: 'chairs',
  seriesId: 'director-series',
  seriesSlug: 'director-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
  images: [
    { 
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
      alt: 'BigBoss Gold Director Chair - High Back'
    },
    {
      url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459908/steelmade/chairs/director-series/bigbossgold/ic-256-mb.jpg',
      alt: 'BigBoss Gold Director Chair - Medium Back'
    }
  ],
  variants: [
    { 
      id: 'high-back', 
      variantId: 'high-back',
      variantName: 'High Back',
      images: [{ 
        url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459939/steelmade/chairs/director-series/bigbossgold/ic-255-hb.jpg',
        alt: 'BigBoss Gold Director Chair - High Back'
      }]
    },
    { 
      id: 'medium-back', 
      variantId: 'medium-back',
      variantName: 'Medium Back',
      images: [{ 
        url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1749459908/steelmade/chairs/director-series/bigbossgold/ic-256-mb.jpg',
        alt: 'BigBoss Gold Director Chair - Medium Back'
      }]
    }
  ]
}
```

### 2. Update the Cloudinary Path
The `getChairNameFromSlug` function in the director-series page extracts the chair name for Cloudinary paths. Ensure the function correctly handles "bigbossgold-director-chair" to extract "bigbossgold".

### 3. Remove the Fallback Products Array
Once the products are loading correctly from the hardcoded list in the `loadProducts` function, the fallbackProducts array can be removed to avoid duplication.

## Testing
After making these changes:
1. Run the development server: `npm run dev`
2. Navigate to http://localhost:3000/chairs/director-series 
3. Verify that the BigBoss Gold chair appears in the product grid
4. Click on the chair to ensure its detail page loads correctly

## Related Files
- `app/chairs/director-series/page.tsx` - Main page for the director series
- `lib/data/products/chairs/director-series/bigbossgold-director-chair.ts` - Chair data
- `lib/data/products/chairs/director-series/index.ts` - Directory exports
- `app/chairs/director-series/bigbossgold-director-chair/page.tsx` - Detail page