# Visitor Series

## Overview
The Visitor Series is a poetic collection of visitor chairs, designed for comfort, elegance, and welcoming every guest with grace. This series is modular, production-ready, and integrates seamlessly with the UI patterns of the director and executive series.

## Modular Product Structure (Universal Standard)
- Every chair in every series must have its own folder under `lib/data/products/chairs/{series-id}/{chair-id}/`.
- Each folder contains an `index.ts` exporting the chair's ExtendedProductData.
- The main `{series-id}/index.ts` imports and registers all chairs in the canonical products map.
- This pattern applies to Director, Executive, Ergonomic, Visitor, and any new series added to the website.
- Ensures maintainability, extensibility, and DRY principles across all products and series.

## Features
- Modular TypeScript structure
- Easy to extend and maintain
- Designed for hospitality and guest comfort
- Ready for product additions

## Location
- `lib/data/products/chairs/visitor-series/index.ts`
- (Pattern applies to all series)

---

#architecture #memory
