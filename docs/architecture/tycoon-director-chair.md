# Tycoon Director Chair – Product Page Implementation

**Location:** `app/chairs/director-series/tycoon-director-chair/page.tsx`

## Overview
This file implements the product detail page for the Tycoon Director Chair using a modular, declarative approach. It leverages the shared `ProductDetailLayout` component from `@/components/products` and imports the product data from the modular data source at `@/lib/data/products/chairs/director-series/tycoon-director-chair/index`.

## Key Features
- **Client Component:** Uses the `use client` directive for interactivity (e.g., contact form state).
- **Product Data:** Imports all product details from a single source of truth, ensuring DRY and maintainable data management.
- **Custom Section:** Implements a `renderCustomSection` function to display Tycoon-exclusive benefits, such as extended warranty and priority support, in a visually distinct section.
- **Layout Options:** Passes layout options to ensure consistent image positioning and meta section visibility across the catalog.
- **Contact Options:** Integrates a contact form trigger, allowing users to reach out for more information.
- **Image Fallback:** Ensures a placeholder image is used if no product image is specified.

## Example Usage
```tsx
<ProductDetailLayout
  product={{
    ...tycoonDirectorChair,
    price: '', // No price to match Opera chair
    imageUrl: tycoonDirectorChair.imageUrl || '/images/chairs/placeholder.jpg',
  }}
  contactOptions={{
    onContactClick: () => setShowContactForm(true),
  }}
  layoutOptions={{
    imagePosition: 'left',
    showMetaSection: false,
  }}
  renderCustomSection={renderCustomSection}
/>
```

## Custom Section Example
The custom section highlights exclusive benefits:
- Extended 5-year warranty
- Priority customer support
- Free delivery and setup

## Best Practices
- Keep product data modular and declarative.
- Use shared layout components for consistency.
- Document any custom logic or UI sections in this file and in the main architecture documentation.

---
_Last updated: 2025-06-28_
