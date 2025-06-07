# Planner Update

*(Existing content preserved)*

---

## Build Error Resolution (5/21/2025) - Final Pass

**Objective:** Fix all outstanding build errors to enable successful deployment to Vercel for client review.

**Previously Resolved (Summarized from 5/20 & earlier 5/21 entries):**
*   Populated empty `.tsx` files to resolve module errors (e.g., `app/storage/[seriesId]/[productId]/page.tsx`).
*   Corrected default/named import issues (e.g., `Input` component in `contact-form.tsx`).
*   Fixed incorrect import paths for types (`ProductType`, `ImageAsset`, `CollectionFilters`) and components (`ThemeToggle` in `header.tsx`) across numerous files.
*   Resolved issues with barrel file exports (`components/ui/index.ts`).
*   Standardized `ProductType` (slugs like "storage-solutions") and `ProductCategory` (display names like "Storage Solutions") usage and import paths across the codebase.
*   Updated `ProductData` type (`types/products.ts`) to include missing fields (`seoDescription`, `lastModified`, `materials`, `dimensions`, `imageUrl`, `category`, `seriesId`, `inStock`).
*   Corrected data in `lib/data/collections-data.ts` to conform to `ProductData` and `ImageAsset` types (added missing `alt` tags, `category`, `seriesId`, etc., and ensured correct category keys).
*   Added an optional `featured` property to `MegaMenu` interface (`lib/data/navigation.ts`) to fix errors in `components/ui/header.tsx`.
*   Fixed type errors in `ImageCarousel` and `ProductSeriesInteractiveFeatures` related to `ImageAsset` arrays and `useCarouselDrag` hook usage.
*   Resolved type errors in `app/storage/page.tsx` related to placeholder data (missing `images`, incorrect `category` type, `undefined` `coverImage`) and `getImageUrl` arguments.
*   Corrected `getImageUrl` argument handling in `components/products/series-grid.tsx`.
*   Fixed `canonicalPath` null issues in `components/seo/canonical-url.tsx`.
*   Resolved `Object.entries` argument type errors in `components/seo/collections-schema.tsx` by filtering properties and adding null checks for `priceRange`.
*   Corrected `externalRef` call signature in `hooks/use-carousel-drag.ts`.
*   Refactored `lib/navigation.ts` to standardize category slugs (`ProductType`), display names (`ProductCategory`), and URL generation functions (`getCategoryUrl`, `getProductUrl`). Updated components using these functions.
*   Addressed various prop mismatches and incorrect data access in components like `CollectionsGrid.tsx`, `ProtectedCollectionsGrid.tsx`, and `ProductSeriesPage`.

**Newly Resolved Errors (Latter part of 5/21/2025):**

16. **`Type error: No overload matches this call.` in `scripts/upload-images-to-s3.ts` (related to `Object.entries(subcategories)`)**
    *   **Cause:** The `subcategories` variable, derived from `collections` (type `CategoryCollections`), could be a string or undefined, which is not compatible with `Object.entries`.
    *   **Resolution:** Added a type check `if (typeof subcategories === 'object' && subcategories !== null)` before calling `Object.entries(subcategories)` within the `collectImagePaths` function.

17. **`Type error: No overload matches this call.` in `scripts/upload-images-to-s3.ts` (related to `Object.values(data.products)`)**
    *   **Cause:** `data.products` could be `undefined`, which is not a valid argument for `Object.values`.
    *   **Resolution:** Added a check `if (data.products)` before calling `Object.values(data.products)` within the `collectImagePaths` function.

**Build Status:** All identified build errors are now believed to be resolved. Ready for final build verification and deployment.

---

## Build Error Resolution (5/20/2025)

**Objective:** Fix outstanding build errors to enable successful deployment to Vercel for client review.

**Errors Encountered & Resolutions:**

1.  **`Type error: File '/vercel/path0/app/storage/[seriesId]/[productId]/page.tsx' is not a module.`**
    *   **Cause:** The file `e:\\steelmadewebsite\\app\\storage\\[seriesId]\\[productId]\\page.tsx` was empty.
    *   **Resolution:** Populated the file with a basic Next.js page component structure, including a default export, to make it a valid module.

