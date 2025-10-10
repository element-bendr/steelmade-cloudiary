# Adding New Director Series Chairs (2025 Canonical Pattern)

## Overview

Director Series chairs now use a canonical, DRY, and modular data structure. All chair data is registered in `lib/data/products/chairs/director-series/index.ts` as part of the `directorSeries.products` object. No runtime registry or manual array is needed. UI pages use this canonical object for all lookups and listings.

## Canonical List of Director Series Chairs

The following chairs are currently part of the canonical Director Series:

- Ashley Director Chair
- Opera Director Chair
- Tycoon Director Chair
- BigBoss Gold Director Chair
- Woodland Director Chair
- Boston Director Chair
- Grandezza Director Chair
- Kotak Director Chair
- Milano Director Chair
- Monarch Director Chair
- Nissan Director Chair
- Parker Director Chair
- Trident Director Chair

Each chair is defined in its own folder as an `index.ts` file and registered in the `products` map in `lib/data/products/chairs/director-series/index.ts`.

## How to Add a New Chair

1. **Create the Chair Data File**
   - Add a new folder and `index.ts` for your chair in `lib/data/products/chairs/director-series/`.
   - Export an `ExtendedProductData` object with all chair details and variants.

2. **Register in Canonical Index**
   - Import your chair in `lib/data/products/chairs/director-series/index.ts`.
   - Add it to the `products` map using `[yourChair.id]: yourChair`.

3. **No Registry Needed**
   - Do NOT use or import any runtime registry or `registerDirectorChair`. All lookups are static and canonical.

4. **UI Integration**
   - The listing page (`app/chairs/director-series/page.tsx`) automatically lists all chairs in `directorSeries.products`.
   - The detail page (`app/chairs/director-series/[productId]/page.tsx`) looks up the chair by `productId` in `directorSeries.products`.

5. **Testing**
   - Build and test the app. Your chair should appear automatically in the listing and be accessible by its `id`.

## Example

```typescript
// lib/data/products/chairs/director-series/my-new-chair/index.ts
import { ExtendedProductData } from '@/lib/data/product-types';

const myNewChair: ExtendedProductData = {
  id: 'my-new-chair',
  name: 'My New Chair',
  // ...other fields...
};

export default myNewChair;
```

```typescript
// lib/data/products/chairs/director-series/index.ts
import myNewChair from './my-new-chair';

export const directorSeries = {
  // ...existing fields...
  products: {
    ...,
    [myNewChair.id]: myNewChair,
  }
};
```

## Cloudinary Image Guidelines
- Upload images to `steelmade/chairs/director-series/{chair-name}/`
- Use consistent naming for image codes and variants

## Troubleshooting
- If your chair does not appear, check the `products` map in the canonical index file.
- Do not use any registry or manual array—only the canonical object.

## Migration Note
- The runtime registry (`registerDirectorChair`) is deprecated and should not be used.
- All documentation and onboarding should reference only the canonical pattern.
