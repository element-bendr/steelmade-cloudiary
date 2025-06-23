# Canonical Product Data Structure for Steelmade Cloudiary Chairs

## Overview

All product data for chairs (and, in future, all product categories) must use a canonical, DRY, modular structure. Each product is represented as a single `ExtendedProductData` object, with all variants included in a `variants` array. This ensures maintainability, extensibility, and poetic clarity across the codebase.

## Canonical Structure Example

```typescript
import { ExtendedProductData } from '.../product-types';

export const dcErgonomicChair: ExtendedProductData = {
  id: 'dc',
  name: 'DC Ergonomic Chair',
  description: 'DC Ergonomic Chair, available in high back and mid back, black and grey variants. Designed for comfort, support, and poetic productivity.',
  category: 'chairs',
  seriesId: 'ergonomic-series',
  imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684601/steelmade/chairs/ergonomic-series/dc/ic-342-hb-black.jpg',
  features: [
    'High back and mid back ergonomic support',
    'Premium black and grey finishes',
    'Adjustable height, tilt, and armrests',
    'Lumbar support and contoured seat',
    'Sturdy, poetic construction'
  ],
  variants: [
    {
      variantId: 'ic-342-hb-black',
      variantName: 'High Back Black',
      name: 'IC-342 HB Black',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684601/steelmade/chairs/ergonomic-series/dc/ic-342-hb-black.jpg',
      description: 'Ergonomic high-back chair, black finish, designed for comfort and support.'
    },
    {
      variantId: 'ic-345-mb-grey',
      variantName: 'Mid Back Grey',
      name: 'IC-345 MB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684598/steelmade/chairs/ergonomic-series/dc/ic-345-mb-grey.jpg',
      description: 'Ergonomic mid-back chair, grey finish, crafted for modern workspaces.'
    },
    {
      variantId: 'ic-344-hb-grey',
      variantName: 'High Back Grey',
      name: 'IC-344 HB Grey',
      imageUrl: 'https://res.cloudinary.com/dqde19mfs/image/upload/v1750684597/steelmade/chairs/ergonomic-series/dc/ic-344-hb-grey.jpg',
      description: 'High-back ergonomic chair in grey, engineered for all-day comfort.'
    }
  ]
};
```

## Principles
- **DRY**: No duplicate or flat variant exports. All variants are nested within the product object.
- **Modular**: Each product is a single, self-contained object.
- **Extensible**: New variants or features can be added easily.
- **Declarative & Poetic**: Code is readable, maintainable, and expressive.

## Process for Adding New Products or Categories
1. Use the canonical template in `lib/templates/product-template.ts`.
2. Place all product data in a single `ExtendedProductData` object.
3. Add all variants to the `variants` array.
4. Export only the canonical product object from each product file.
5. Aggregate products in series/category `index.ts` files as needed.
6. Update documentation and memory as changes are made.

## Template Location
- `lib/templates/product-template.ts`

## See Also
- #memory/canonical-product-data-memory.md
- #architecture/architecture.md

---
This standard is enforced for all chair products and will be extended to all categories as data is added. All maintainers must follow this structure for clarity, maintainability, and poetic code.