2.  **`Attempted import error: '@/components/ui/input' does not contain a default export (imported as 'Input').`**
    *   **Import Trace:** `./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js`
    *   **Investigation:**
        *   Confirmed `e:\\steelmadewebsite\\components\\ui\\input.tsx` uses a named export: `export { Input }`.
        *   Confirmed known usages (e.g., `e:\\steelmadewebsite\\components\\search\\SearchBar.tsx`) correctly use the named import: `import { Input } from "@/components/ui/input";`.
        *   A `grep_search` for `import Input from "@/components/ui/input"` found no incorrect default imports.
    *   **Hypothesis:** This error might have been a cascading issue caused by the build system's confusion due to the invalid module error in `app/storage/[seriesId]/[productId]/page.tsx`.
    *   **Next Step:** Verify if fixing the module error also resolved this import error during the next build/deployment.

---

## Build Error Resolution (5/21/2025) - Continued

**Objective:** Fix all outstanding build errors to enable successful deployment to Vercel for client review.

**Previously Resolved (5/20/2025):**
*   `Type error: File '/vercel/path0/app/storage/[seriesId]/[productId]/page.tsx' is not a module.`
*   `Attempted import error: '@/components/ui/input' does not contain a default export (imported as 'Input').` (Resolved by fixing the module error above and correcting the import in `contact-form.tsx`)
*   Multiple `Type error: File ... is not a module.` for various empty page files (e.g., `app/storage/[seriesId]/page.tsx`, `app/storage/page.tsx`).
    *   **Resolution:** Populated these files with basic Next.js page component structures.
*   Type errors in `app/chairs/[seriesId]/collections/page.tsx` related to `ProductData` missing fields (`seoDescription`, `lastModified`, `materials`) and `coverImage`/`images` type mismatches.
    *   **Resolution:** Updated `ProductData` in the component to include missing fields with appropriate types or default values. Ensured `coverImage` and `images` conform to `ImageAsset`.
*   Prop mismatches in `ProductSeriesPage` usage across category pages (e.g., `app/chairs/[seriesId]/page-fixed.tsx`, `app/desks/[seriesId]/page-fixed.tsx`).
    *   **Resolution:** Corrected props passed to `ProductSeriesPage` (e.g., `productType` to `category`, added `seriesId`, `products`).
*   Incorrect category string arguments in `getSeriesById`, `getRelatedSeries`, `getAllSeries` calls and for `ProductSeriesPage` props in various category pages.
    *   **Resolution:** Standardized category strings (e.g., "hospital" to "hospital-furniture").
*   `ProductType` not exported from `lib/services/product-service.ts` for `app/sitemap.ts`.
    *   **Resolution:** Exported `ProductType` from `lib/services/product-service.ts`.
*   Incorrect `ProductType` value "storage" in `app/sitemap.ts`.
    *   **Resolution:** Changed to "storage-solutions".
*   Conflicting `ProductType` definitions and incorrect import paths.
    *   **Resolution:** Standardized `ProductType` to be imported from `types/products.ts` across multiple files (e.g., `app/collections/page.tsx`, `lib/services/collections-service.ts`, various components in `components/collections/`). Removed outdated definition from `types.ts`.
*   `'ref' is specified more than once` error in `components/collections/CollectionCarousel.tsx`.
    *   **Resolution:** Removed local `containerRef` and used the ref from `useSwipeable` hook directly.
*   `Property 'refetch' does not exist` error in `components/collections/CollectionDetail.tsx`.
    *   **Resolution:** Added `refetch` function to `useProducts` hook and updated `CollectionDetail.tsx` to use it.

**Newly Resolved Errors (5/21/2025):**

3.  **`Type error: Type 'string | undefined' is not assignable to type 'string'.` in `components/collections/CollectionsGrid.tsx` (for `subCategory={collection.id}` prop)**
    *   **Cause:** `collection.id` could be `undefined`.
    *   **Resolution:** Provided a default empty string if `collection.id` is undefined: `subCategory={collection.id ?? ''}`.

