# Modular Furniture Route & Data Remediation Guide

> Use this document verbatim as your source of truth when requesting automated edits from another LLM or script. Do **not** authorize changes beyond the items listed here. Each task assumes TypeScript, Next.js 13+ (app router), and the existing project structure.

---

## 0. Safety Checks (Always Run First)

1. Ensure you are on the expected branch and the workspace is clean other than intentional edits.
2. Install dependencies if needed (`npm install`).
3. Run static analysis before and after the work (`npm run lint`). If a dedicated typecheck command exists (`npm run typecheck` or `npm run build`), run it too.

---

## 1. Normalize Workstation Product Data

**Goal:** Every workstation product must report `seriesId: 'workstations'`.

- Scope: Files under `lib/data/products/modular-furniture/workstations/*/index.ts`.
- Action: Replace any occurrence of `seriesId: 'modular-furniture'` (or other incorrect values) with `seriesId: 'workstations'`.
- Do not change any other fields unless the instructions below explicitly require it.

---

## 2. Correct the Modular-Furniture Category Index

**Goal:** The category export must only contain `ProductSeries` objects.

- File: `lib/data/products/modular-furniture/index.ts`.
- Replace the current export with one that maps series slugs to series data only:
  ```ts
  export const modularFurniture = {
    workstations: workstationsSeries,
  };
  ```
- Remove the direct `curveSeries` export in this file. Individual workstation products already live under `workstationsSeries.products`.
- Leave the named exports `workstationsSeries` (and others, if needed later) intact.

---

## 3. Re-enable the Series Route

**Goal:** Restore `/modular-furniture/[seriesId]` pages using the real data layer.

- File: `app/modular-furniture/[seriesId]/page.tsx`.
- Replace the temporary redirect with the implementation from `page-new.tsx`, but:
  1. Fetch data through `getSeriesById('modular-furniture', seriesId)` instead of `require`.
  2. Guard `notFound()` when the series or its products are missing.
  3. Update `generateMetadata` to derive values from the fetched series.
  4. Update `generateStaticParams` to call `getAllSeries('modular-furniture')` and return `Object.keys(...)`.
  5. Keep the UI minimal—only render the grid view for now.
- After the new page is confirmed working, delete `app/modular-furniture/[seriesId]/page-temp.tsx`.

---

## 4. Remove Redundant Manual Workstation Pages

**Goal:** Let the unified product route handle workstation detail pages.

- Scope: Every file under `app/modular-furniture/workstations/*/page.tsx`.
- Action: Delete these files unless they provide bespoke layouts that are still required. If any special layout must remain, update it so it relies on the corrected data (no manual `seriesId` overrides).

---

## 5. Use Real Series Metadata in Product Detail Route

**Goal:** Eliminate mock metadata and rely on the shared services.

- File: `app/modular-furniture/[seriesId]/[productId]/page.tsx`.
- Steps:
  1. Fetch the series with `getSeriesById('modular-furniture', seriesId)` alongside `getProductDetails`.
  2. Pass the retrieved series directly to `ProductPageLayout` (remove `MOCK_SERIES_DATA` and the mapping helper).
  3. Update `generateMetadata` to incorporate the real series/product information.
- Do not introduce any new mock data.

---

## 6. Verification Checklist

1. Run `npm run lint` (and `npm run typecheck` if available). Resolve new issues.
2. Start the dev server (`npm run dev`) and manually verify:
   - `/modular-furniture` renders series cards with valid links.
   - `/modular-furniture/workstations` displays the products list.
   - `/modular-furniture/workstations/{productId}` renders product detail pages with correct breadcrumbs.
   - `/modular-furniture/{seriesId}` routes no longer redirect unexpectedly.
3. No new 404s or console errors should appear during navigation.

---

## 7. Optional Enhancements (Only if Requested)

- Add or update end-to-end tests covering modular-furniture navigation.
- Document the changes in release notes (`CHANGELOG.md`) if this aligns with team practice.

---

**Reminder:** Stick strictly to this checklist. Do not modify unrelated files, feature flags, or data structures. Report any unexpected blockers before deviating.***
