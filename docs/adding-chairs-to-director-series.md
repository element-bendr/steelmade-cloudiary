# Adding New Chairs to the Director Series

This guide explains how to add new chairs to the Director Series collection.

## Step 1: Create the Chair Data File

Create a new file in `lib/data/products/chairs/director-series/` with the name of your chair, for example `ashley-director-chair.ts`.

Use the following template:

```typescript
// Export the chair data
export const chairnamehere = {
  id: 'chair-id-here',
  name: 'Chair Name Here',
  description: 'Detailed description of the chair.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: 'https://res.cloudinary.com/your-cloudinary-account/image/upload/path/to/main/image.jpg',
  price: 999.99,
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5'
  ],
  specifications: {
    'Material': 'Materials used',
    'Weight Capacity': 'Weight capacity info',
    'Dimensions': 'Dimensions info',
    'Warranty': 'Warranty info'
  },
  variants: [
    {
      variantId: 'variant-id-1',
      variantName: 'Variant Name 1',
      description: 'Description of this variant',
      imageUrl: 'https://res.cloudinary.com/your-cloudinary-account/image/upload/path/to/variant1/image.jpg'
    },
    {
      variantId: 'variant-id-2',
      variantName: 'Variant Name 2',
      description: 'Description of this variant',
      imageUrl: 'https://res.cloudinary.com/your-cloudinary-account/image/upload/path/to/variant2/image.jpg'
    }
  ]
};
```

## Step 2: Update the Director Series File

Open `lib/data/products/chairs/director-series.ts` and:

1. Import your new chair:
```typescript
import { chairnamehere } from './director-series/your-chair-file';
```

2. Add it to the products object:
```typescript
products: {
  // ...existing products,
  'your-chair-id': chairnamehere
}
```

3. Re-export it in the exports section:
```typescript
export { /* existing exports */, chairnamehere };
```

## Step 3: Update the Debug Links (Optional)

If you want to add a direct debug link, update `app/debug/director-chairs/page.tsx` to include your new chair.

## Step 4: Verify Your Addition

1. Run `npm run dev` to start the development server
2. Navigate to `/chairs/director-series` to see all chairs including your new one
3. Navigate to `/chairs/director-series/your-chair-id` to view your specific chair
4. Check the debug page at `/debug/director-chairs` to ensure all links work

## Cloudinary Image Naming Convention

When adding images to Cloudinary, follow this naming convention:

- Base path: `steelmade/chairs/director-series/chair-name/`
- High back variant: `ic-XXX-hb.jpg` (where XXX is a unique number)
- Medium back variant: `ic-XXX-mb.jpg`

## Example: Adding the Ashley Director Chair

```typescript
// ashley-director-chair.ts
export const ashleydirectorchair = {
  id: 'ashley-director-chair',
  name: 'Ashley Director Chair',
  description: 'Elegant and functional director chair with premium materials and modern design.',
  category: 'chairs',
  seriesId: 'director-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg',
  price: 899.99,
  features: [
    'Premium leather and fabric combination',
    'Ergonomic back support',
    'Lightweight aluminum frame',
    'Adjustable height',
    'Foldable design for easy storage'
  ],
  specifications: {
    'Material': 'Leather, fabric, aluminum',
    'Weight Capacity': '275 lbs',
    'Dimensions': '25"W x 22"D x 40"H',
    'Warranty': '5 years'
  },
  variants: [
    {
      variantId: 'ic-361-hb',
      variantName: 'High Back',
      description: 'Extended high back design for superior comfort',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-361-hb.jpg'
    },
    {
      variantId: 'ic-362-mb',
      variantName: 'Medium Back',
      description: 'Versatile medium back design for everyday use',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1748785779/steelmade/chairs/director-series/ashley/ic-362-mb.jpg'
    }
  ]
};
```

Then update `director-series.ts` to include the Ashley chair.