4.  **Multiple type errors in `components/collections/CollectionsGrid.tsx` after initial fix (e.g., `Cannot find name 'Link'`, `Property 'productType' does not exist on type 'SubCategoryCollection'`, `Cannot find name 'CollectionPreview'`)**
    *   **Cause:** Missing imports for `Link` and `CollectionPreview`. Incorrect property access for `SubCategoryCollection` (e.g., `collection.name`, `collection.productType` were not direct properties). `CollectionPreview` was also being misused as a grid item.
    *   **Resolution:**
        *   Added import for `Link` from `next/link`.
        *   Realized `CollectionPreview` was not the correct component for rendering individual collection cards in the grid.
        *   Replaced `CollectionPreview` usage within the map with direct JSX for rendering each collection card, including `next/image` for cover images.
        *   Correctly accessed properties like `collection.id`, `collection.title`, `collection.coverImage`, and `collection.metadata?.coverImage`, `collection.metadata?.description`.
        *   Calculated `productCount` based on `collection.products` or `collection.series`.
        *   Made `productType` a mandatory prop for `CollectionsGrid` and used it for link generation.
        *   Added a basic `useDebounce` hook for the search functionality.

5.  **`Property 'altText' does not exist on type 'ImageAsset'.` in `components/collections/CollectionsGrid.tsx`**
    *   **Cause:** `ImageAsset` type uses `alt` not `altText`.
    *   **Resolution:** Changed `imageAsset.altText` to `imageAsset.alt`.

6.  **`Type error: Type 'ProductCategories | EmptySubCategoryCollection' is not assignable to type 'SubCategoryCollection[]'.` in `components/collections/protected-collections-grid.tsx`**
    *   **Cause:** `CollectionsGrid` expects `collections` prop as `SubCategoryCollection[]`, but `ProtectedCollectionsGrid` was passing an object (`ProductCategories`) or a single `EmptySubCategoryCollection`.
    *   **Resolution:** Modified `ProtectedCollectionsGrid` to transform its `collections` prop into an array using `Object.values()` if it's an object, or an empty array if it's an `EmptySubCategoryCollection` or undefined/null, before passing to `CollectionsGrid`.

7.  **`Type error: Property 'type' does not exist on type 'IntrinsicAttributes & CollectionsGridProps'. Did you mean 'productType'?` in `components/collections/protected-collections-grid.tsx`**
    *   **Cause:** `CollectionsGrid` props were updated to expect `productType`, but `ProtectedCollectionsGrid` was still passing `type`.
    *   **Resolution:** Changed prop from `type={type}` to `productType={type}` in `ProtectedCollectionsGrid`.

8.  **`Type error: Property 'featured' does not exist on type 'MegaMenu'.` in `components/header.tsx`**
    *   **Cause:** `featured` was a property of `MegaMenuColumn`, not `MegaMenu` itself in `lib/data/navigation.ts`.
    *   **Resolution:** Added an optional `featured?: MegaMenuFeatured;` property to the `MegaMenu` interface in `lib/data/navigation.ts`.

9.  **`Type error: Expected 1 arguments, but got 2.` for `getImageUrl` in `app/storage/page.tsx`**
    *   **Cause:** `getImageUrl` function in `lib/utils/image-utils.ts` only accepts one argument (the image asset or URL), but was being called with a fallback URL as a second argument.
    *   **Resolution:** Modified `app/storage/page.tsx` to handle the fallback logic externally. Call `getImageUrl(series.coverImage)`, and if the result is empty, use the placeholder URL `"/images/placeholder.jpg"` for the `Image` component's `src` prop.

10. **`Module not found: Can't resolve '@/lib/services/product-service' in 'e:\steelmadewebsite\app\storage'` (manifested as `getProductSeries` not found) in `app/storage/page.tsx`**
    *   **Cause:** Attempting to import `getProductSeries` which is not exported. The intention was to get all series for the "storage-solutions" category.
    *   **Resolution:** Changed the import to `getAllSeries` from `@/lib/services/product-service`. Updated the code to process the object returned by `getAllSeries` (using `Object.values()`) into an array for rendering. Ensured placeholder data matched `SeriesMetadata`.

