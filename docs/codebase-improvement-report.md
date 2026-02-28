# Codebase Improvement Report - Steelmade Chairs

Based on a comprehensive scan of the repository structure, `package.json`, Next.js build output, component architecture, and current styling patterns, here is a categorized report on how to elevate the quality, scalability, and performance of the codebase.

## 1. Architectural & Data Flow Improvements
* **Migrate from Hardcoded Static Data to a Headless CMS**: Currently, product data is hardcoded inside TypeScript files (e.g., `lib/data/products/chairs`). While Next.js statically builds this, it forces a code commit and complete deployment every time a product price, image, or description changes. Moving this to Sanity, Contentful, or a Postgres DB (with Prisma) will decouple content from code.
* **Resolve Mixed Route Renderings (Edge vs Node)**: The build output notes: `⚠ Using edge runtime on a page currently disables static generation`. Explicitly declaring `export const runtime = 'edge'` in dynamic routes is currently penalizing caching. Standardizing on `nodejs` runtime for API routes and relying on Next.js *Incremental Static Regeneration (ISR)* will provide faster, cheaper TTFB (Time To First Byte).

## 2. Component Consolidation (Addressing Tech Debt)
* **The "Card" Component Sprawl**: There are at least half a dozen separate Product Card components scattered throughout the repo:
  * `components/collections/CollectionCard.tsx`
  * `components/products/ProductCard.tsx`
  * `components/products/cards/GlassmorphicProductCard.tsx`
  * `components/products/ChairCard.tsx`
  * `components/common/ProductCard.tsx`
  * `components/templates/ConfigurableCard.tsx`
  * **Fix**: You already have `class-variance-authority` (cva) installed. Refactor these into a single highly-polymorphic `<ProductCard variant="glassmorphic" size="lg" />` component. This will massively reduce maintenance overhead and UI inconsistencies.

## 3. Image Optimization & Cloudinary Integration
* **Use Next.js Custom Image Loader**: Looking at `slide-generator.ts`, image URLs are manually concatenating Cloudinary optimization params (`/q_auto,f_auto/v1752.../`). 
* **Fix**: Instead of hardcoding transformation string rules in every file, configure Next.js to use the [Cloudinary Image Loader](https://nextjs.org/docs/app/api-reference/components/image#loader) in `next.config.js`. This allows you to just use standard Next.js `<Image src="steelmade/chairs/..." />` and Next.js will handle responsively generating the correct size breakpoints automatically.

## 4. Performance & DX (Developer Experience) 
* **Update `next-pwa` plugin**: The repository uses `next-pwa@5.6.0`, which is largely unmaintained and conflicts with Next.js App Router caching. Strongly consider switching to `@ducanh2912/next-pwa` or removing it entirely if a PWA isn't strictly necessary.
* **Typescript Linting Skew**: `package.json` specifies `"typescript": "^5.8.3"`, but Next.js `14.0.0` ESLint rules officially only support up to `<5.4.0`. This is throwing persistent terminal warnings. Downgrading TypeScript to `5.3.3` or upgrading Next.js and `@typescript-eslint` packages to match will fix IDE intellisense bugs.
* **Cleanup Docs Folder Tracking**: There are hundreds of Markdown files in `docs/` (`director-series-cleanup-summary.md`, `component-duplication-analysis.md`). This indicates architectural changes are being tracked as raw files. Moving these specs to GitHub Issues / Projects or Jira will reduce repo bloat and improve searchability.

## 5. UI/UX Refinements
* **Remove Client-Side Layout Restrictions**: `app/chairs/layout.tsx` is being forced to render via `'use client'`. Layout files should almost always remain React Server Components (RSC) because they wrap the entire route tree. Push the interactivity down into specific client components (like `<ClientNavigation />`) so the bulk of the Layout runs securely and instantly on the server.
