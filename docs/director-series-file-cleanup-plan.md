# Director Series File Cleanup Plan

## Overview

This document outlines the specific files to keep and remove during the cleanup of the Director Series implementation.

## Files to Keep

### Core Files

1. **Factory Files**:
   - `lib/factories/chairFactory.ts`

2. **Component Files**:
   - `components/products/ChairCard.tsx`
   - `components/products/ChairDetail.tsx`
   - `components/products/ChairPageLayout.tsx`

3. **Index File**:
   - `lib/data/products/chairs/director-series/index-fixed.ts` (to be renamed to index.ts)

4. **Chair Data Files**:
   - `lib/data/products/chairs/director-series/ashley.ts`
   - `lib/data/products/chairs/director-series/opera.ts`
   - `lib/data/products/chairs/director-series/tycoon.ts`
   - `lib/data/products/chairs/director-series/bigboss-gold.ts`
   - `lib/data/products/chairs/director-series/woodland.ts`
   - `lib/data/products/chairs/director-series/boston.ts`

5. **Chair Page Files**:
   - `app/chairs/director-series/page-new.tsx` (to be renamed to page.tsx)
   - `app/chairs/director-series/ashley/page.tsx`
   - `app/chairs/director-series/opera/page.tsx`
   - `app/chairs/director-series/tycoon/page.tsx`
   - `app/chairs/director-series/bigboss-gold/page.tsx`
   - `app/chairs/director-series/woodland/page.tsx`
   - `app/chairs/director-series/boston/page.tsx`

## Files to Remove/Replace

1. **Replace with Fixed Version**:
   - `lib/data/products/chairs/director-series/index.ts` → Replace with index-fixed.ts
   - `app/chairs/director-series/page.tsx` → Replace with page-new.tsx

2. **Temporary Files to Remove**:
   - `lib/data/products/chairs/director-series/index-clean.ts`
   - `lib/data/products/chairs/director-series/index-new.ts`
   - Any other temporary/backup files

## Cleanup Process

1. **Preparation**:
   - Create a backup branch
   - Test the application with existing files

2. **Replacement**:
   - Rename index-fixed.ts to index.ts (after backing up the original)
   - Rename page-new.tsx to page.tsx (after backing up the original)

3. **Removal**:
   - Remove any temporary/backup files

4. **Verification**:
   - Test the application with the new files
   - Verify all chairs are displayed correctly
   - Check for any TypeScript errors

## Expected Outcome

After the cleanup:

1. The application should build without TypeScript errors
2. The director series page should display all chairs with consistent styling
3. Each chair detail page should function correctly
4. The codebase should be cleaner and easier to maintain