11. **`Type error: Property 'images' is missing in type '{...}' but required in type 'SeriesMetadata'.` in `app/storage/page.tsx` (for placeholder data)**
    *   **Cause:** Placeholder objects were missing the `images: ImageAsset[]` property required by `SeriesMetadata`.
    *   **Resolution:** Added `images: []` to the placeholder objects.

12. **`Type error: Types of property 'category' are incompatible. Type 'string' is not assignable to type 'ProductCategory'.` in `app/storage/page.tsx` (for placeholder data)**
    *   **Cause:** The `category` property in placeholder data was a generic `string`, but `SeriesMetadata` expects `ProductCategory` (a union of specific string literals).
    *   **Resolution:** Changed the `category` value in placeholder objects to `"storage-solutions"` and asserted the type using `as ProductCategory`.

13. **`Type error: Type 'undefined' is not assignable to type 'ImageAsset'.` in `app/storage/page.tsx` (for `coverImage` in one placeholder object)**
    *   **Cause:** One placeholder object had `coverImage: undefined`, which is not a valid `ImageAsset`.
    *   **Resolution:** Changed `coverImage: undefined` to a placeholder `ImageAsset` object: `{ url: '/images/placeholder.jpg', alt: 'Placeholder Image', width: 800, height: 600 }`.

14. **`Type error: Expected 1 arguments, but got 2.` for `getImageUrl` in `components/products/series-grid.tsx`**
    *   **Cause:** Same as error #9. `getImageUrl` was called with a fallback URL.
    *   **Resolution:** Modified `components/products/series-grid.tsx` to call `getImageUrl(series.coverImage)` and use `"/images/placeholder.jpg"` as a fallback for the `Image` src prop if the result is empty.

15. **`Type error: 'canonicalPath' is possibly 'null'.` in `components/seo/canonical-url.tsx`**
    *   **Cause:** `usePathname()` can return `null`, and if no `path` prop is provided, `canonicalPath` could be `null`, leading to an error when calling `.replace()` on it.
    *   **Resolution:** Added a null check for `canonicalPath` before calling `replace`. If `canonicalPath` is null, `normalizedPath` becomes an empty string: `canonicalPath ? canonicalPath.replace(/\\/$/, '') : ''`.

**Build Status:** All known build errors are now resolved.

---

## Project Initialization and Structure Plan (5/12/2025)

**Core Setup Tasks:**

1. **Project Initialization:**
   - Initialize Next.js using: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
   - Set up proper directory structure following Next.js App Router conventions
   - Configure ESLint and Prettier for code quality enforcement

