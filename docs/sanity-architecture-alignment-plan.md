# Sanity Architecture Alignment: Single Source of Truth Plan

## Objective
Migrate the Next.js frontend application from duplicated, hardcoded static paths (`app/chairs`, `app/desks`, `app/storage`) and legacy localized TypeScript data (`lib/data`) to a 100% dynamic App Router architecture (`app/[categoryId]`) powered solely by the Sanity CMS schema.

## Status Quo ("Dual Source of Truth" Anti-Pattern)
Currently, the codebase executes the following workflow which results in severe tech-debt:
1. It maintains massive static dictionaries of products in `lib/data/product-catalog.ts`.
2. It hardcodes dedicated React routing folders specifically mapped to category names (`app/chairs/*`, `app/desks/*`).
3. These hardcoded categories manually iterate over local typescript imports rather than leveraging the globally designed `<CategoryPageTemplate>`.
*Result*: Maintaining this forces developers to push codebase branches just to update a text typo or add a new URL parameter instead of merely using the new Sanity graphical interface.

## Target Future State (Alignment)
We want to rely on the `[categoryId]` Next.js catch-all. 
* Any category generated inside `localhost:3000/studio` directly dictates what route opens in `localhost:3000/[name]`.
* The entire legacy TypeScript datastore must be deleted. 
* All queries run universally using single generic functions communicating explicitly with `@sanity/client`.

## Execution Steps

### 1. Data Fetching API Enhancement
* Enhance `lib/sanity.client.ts` to expose clean typed endpoints:
  * `getCategories()`
  * `getCategoryProducts(categoryId)`
  * `getProductDetails(productId)`
* Setup generic parameter mapping for `generateMetadata` to pull Sanity SEO fields universally.

### 2. Adapter Layer Generation
* Since `<ProductDetailLayout>` expects local Type shapes, we will create a `SanityAdapter` intermediate file.
* It will take the Sanity GROQ results (especially arrays of '{name: string, value: string}' for `specifications`) and mold them safely into standard React `Props` expected by UI interfaces.

### 3. App Router Decoupling
* Create `app/[categoryId]/[seriesId]/page.tsx`
* Create `app/[categoryId]/[seriesId]/[productId]/page.tsx`
* Insert the `<CategoryPageTemplate>` and `<ProductDetailLayout>` React bindings. Connect them sequentially directly calling the Data Fetching APIs.

### 4. Hardcode Cleanse (Destruction Phase)
* Recursively `rm -rf` the entire `app/chairs`, `app/desks`, `app/storage`, `app/modular-furniture`, `app/hospital-furniture`, `app/racking-systems`, and `app/school-furniture` structures.
* Check Next.js `npm run build` output for conflicts. 

### 5. Finalizing The "Single Truth"
* Ensure all frontend routes load successfully natively pulling from Sanity.
* Recursively `rm -rf` the entire `lib/data` (outside of the structural `product-types.ts` used by React Props).
* Commit all code destruction to git.

## Conclusion
Upon finishing this plan, the repository size will shrink significantly, frontend routing complexity will be reduced from 15 folders to a single `app/[categoryId]`, and data mapping will reliably use the Sanity Data Lake as its absolute source of truth.
