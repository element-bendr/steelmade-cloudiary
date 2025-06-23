# Canonical Product Data Memory

## Summary
The canonical product data structure for Steelmade Cloudiary Chairs ensures all product data is DRY, modular, and extensible. Each product is a single `ExtendedProductData` object with all variants in a `variants` array. This memory entry documents the structure, reasoning, and process for future maintainers.

## Key Points
- All chair products use a single canonical object per product.
- All variants are included in the `variants` array.
- No legacy/flat variant exports remain.
- Template for new products: `lib/templates/product-template.ts`.
- Documentation: `documentation/architecture/canonical-product-data-structure.md`.

## Process
1. Use the canonical template for new products/categories.
2. Place all product data in a single object.
3. Add all variants to the `variants` array.
4. Export only the canonical product object.
5. Update documentation and memory.

## Rationale
This structure is designed for maintainability, extensibility, and poetic clarity. It is the standard for all current and future product data.

---
For more details, see the architecture documentation.
