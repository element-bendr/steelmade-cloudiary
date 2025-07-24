# Chair Addition Guide

This guide explains how to add a new chair to any series (Director, Executive, Ergonomic, Visitor, or future series) following the modular architecture pattern.

## Overview

SteelMade uses a modular data architecture for all chair products and series. Every chair must have its own folder and index.ts file, and every series must have a main index.ts that imports and registers all products.

## Step 1: Create the Chair Data Folder and File

- For every new chair, create a new folder under `lib/data/products/chairs/{series-id}/{chair-id}/`.
- In that folder, create an `index.ts` file exporting an `ExtendedProductData` object for the chair.
- This applies to every series—Director, Executive, Ergonomic, Visitor, and any new series added in the future.

## Step 2: Register the Chair in the Series Index

- Import your chair in the series' main index.ts (e.g., `lib/data/products/chairs/visitor-series/index.ts`).
- Add it to the `products` map using `[yourChair.id]: yourChair`.
- This ensures all chairs are discoverable and UI integration is automatic.

## Step 3: Create Chair Images

- Upload images to Cloudinary for each variant.
- Use the dashboard to verify uploads and get the version number if needed.

## Step 4: Create a Detail Page (Optional)

- If you want a dedicated page for the chair, create:
  `app/chairs/{series-id}/{chair-id}/page.tsx`
- Copy the structure from an existing chair detail page and update it for your new chair.

## Step 5: Testing

- Build and run the application.
- Verify the chair appears on the series page.
- Check that images load correctly and variant selection works.
- Test the detail page if created.

## Troubleshooting

- If your chair doesn't appear:
  1. Check for any TypeScript errors in the console.
  2. Verify that you've properly exported the chair from its file.
  3. Confirm that all required fields in the chair data are filled in.
  4. Check that the chair is correctly added to the index.ts file.
  5. Verify that Cloudinary images are accessible at the URLs you specified.

## Best Practices

- Follow the naming conventions for files and IDs.
- Provide detailed descriptions for better SEO.
- Include multiple high-quality images.
- List comprehensive specifications.
- Follow the same pattern for variants as existing chairs.
- Always use the modular folder structure for every product and every new series in the website.