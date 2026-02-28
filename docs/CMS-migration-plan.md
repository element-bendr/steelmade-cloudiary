# Headless CMS Migration Plan (Sanity.io) for Steelmade

## Overview
Sanity.io is a modern, developer-friendly Headless CMS perfectly suited for Next.js. 
* **Cost**: Yes, **Sanity has a generous Free Tier** (10GB bandwidth/mo, 2 admin users, generous API limits) that is extremely difficult to outgrow for a standard catalog website. 
* **Netlify Compatibility**: Yes, it integrates natively with Netlify. Netlify will trigger a rebuild (or just fetch new data continuously with Next.js App Router API caching) whenever you publish a change in the CMS via webhooks.

## Why Sanity.io?
Unlike traditional databases, Sanity provides an open-source visual editor ("Sanity Studio") that you can customize. Non-technical users can log in, upload new chair photos (or paste Cloudinary URLs), write markdown descriptions, update pricing, and click "Publish".

---

## Step-by-Step Implementation Plan

### Phase 1: Environment Setup & Sanity Initialization
- [ ] **Task 1.1**: Create a free Sanity.io account.
- [ ] **Task 1.2**: Initialize a Sanity Studio directly inside the existing Next.js monorepo (or as a separate folder if preferred). We'll use `@sanity/cli` to `sanity init --env`.
- [ ] **Task 1.3**: Configure `sanity.config.ts` and ensure it can proxy the Sanity API endpoint through our Next.js environment.

### Phase 2: Content Modeling (Schema Design)
The schemas represent the "form fields" editors will fill out. We need to mirror our existing TS types.
- [ ] **Task 2.1**: Create `schema/category.ts` (id, name, description, cover image).
- [ ] **Task 2.2**: Create `schema/series.ts` (id, title, SEO description).
- [ ] **Task 2.3**: Create `schema/product.ts` (id, name, variants, prices, dimensions, features, Cloudinary image URLs).
- [ ] **Task 2.4**: Establish relational references (e.g., a Product belongs to a Series, a Series belongs to a Category).

### Phase 3: Data Migration Scripting
Instead of manually typing all current products into the CMS...
- [ ] **Task 3.1**: Write a custom Node.js script using `@sanity/client`.
- [ ] **Task 3.2**: The script will read all your existing hardcoded data arrays in `lib/data/products/chairs/*.ts`.
- [ ] **Task 3.3**: The script will automatically mutate and `POST` this data into the Sanity backend to instantly populate the CMS.

### Phase 4: Frontend Integration & Data Fetching
- [ ] **Task 4.1**: Install `next-sanity` in the `steelmadewebsite` package.
- [ ] **Task 4.2**: Replace the hardcoded `getCategory()` and `getProductsBySeries()` functions in `lib/data/` with GROQ queries (Sanity's query language).
  * *Example GROQ:* `*[_type == "product" && series->slug.current == $seriesId]`
- [ ] **Task 4.3**: Update `app/chairs/[seriesId]/page.tsx` to dynamically fetch from Sanity instead of local files.

### Phase 5: Caching and Webhooks (Crucial Step)
- [ ] **Task 5.1**: Ensure Next.js caches the Sanity requests so we aren't pinging the CMS API on every page load (keeps you strictly in the free tier).
- [ ] **Task 5.2**: Set up an API route `/api/revalidate` in Next.js.
- [ ] **Task 5.3**: Add a Webhook in the Sanity Dashboard that pings `/api/revalidate` whenever someone publishes a change, triggering Netlify/Next.js to clear its fast-cache and show the new data instantly.

