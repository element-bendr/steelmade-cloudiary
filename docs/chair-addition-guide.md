# Chair Addition Guide

This guide explains how to add a new chair to the Director Series collection following the modular architecture pattern.

## Overview

The SteelMade website uses a modular data architecture for chair products. Each chair has its own TypeScript file with standardized data structure, and all chairs are automatically loaded and displayed in the UI.

## Step 1: Create the Chair Data File

1. Create a new TypeScript file in `lib/data/products/chairs/director-series/` with the name of your chair (kebab-case)
   Example: `executive-pro-chair.ts`

2. Copy the template from `lib/templates/chair-template.ts` and fill in all required fields

3. Make sure to use the correct Cloudinary URL format:
   ```
   https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/{chair-name}/{variant-code}.jpg
   ```

4. For variants, follow the naming convention for variant IDs:
   - High Back: `ic-XXX-hb` (where XXX is a unique number)
   - Medium Back: `ic-XXX-mb`
   - Other variants: Use a consistent naming pattern

5. Example of a completed chair file:
   ```typescript
   import { ExtendedProductData } from "@/lib/data/product-types";

   export const executiveProChair: ExtendedProductData = {
     id: 'executive-pro-chair',
     name: 'Executive Pro Chair',
     description: 'Premium executive chair with ergonomic design and luxury materials.',
     price: '1299.99',
     category: 'chairs',
     seriesId: 'director-series',
     inStock: true,
     imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/executive-pro/ic-501-hb.jpg',
     images: [
       {
         url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/executive-pro/ic-501-hb.jpg',
         alt: 'Executive Pro Chair - High Back',
         width: 800,
         height: 600
       },
       {
         url: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/executive-pro/ic-502-mb.jpg',
         alt: 'Executive Pro Chair - Medium Back',
         width: 800,
         height: 600
       }
     ],
     features: [
       'Premium leather upholstery',
       'Adjustable lumbar support',
       'Memory foam padding',
       'Polished aluminum base',
       'Synchronized tilt mechanism'
     ],
     specifications: {
       'Material': 'Genuine leather, aluminum',
       'Weight Capacity': '350 lbs',
       'Dimensions': '30"W x 32"D x 48"H',
       'Warranty': '10 years'
     },
     variants: [
       {
         variantId: 'ic-501-hb',
         variantName: 'High Back',
         name: 'Executive Pro High-Back Chair IC-501-HB',
         description: 'Premium executive chair with high back for maximum support',
         imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/executive-pro/ic-501-hb.jpg',
         specifications: {
           'Back Height': 'High Back',
           'Model': 'IC-501-HB',
           'Weight': '18 lbs',
           'Dimensions': '30"W x 32"D x 48"H'
         }
       },
       {
         variantId: 'ic-502-mb',
         variantName: 'Medium Back',
         name: 'Executive Pro Medium-Back Chair IC-502-MB',
         description: 'Premium executive chair with medium back for versatile use',
         imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1/steelmade/chairs/director-series/executive-pro/ic-502-mb.jpg',
         specifications: {
           'Back Height': 'Medium Back',
           'Model': 'IC-502-MB',
           'Weight': '16 lbs',
           'Dimensions': '30"W x 32"D x 42"H'
         }
       }
     ]
   };
   ```

## Step 2: Update the Director Series Index

After creating your chair file, update `lib/data/products/chairs/director-series/index.ts`:

1. Import your new chair:
   ```typescript
   import { executiveProChair } from './executive-pro-chair';
   ```

2. Add it to the exports:
   ```typescript
   export { 
     // existing chairs
     executiveProChair
   };
   ```

3. Add it to the directorSeriesProducts object:
   ```typescript
   export const directorSeriesProducts = {
     // existing products
     "executive-pro-chair": executiveProChair
   };
   ```

4. Add it to the directorSeriesChairs array:
   ```typescript
   export const directorSeriesChairs = [
     // existing chairs
     executiveProChair
   ];
   ```

## Step 3: Create Chair Images

1. Upload your chair images to Cloudinary following the path structure:
   ```
   steelmade/chairs/director-series/{chair-name}/{variant-code}.jpg
   ```
   
2. Make sure to upload:
   - Main image for each variant
   - Any additional images for galleries
   - Ensure proper naming according to variant codes

3. Use the Cloudinary dashboard to verify uploads and get the version number if needed

## Step 4: Create a Detail Page (Optional)

If you want a dedicated page for the chair, create:
`app/chairs/director-series/{chair-id}/page.tsx`

Copy the structure from an existing chair detail page and update it for your new chair.

## Step 5: Testing

1. Build and run the application
2. Verify the chair appears on the Director Series page
3. Check that images load correctly
4. Ensure variant selection works properly
5. Test the detail page if created

## Troubleshooting

If your chair doesn't appear:
1. Check for any TypeScript errors in the console
2. Verify that you've properly exported the chair from its file
3. Confirm that all required fields in the chair data are filled in
4. Check that the chair is correctly added to the index.ts file
5. Verify that Cloudinary images are accessible at the URLs you specified

## Best Practices

1. Follow the naming conventions for files and IDs
2. Provide detailed descriptions for better SEO
3. Include multiple high-quality images
4. List comprehensive specifications
5. Follow the same pattern for variants as existing chairs