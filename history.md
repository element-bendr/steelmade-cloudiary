# Project History Log

## February 28, 2026: Initiation of Sanity CMS Migration
- **Context**: The existing system heavily relied on staticly-typed TypeScript objects for the product catalog. While declarative and performant initially, this approach has hit scaling ceilings and creates an operational bottleneck (non-technical users cannot update products).  
- **Action**: Created a safe working branch (`feature/sanity-cms-migration`) to transition from hardcoded TS mappings to Sanity.io. We are moving towards a Headless architecture. Cloudinary images will remain stored externally, but the pointers/URLs will now be sourced from Sanity.
- **Goals**: Keep the existing site intact on `main`. Integrate Sanity Studio, design initial schemas, run a programmatic TS-to-Sanity data migration, rewrite frontend components to use GROQ, and implement webhook-based ISR cache invalidations.

### Feb 28, 2026 - Phase 3 & 4 Completion
- Corrected the \`migrate-to-sanity.ts\` script by migrating to \`import\` syntax and ran via \`tsx\`.
- Deployed 76 categories, series, and product documents directly to the Sanity Studio Data Lake using batch operations for fast upload speeds.
- Implemented \`SanityProductRepository\` that fetches mapped arrays of ExtendedProductData directly querying Sanity with GROQ.
- Handled backwards compatibility for the \`getCategory()\` static method by creating an async function used by Next.js Server Components.
- Completed full integration cycle; UI seamlessly populates dynamic chair data from the Cloudinary and Sanity links combined!
- Updated Phase 5 to include manual webhook triggers.

### March 2, 2026 - Sanity Data Parity & Dynamic Routing Preparations
- **Context**: Embedded Sanity Studio was crashing the Next.js frontend due to deeply nested `<html><body>` tags and Server-Side Rendering (SSR) discrepancies. Hardcoded static TypeScript routes (`/chairs`, `/desks`) were creating a split "dual source of truth" conflict within the architecture.
- **Action**: Fixed the React Hydration error by disabling SSR for `<NextStudio />` dynamically, created an isolated `layout.tsx` for the `/studio` segment, and verified local Sanity API auth. Programmatically migrated all 140+ full catalog product variants including Cloudinary specifications to Sanity. 
- **Next Steps**: Formalized the initiation of the "Architecture Alignment Phase" to rip out the hardcoded TypeScript data dependencies entirely. We are pivoting to fully decoupled, 100% dynamic `app/[categoryId]` App Router segmenting.