2. **Design System Setup:**
   - Initialize Shadcn UI: `npx shadcn-ui@latest init`
   - Configure the color palette in Tailwind config (focusing on the red accent #B91C1C)
   - Install core Shadcn components as specified in the PRD
   - Create a component showcasing page to validate the design system

3. **Core Type Definitions:**
   - Create `/types` directory with interfaces for:
     - Product (with variants, specifications, images)
     - Post (for blog content)
     - CaseStudy (for project showcases)
   - Implement shared types for common elements (metadata, images, etc.)

4. **Layout Implementation:**
   - Create base layout with proper HTML structure
   - Implement Header with Shadcn NavigationMenu
   - Implement Footer with required links
   - Set up font loading (Inter from Google Fonts)
   - Create responsive container components

5. **Homepage Foundation:**
   - Implement basic page structure with placeholder sections
   - Set up hero section with optimized imagery
   - Create reusable card components for products/collections

6. **Component Library Planning:**
   - Create UI component inventory to prevent duplication
   - Establish patterns for reusing card designs across multiple sections
   - Define image handling strategy with proper optimization

These foundational steps will address the identified issues by establishing a proper structure, preventing duplication, and setting up optimization patterns from the beginning.

*(Previous content preserved below)*

---

## Collections Section Enhancement Roadmap (5/11/2025)

**Completed Tasks:**
- Implemented collections schema (collections-schema.tsx) for SEO optimization
- Added canonical URL handling with proper directory structure
- Created comprehensive metadata configuration
- Set up error, loading, and not-found states
- Reorganized image placeholder system with WebP format
- Updated OptimizedImage component with improved fallback handling
- Enhanced SEO with JSON-LD structured data
- Implemented proper error boundaries

**Upcoming Tasks:**

1. **Image System Enhancements:**
   - Create automated WebP conversion pipeline
   - Implement intelligent image compression
   - Add support for art direction with multiple image sizes
   - Create automated image optimization CI/CD pipeline

2. **SEO Improvements:**
   - Add collection-specific sitemap generation
   - Implement rich snippets for product collections
   - Create automated metadata generation
   - Add breadcrumb structured data

3. **Performance Optimization:**
   - Implement staggered loading for collection grids
   - Add virtualization for large collections
   - Optimize image preloading strategies
   - Implement progressive image loading

4. **Accessibility:**
   - Add ARIA labels for collection items
   - Implement keyboard navigation
   - Create screen reader optimizations
   - Add high contrast mode support

5. **Analytics Integration:**
   - Add collection view tracking
   - Implement interaction analytics
   - Create performance monitoring
   - Add SEO impact measurement

6. **Testing & Quality:**
   - Create visual regression tests
   - Implement accessibility testing
   - Add performance benchmarking
   - Create automated SEO audits

7. Navigation 
- When adding or reordering navigation items, ensure the dropdown alignment logic is preserved:

  - First item: `left-0`
  - Last item: `right-0`
  - Others: centered

- If new edge cases arise (e.g., more than two edge items), extend the conditional logic accordingly.

- If the theme or color palette changes, verify that `text-foreground` remains readable on all backgrounds.

- If you add more navigation items, check for overflow and adjust dropdown widths as needed.

---

## Mobile Navigation Improvements

### To Do
- [ ] Add touch swipe gesture to close menu
- [ ] Implement close on route change
- [ ] Add loading states for navigation links
- [ ] Implement proper focus management
- [ ] Add keyboard navigation support
- [ ] Implement scroll locking when menu is open
- [ ] Add transition animations for route changes
- [ ] Implement proper error boundaries

### Performance Optimizations
- [ ] Add lazy loading for mega menu content
- [ ] Implement virtual scrolling for long lists
- [ ] Add preloading for common navigation paths
- [ ] Optimize animation performance
- [ ] Add proper image loading strategies

### Accessibility Improvements
- [ ] Add screen reader announcements
- [ ] Implement proper focus trapping
- [ ] Add skip navigation links
- [ ] Improve ARIA labels and roles
- [ ] Add high contrast mode support

---

# Mobile Navigation Roadmap

## Immediate Tasks
- [ ] Add route change menu closing
- [ ] Implement swipe gestures
- [ ] Add loading states for links
- [ ] Fix focus management

## Performance Tasks
- [ ] Add link prefetching
- [ ] Optimize animations
- [ ] Add error boundaries
- [ ] Implement view transitions

## Accessibility Tasks
- [ ] Add screen reader support
- [ ] Improve keyboard navigation
- [ ] Add skip links
- [ ] Enhance ARIA labels

---

# Mobile Navigation Status

## Completed Features
✅ Basic mobile menu structure
✅ Slide and fade animations
✅ Nested navigation with dropdowns
✅ Touch-friendly buttons and spacing
✅ Visual feedback with red accents
✅ Proper z-index handling

## Current Sprint
- [x] Add backdrop blur effect
- [x] Implement ChevronDown animations
- [x] Add hover state transitions
- [x] Improve touch target sizes
- [x] Optimize mobile layout spacing

## Next Steps
1. Animation Improvements
   - [ ] Add spring animations for menu items
   - [ ] Implement staggered animation for list items
   - [ ] Add touch gesture animations
   - [ ] Smooth out transition curves

2. Interaction Enhancements
   - [ ] Add swipe to close
   - [ ] Implement close on route change
   - [ ] Add haptic feedback
   - [ ] Improve scroll behavior

3. Performance Optimizations
   - [ ] Add view transitions API
   - [ ] Optimize animation performance
   - [ ] Implement proper will-change hints
   - [ ] Add intersection observer for long lists

4. Testing & Documentation
   - [ ] Add E2E tests for mobile menu
   - [ ] Document animation parameters
   - [ ] Add performance metrics
   - [ ] Create usage guidelines

---

## URL Structure Refactoring and Link Standardization (Completed: 5/19/2025)

**Objective:** Transition to a consistent, SEO-friendly, top-level URL structure for all product categories, series, and product detail pages, removing `/products/` and `/collections/` prefixes.

**Tasks Accomplished:**

1.  **Product Category Page Refactoring:**
    *   [x] Refactored all product category pages (`chairs`, `desks`, `storage`, `school-furniture`, `hospital-furniture`, `racking-systems`, `storage-solutions`) to utilize the common `e:\steelmadewebsite\components\products\ProductCategoryPageLayout.tsx`.
    *   [x] Updated data fetching logic within each category page to pass necessary props to the shared layout.

2.  **Data Handling and Type Definitions:**
    *   [x] Implemented `getSeriesForCategory` in `e:\steelmadewebsite\lib\api\products.ts`.
    *   [x] Standardized `ProductCategory` type in `e:\steelmadewebsite\types\collections.ts` with hyphenated slugs (e.g., `school-furniture`).
    *   [x] Updated `MOCK_SERIES` and `MOCK_PRODUCTS` in `e:\steelmadewebsite\lib\data\mock-data.ts`.
    *   [x] Resolved type errors, including `SeriesMetadata.coverImage` (ImageAsset vs. string) and schema import issues in `ProductCategoryPageLayout.tsx`, `SeriesCardStatic.tsx`, etc.

3.  **URL Generation Logic (`lib/navigation.ts`):**
    *   [x] Updated `productCategories` mapping with new hyphenated slugs.
    *   [x] Modified `getCategoryUrl` to return `/[categorySlug]` or `/[categorySlug]/[seriesSlug]`.
    *   [x] Modified `getProductUrl` to return `/[categorySlug]/[seriesSlug]/[productSlug]` (signature updated to include `seriesId`).

4.  **Next.js Redirect Configuration (`next.config.js`):**
    *   [x] Removed/updated redirects that conflicted with the new top-level URL strategy.
    *   [x] Ensured `/collections/:category/:seriesId` redirects to `/:category/:seriesId`.
    *   [x] Added redirect from `/products/:category/:seriesId/:productId` to `/:category/:seriesId/:productId`.

5.  **Navigation Link Updates:**
    *   [x] **`CategoryNav.tsx`:** Updated category links to `/${categorySlug}`.
    *   [x] **Mega Menu (`lib/data/navigation.ts`):** Updated all category and series `href`s to absolute top-level paths (e.g., `/[categorySlug]`, `/[categorySlug]/[seriesSlug]`), removing `/products/` prefixes.
    *   [x] **Footer (`components/ui/footer.tsx`):** Updated product links to `/[categorySlug]` and removed "View All" link.

**Pending Actions (Post-Refactor):**

*   [ ] **Thorough Testing:**
    *   [ ] Test all refactored category pages for data display, schema, and responsiveness.
    *   [ ] Test all navigation links (Header mega menu, `CategoryNav`, Footer).
    *   [ ] Verify all links resolve to correct top-level URLs without incorrect prefixes or duplications.
    *   [ ] Check for console errors during navigation and page load.
*   [ ] **Review `getProductUrl` Usage:**
    *   [ ] Ensure `seriesId` is available and correctly passed wherever `getProductUrl` is invoked. Adapt calling components if necessary.

---

## "Modular Furniture" Category Implementation & Testing (Current Focus: 5/20/2025)

**Objective:** Fully integrate and test the new "modular-furniture" category.

**Completed Sub-Tasks:**
*   [x] **Define Types**: Added "modular-furniture" to relevant type definitions (`ProductCategoryKey`, `ProductType`, etc.) in `types/collections.ts` and `types/products.ts`.
*   [x] **Add Mock Data**: Populated `lib/data/mock-data.ts` with `MOCK_SERIES` and `MOCK_PRODUCTS` for "modular-furniture", including "office-modules" and "reception-counters" series.
*   [x] **Create Page Routes**: Generated `page.tsx` files for `/modular-furniture`, `/modular-furniture/[seriesId]`, and `/modular-furniture/[seriesId]/[productId]`.
*   [x] **Enhance Product Service**: Updated `lib/services/product-service.ts` with `getCategoryData`, `getAllProductsInCategory`, and modified `getProductDetails`.
*   [x] **Resolve 404 for `/modular-furniture/office-modules`**: Corrected series ID mismatch in `lib/data/mock-data.ts` (changed "office-workstations" to "office-modules").
*   [x] **Resolve Product Page Module Not Found**: Changed import in `app/modular-furniture/[seriesId]/[productId]/page.tsx` from `ProductDetailsPage` to `ProductPageLayout`.
*   [x] **Fix Product Page Type Errors**: Addressed type errors in `app/modular-furniture/[seriesId]/[productId]/page.tsx` related to metadata, OpenGraph types, and `MOCK_SERIES_DATA` for `ProductPageLayout`.

**Pending Tasks for "modular-furniture":**

*   [ ] **Thorough Testing:**
    *   [ ] Test category page (`/modular-furniture`): Data display, links, breadcrumbs.
    *   [ ] Test series pages (`/modular-furniture/office-modules`, `/modular-furniture/reception-counters`): Data display, links, breadcrumbs.
    *   [ ] Test product pages (e.g., `/modular-furniture/office-modules/single-person-workstation`): Data display, images, links, breadcrumbs, add-to-cart (if applicable).
    *   [ ] Verify all internal links within the modular furniture section are correct.
    *   [ ] Ensure breadcrumb accuracy on all modular furniture pages, especially product pages (confirm `series.title` is fetched and passed to `ProductPageLayout` in `app/modular-furniture/[seriesId]/[productId]/page.tsx`).
*   [ ] **Verify Image Paths:**
    *   [ ] Check all image paths specified in `lib/data/mock-data.ts` for "modular-furniture" products (e.g., `/images/products/modular-furniture/office-modules/single-workstation-01.webp`).
    *   [ ] Ensure all listed image files exist in the `public` directory at the correct paths. If not, add placeholder images or update paths.
*   [ ] **Product Page - Series Data**: 
    *   [ ] Implement actual data fetching for series details in `app/modular-furniture/[seriesId]/[productId]/page.tsx` to replace `MOCK_SERIES_DATA` for `ProductPageLayout` (needed for breadcrumbs, etc.).

**Broader Outstanding Tasks (Pre-existing):**

*   [ ] **Thorough Testing of "storage-solutions"**: Navigation, breadcrumbs, internal links, data display.
*   [ ] **Testing New Series Pages** (`hospital-furniture`, `racking-systems`, `school-furniture`): Verify display and mock data population.
*   [ ] **Address any other remaining Type Errors** across the application.
*   [ ] **SEO Enhancements**: Implement schema markup where appropriate.
*   [ ] **Final Review**: Check against `rules.md` and project guidelines.

---

## SEO Implementation Plan (Site-Wide) (5/20/2025)

**Objective:** Improve search engine visibility, organic traffic, and keyword rankings for the entire SteelMade website. The "modular-furniture" category will serve as the initial pilot for refining implementation steps before site-wide rollout.

**Phase 1: Foundational SEO (Steps 1-3 - Current Focus)**

1.  **Initial SEO Audit & Keyword Research (Site-Wide with "modular-furniture" pilot):**
    *   [ ] **Site-Wide Audit:**
        *   [ ] Analyze current website structure, content, and technical SEO health.
        *   [ ] Identify existing indexed pages and their performance (using Google Search Console if available).
        *   [ ] Review competitor websites for SEO strategies and keyword targets.
    *   [ ] **Keyword Research (for each product category, starting with "modular-furniture"):**
        *   [ ] Identify primary and secondary keywords for each product category, series, and key product types.
        *   [ ] Analyze keyword search volume, difficulty, and relevance.
        *   [ ] Map keywords to specific pages/content areas.
    *   [ ] **Tools to consider:** Google Keyword Planner, SEMrush, Ahrefs, Moz Keyword Explorer, Google Trends.

2.  **On-Page SEO Optimization (Site-Wide with "modular-furniture" pilot):**
    *   [ ] **Content Elements (for each key page - category, series, product):**
        *   [ ] Optimize title tags (unique, keyword-rich, compelling).
        *   [ ] Craft meta descriptions (unique, engaging, include CTAs and keywords).
        *   [ ] Structure content with header tags (H1-H6), ensuring proper H1 usage.
        *   [ ] Optimize body content for target keywords (natural integration, density, LSI keywords).
        *   [ ] Ensure content is high-quality, informative, and provides value to the user.
    *   [ ] **Image Optimization:**
        *   [ ] Use descriptive alt text for all images, incorporating relevant keywords.
        *   [ ] Optimize image file names (descriptive, use hyphens).
        *   [ ] Ensure images are compressed and appropriately sized for web.
    *   [ ] **Internal Linking:**
        *   [ ] Establish a strong internal linking structure, linking relevant pages together.
        *   [ ] Use keyword-rich anchor text for internal links where appropriate.
        *   [ ] Ensure new sections (like "modular-furniture") are well-integrated into the existing site structure.

3.  **Technical SEO (Site-Wide with "modular-furniture" pilot):**
    *   [ ] **Crawlability & Indexability:**
        *   [ ] Verify/update `robots.txt` to ensure search engines can crawl important content and are blocked from irrelevant areas.
        *   [ ] Generate and submit an XML sitemap (`sitemap.ts` or `sitemap.xml`) to search engines; ensure it includes all relevant pages, including new "modular-furniture" pages.
    *   [ ] **Site Speed & Performance:**
        *   [ ] Analyze page load speed (Google PageSpeed Insights, GTmetrix).
        *   [ ] Implement optimizations (image compression, browser caching, minify CSS/JS) as needed.
    *   [ ] **Mobile-Friendliness:**
        *   [ ] Ensure the entire website is responsive and provides a good user experience on mobile devices.
    *   [ ] **Structured Data (Schema Markup):**
        *   [ ] Implement relevant schema markup (e.g., `Product`, `BreadcrumbList`, `Organization`, `WebSite`) on appropriate pages. This is already partially done for collections and should be reviewed/extended.
        *   [ ] Validate structured data using Google's Rich Results Test.
    *   [ ] **HTTPS:** Ensure the entire site uses HTTPS for security.
    *   [ ] **URL Structure:** Confirm URLs are SEO-friendly (readable, use keywords, hyphenated). (Largely addressed in "URL Structure Refactoring").
    *   [ ] **Duplicate Content:** Identify and address any duplicate content issues (e.g., using canonical tags).

**Phase 2: Off-Page & Ongoing SEO (Steps 4-5 - Future Implementation)**

4.  **Off-Page SEO & Content Marketing (Site-Wide):**
    *   [ ] **Link Building Strategy:**
        *   [ ] Identify opportunities for acquiring high-quality backlinks from relevant industry websites, blogs, and directories.
        *   [ ] Consider guest blogging, partnerships, and digital PR.
    *   [ ] **Content Marketing:**
        *   [ ] Develop a content strategy (blog posts, articles, case studies, guides) targeting relevant keywords and user needs.
        *   [ ] Promote content through appropriate channels.
    *   [ ] **Social Media Integration:**
        *   [ ] Leverage social media platforms to share content, engage with audiences, and build brand presence.
    *   [ ] **Local SEO (If applicable):**
        *   [ ] Optimize Google My Business profile.
        *   [ ] Build local citations.

5.  **Monitoring, Analysis & Iteration (Site-Wide):**
    *   [ ] **Setup Analytics:**
        *   [ ] Ensure Google Analytics and Google Search Console are properly configured and tracking data.
    *   [ ] **Regular Monitoring:**
        *   [ ] Track keyword rankings for target terms.
        *   [ ] Monitor organic traffic, user behavior (bounce rate, time on page), and conversions.
        *   [ ] Review Search Console for crawl errors, indexing issues, and manual actions.
    *   [ ] **Reporting & Analysis:**
        *   [ ] Regularly analyze SEO performance data to identify successes and areas for improvement.
    *   [ ] **Iterate & Adapt:**
        *   [ ] Refine SEO strategies based on performance data, algorithm updates, and evolving market trends.
        *   [ ] Continuously look for new keyword opportunities and content ideas.
