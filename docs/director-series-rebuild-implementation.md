# Director Series Rebuild Implementation (2025 Canonical Pattern Update)

## Update (June 2025)

- The Director Series now uses a canonical, DRY, and modular data structure.
- All chair data is registered in `lib/data/products/chairs/director-series/index.ts` as part of the `directorSeries.products` object.
- The runtime registry (`registerDirectorChair`) is deprecated and should not be used.
- UI pages (`app/chairs/director-series/page.tsx` and `[productId]/page.tsx`) use the canonical object for all lookups and listings.
- To add a new chair, simply add it to the canonical `products` map—no manual imports or registry required.

## Benefits
- Consistent UX and data structure
- No technical debt or legacy code
- DRY, modular, and production-ready
- Easy to extend and maintain

## Migration Note
- All documentation and onboarding should reference only the canonical pattern.
- See `docs/adding-new-director-chairs.md` for the latest onboarding guide.
