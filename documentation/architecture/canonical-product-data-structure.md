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
- **Functional**: All code is written in a functional, declarative, and modular style, as per [production instructions](../../.github/instructions/production.instructions.md).
- **Production Ready**: All code is ready for deployment, integration, and extension.

## Process for Adding New Products or Categories
1. Use the canonical template in `lib/templates/product-template.ts`.
2. Place all product data in a single `ExtendedProductData` object.
3. Add all variants to the `variants` array.
4. Export only the canonical product object from each product file.
5. Aggregate products in series/category `index.ts` files as needed.
6. Update documentation and memory as changes are made.
7. Follow [production instructions](../../.github/instructions/production.instructions.md) for all code and documentation.

## Template Location
- `lib/templates/product-template.ts`

## Migration Status

All products in the Ergonomic Series and the following Executive Series products have been migrated to the canonical structure:
- benz, commander, luxury, obama, korean, lx, duster, perkshynl, perk, skoda, sahara, mini-ginger-dolphin, supreme, venus-rev-ud, irana, jet-lazer-computer, premier, nano, mini-markson, phantom, wilson, makson, amigo, amazon, siemens, syndicate, verna, jet-lazer-computer: Each product is in its own folder with an `index.ts` file.
- Legacy flat `.ts` files are marked as migrated and safe to delete.
- Series `index.ts` imports use the canonical folder structure.

## Migration Progress

- Ergonomic Series: All products migrated (flamingo, berlin, roger, ud, dc, mercedes)
- Executive Series: Migrated (benz, commander, luxury, obama, korean, lx, duster, perkshynl, perk, skoda, sahara, mini-ginger-dolphin, supreme, venus-rev-ud, irana, jet-lazer-computer, premier, nano, mini-markson, phantom, wilson, makson, amigo, amazon, siemens, syndicate, verna, jet-lazer-computer)
  - Jet/Lazer/Computer Executive Chair migrated to canonical structure (lib/data/products/chairs/executive-series/jet-lazer-computer/index.ts)
- Director Series: Migrated (classic-director-chair, bigboss-gold, trident, auto-loader)
  - Created canonical `index.ts` for each in their own folder
  - Marked legacy files as migrated and safe to delete
  - Updated imports in `director-series/index.ts` to use canonical structure
- 2025-06-24: Director Series Batch Migration 2
  - Migrated to canonical structure: tycoon-director-chair, woodland-director-chair, opera-director-chair, bigboss-gold-director-chair (Director Series)
  - Created canonical `index.ts` for each in their own folder
  - Marked legacy files as migrated and safe to delete
  - Updated imports in `director-series/index.ts` to use canonical structure
  - All changes follow DRY, modular, declarative, and poetic standards
- 2025-06-24: Executive Series Siemens Chair Review
  - Siemens Executive Chair already conforms to canonical structure (single ExtendedProductData object in its own folder)
  - No migration required for this product
  - Confirmed DRY, modular, declarative, and poetic standards
- 2025-06-24: Director Series Ashley Director Chair Migration
  - Migrated to canonical structure: ashley-director-chair (Director Series)
  - Created canonical `index.ts` in its own folder
  - Marked legacy file as migrated and safe to delete
  - Updated imports in `director-series/index.ts` to use canonical structure
  - All changes follow DRY, modular, declarative, and poetic standards

## See Also
- #memory/canonical-product-data-memory.md
- #architecture/architecture.md
- [Production Instructions](../../.github/instructions/production.instructions.md)

---
This standard is enforced for all chair products and will be extended to all categories as data is added. All maintainers must follow this structure for clarity, maintainability, and poetic code. All code must be functional, declarative, modular, and production ready, as described in the [production instructions](../../.github/instructions/production.instructions.md).
