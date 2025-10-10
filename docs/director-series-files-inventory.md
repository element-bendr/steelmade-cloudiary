# Director Series Files Inventory

This document provides an inventory of Director Series files to help identify which files should be kept and which should be removed.

## Chair Data Files

### Files to Keep

1. **Core Factory Files**:
   - `lib/factories/chairFactory.ts` - Chair factory implementation
   - `components/products/ChairCard.tsx` - Standardized chair card component
   - `components/products/ChairDetail.tsx` - Standardized chair detail component
   - `components/products/ChairPageLayout.tsx` - Standardized page layout

2. **Chair Data Files**:
   - `lib/data/products/chairs/director-series/index-new.ts` - Clean version of the index file
   - `lib/data/products/chairs/director-series/ashley.ts` - Ashley chair data
   - `lib/data/products/chairs/director-series/opera.ts` - Opera chair data
   - `lib/data/products/chairs/director-series/tycoon.ts` - Tycoon chair data
   - `lib/data/products/chairs/director-series/bigboss-gold.ts` - BigBoss Gold chair data
   - `lib/data/products/chairs/director-series/woodland.ts` - Woodland chair data
   - `lib/data/products/chairs/director-series/boston.ts` - Boston chair data

3. **Chair Page Files**:
   - `app/chairs/director-series/page-new.tsx` - New director series page
   - `app/chairs/director-series/ashley/page.tsx` - Ashley chair detail page
   - `app/chairs/director-series/opera/page.tsx` - Opera chair detail page
   - `app/chairs/director-series/tycoon/page.tsx` - Tycoon chair detail page
   - `app/chairs/director-series/bigboss-gold/page.tsx` - BigBoss Gold chair detail page
   - `app/chairs/director-series/woodland/page.tsx` - Woodland chair detail page
   - `app/chairs/director-series/boston/page.tsx` - Boston chair detail page

### Files to Remove

1. **Data Files**:
   - `lib/data/products/chairs/director-series/index.ts` - File with duplicate function definition
   - Any older versions or duplicates of chair data files

2. **Page Files**:
   - `app/chairs/director-series/page.tsx` - Old director series page
   - Any older versions or duplicates of chair detail pages

## Files Update Plan

1. **Rename Files**:
   - Rename `index-new.ts` to `index.ts`
   - Rename `page-new.tsx` to `page.tsx`

2. **Fix Imports**:
   - Update imports in chair data files to reference the correct index.ts
   - Update imports in page files to reference the correct components

## Verification Checklist

After cleanup, verify:

- [ ] No TypeScript errors related to duplicate definitions
- [ ] All chair pages render correctly
- [ ] Director series overview page shows all chairs
- [ ] Chair variant selection works properly
- [ ] Consistent styling across all chair pages