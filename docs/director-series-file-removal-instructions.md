# Director Series File Removal Instructions

This document provides step-by-step instructions for safely removing temporary and backup files from the Director Series implementation.

## Prerequisites

Before proceeding, ensure:

1. The application builds without errors
2. All chair pages display correctly
3. All changes are committed to version control
4. You have reviewed the files-to-remove.md document

## File Removal Process

### Step 1: Create a New Branch

```bash
git checkout -b cleanup/remove-temp-files
```

### Step 2: Remove Index File Alternates

Remove the following files one by one:

```bash
# Remove fixed index file (already replaced original)
rm lib/data/products/chairs/director-series/index-fixed.ts

# Remove clean index file (no longer needed)
rm lib/data/products/chairs/director-series/index-clean.ts

# Remove new index file (if exists)
rm lib/data/products/chairs/director-series/index-new.ts
```

### Step 3: Test Application

After removing index file alternates:

1. Build the application
2. Verify it runs without errors
3. Check that the director series page loads correctly

### Step 4: Remove Page File Alternates

Remove the following files:

```bash
# Remove new page file (already replaced original)
rm app/chairs/director-series/page-new.tsx
```

### Step 5: Test Application Again

1. Build the application
2. Verify all pages load correctly
3. Test chair variant selection

### Step 6: Remove Backup Files

**Note**: Only remove backup files if you're confident everything is working correctly.

```bash
# Remove index backup
rm lib/data/products/chairs/director-series/index.ts.bak

# Remove page backup
rm app/chairs/director-series/page.tsx.bak
```

### Step 7: Final Testing

Perform a complete verification using the director-series-verification-checklist.md checklist.

## Rollback Procedure

If any issues are encountered:

1. Restore from backup files if available:
   ```bash
   cp lib/data/products/chairs/director-series/index.ts.bak lib/data/products/chairs/director-series/index.ts
   cp app/chairs/director-series/page.tsx.bak app/chairs/director-series/page.tsx
   ```

2. If backups are already removed, revert to the previous git commit:
   ```bash
   git checkout HEAD~1 -- lib/data/products/chairs/director-series/index.ts
   git checkout HEAD~1 -- app/chairs/director-series/page.tsx
   ```

## Commit Changes

After successful removal and testing:

```bash
git add .
git commit -m "Remove temporary and backup files from Director Series"
git push origin cleanup/remove-temp-files
```

## Post-Removal Steps

1. Mark Task 27.12 as completed in task-master-ai.json
2. Update the documentation to reflect the current state
3. Create a pull request to merge the cleanup branch