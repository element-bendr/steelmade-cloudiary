# File Consolidation Plan

This document outlines the plan for consolidating and removing duplicate files identified by the find-duplicate-files.js script.

## Prioritized Consolidation Plan

We'll approach the consolidation in groups, starting with the most critical files first:

### Group 1: Director Series Files (Highest Priority)
- `lib/data/products/chairs/director-series/index-clean.ts`
- `lib/data/products/chairs/director-series/index-enhanced.ts`
- `lib/data/products/chairs/director-series/index-fixed.ts`
- `lib/data/products/chairs/director-series/index-new.ts`
- `app/chairs/director-series/page-new.tsx`

### Group 2: Dynamic Route Pages
- `app/chairs/[seriesId]/page-fixed.tsx`
- `app/desks/[seriesId]/page-fixed.tsx`
- `app/storage-solutions/[seriesId]/page-fixed.tsx`

### Group 3: Core API Files
- `lib/api/products-new.ts`
- `lib/data/product-helpers-new.ts`

### Group 4: Backup Files (Lower Priority)
- `temp-backup/app/chairs/[seriesId]/page-fixed.tsx`
- `temp-backup/app/desks/[seriesId]/page-fixed.tsx`
- `temp-backup/app/storage-solutions/[seriesId]/page-fixed.tsx`
- `temp-backup/lib/api/products-new.ts`

## Consolidation Process

For each file, we'll follow this process:

1. **Review & Compare**: Compare the duplicate with the original to identify any unique improvements
2. **Enhance Original**: Apply any necessary improvements to the original file
3. **Update Imports**: Find and fix any imports that reference the duplicate file
4. **Mark for Removal**: Add a deprecation notice to the duplicate file
5. **Remove**: Remove the duplicate file after verifying no imports reference it
6. **Test**: Test the application to ensure everything works as expected

## Implementation Timeline

| Group | Start Date | Target Completion | Status |
|-------|------------|-------------------|--------|
| Group 1 | Today | Today | In Progress |
| Group 2 | Today | Today | Not Started |
| Group 3 | Today | Today | Not Started |
| Group 4 | Today | Today | Not Started |

## Import Fixing Approach

For each file being removed, we'll:

1. Use grep or similar tool to find all imports of the file
2. Update each import to reference the canonical file
3. Test each affected component after import changes

## Testing Strategy

After consolidating each group:

1. Run the TypeScript compiler to check for type errors
2. Build the application to check for build errors
3. Test affected functionality in the browser
4. Verify console has no errors related to the changes