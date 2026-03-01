# Sanity CMS Migration Tasks (Working on `feature/sanity-cms-migration`)

## Phase 1: Environment Setup & Sanity Initialization
- [x] Install Sanity CLI and initialize Studio environment.
- [x] Configure `sanity.config.ts` with Next.js project proxying/routing.

## Phase 2: Content Modeling (Schema Design)
- [x] Create `schema/category.ts` (id, name, description, cover image).
- [x] Create `schema/series.ts` (id, title, SEO description).
- [x] Create `schema/product.ts` (id, name, variants, prices, dimensions, Cloudinary image URLs).

## Phase 3: Data Migration Scripting
- [x] Install `@sanity/client`.
- [x] Build migration script `scripts/migrate-to-sanity.ts`.
- [x] Execute script to push local TypeScript data to Sanity database.

## Phase 4: Frontend Integration & Data Fetching
- [x] Install `next-sanity`.
- [x] Replace `getCategory()` and `getProductsBySeries()` with GROQ.
- [x] Update frontend components to map Sanity response elements.

## Phase 5: Caching & Webhook
- [x] Create `/api/revalidate` in Next.js.
- [x] Hook up webhooks in Sanity Dashboard to trigger ISR rebuilds safely. (User Action)
