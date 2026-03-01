# Incident/Resolution Beads: CMS Mapping & Routing

## Bead 1: \`FeaturedProduct\` Module Resolution
**Problem**: The homepage crashed due to \`FeaturedProduct\` holding onto a static local import referencing the deleted \`ashley-director-chair/index.ts\`.
**Action Taken**: Refactored \`FeaturedProduct.tsx\` to be a server-side async component fetching dynamically via \`SanityProductService.getProductBySlug("ashley-director-chair")\`.

## Bead 2: Series Sideshow Image Injection (Hero Section Fix)
**Problem**: The Slideshow component under Series Pages (e.g. \`/chairs/director-series\`) rendered a blank hero box. The old statically imported \`ProductSeries\` type assumed a \`coverImage\` at the series-level, which doesn't explicitly exist in the flattened Headless CMS.
**Action Taken**: Modified \`app/[categoryId]/[seriesId]/page.tsx\` to automatically glean the \`coverImage\` from the very first product fetched within that series array (\`seriesProducts[0]?.imageUrl\`) and pass it downward gracefully so the UI template renders properly.

## Bead 3: "Empty Category" 404 Prevention (Dynamic Fallback)
**Problem**: The \`/modular-furniture/privacy-screens\` page crashed with a \`404 not found\` despite Sanity holding multiple privacy screen products tagged to \`modular-furniture\`. 
**Cause**: The top-level Sanity category document (\`_type == "category"\`) for \`modular-furniture\` had not been created. The \`SanityProductService\` strictly checked for this document and returned \`null\` if missing, resulting in Next.js throwing a \`404\`.
**Action Taken**: Rewrote the resolution logic inside \`lib/services/sanity-product-service.ts\` to act as a fallback safety-net. If the category document is missing, but child products *do* exist, the service dynamically spins up a Proxy Category object (auto-capitalizing the route parameter strings into a synthesized UI display name). This immediately solved the 404s and permanently protects the CMS-to-Frontend tunnel from data omission errors going forward.

## Bead 4: Product Detail Breadcrumb & Layout Refactor
**Problem**: Individual product detail pages crashed at runtime or returned 404s due to undefined route segment strings used inside `ProductDetailLayout.tsx`. Next.js 14 server components stripped the nested `category` and `seriesId` strings out of the inner `product` interface when queried from the new Sanity backend map, causing legacy UI logic in the Product Layout to break during rendering.
**Action Taken**: Modified the `ProductDetailLayout.tsx` and nested `[productId]/page.tsx` mapping to correctly pipe down the `categoryId` and `seriesId` variables as explicit React props. Rewrote the breadcrumb generation block within the layout to utilize these dynamic parameters, gracefully restoring the detail page without crashing, removing reliance on previous static hard-coded mappings.
