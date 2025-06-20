# Director Series Cleanup - Sequential Implementation Guide

This document provides a step-by-step guide for implementing the Director Series cleanup process.

## Phase 1: Preparation and Backup

### Step 1: Create a Backup Branch
```bash
git checkout -b backup/director-series-cleanup
git add .
git commit -m "Create backup before Director Series cleanup"
git checkout main
```

### Step 2: Document Current State
- Capture a list of all existing chair files
- Document any current errors or issues for reference

## Phase 2: Fix Duplicate Function Issue

### Step 1: Implement Fixed Index File
- Create a new `index-fixed.ts` file with clean implementation
- Ensure single function definitions
- Add clear documentation
- Include explicit imports for all chair files

### Step 2: Verify Fixed Index File
- Create a test file that imports from the fixed index file
- Ensure all chairs are registered correctly
- Check for any TypeScript errors

### Step 3: Replace Original Index File
```bash
# Backup original file
cp lib/data/products/chairs/director-series/index.ts lib/data/products/chairs/director-series/index.ts.bak

# Replace with fixed version
cp lib/data/products/chairs/director-series/index-fixed.ts lib/data/products/chairs/director-series/index.ts
```

## Phase 3: Fix Director Series Page

### Step 1: Create a Clean Page Implementation
- Create a new page-new.tsx with direct chair imports
- Implement consistent styling
- Use the ChairCard component for all chairs

### Step 2: Replace Original Page File
```bash
# Backup original file
cp app/chairs/director-series/page.tsx app/chairs/director-series/page.tsx.bak

# Replace with new version
cp app/chairs/director-series/page-new.tsx app/chairs/director-series/page.tsx
```

## Phase 4: Verification

### Step 1: Test the Application
- Run the build process
- Check for any TypeScript errors
- Verify the director series page loads correctly
- Test each individual chair page

### Step 2: Verify Chair Functionality
- Test variant selection on each chair page
- Verify images load correctly
- Check responsive behavior

## Phase 5: Cleanup

### Step 1: Remove Temporary Files
```bash
# Remove temporary files
rm lib/data/products/chairs/director-series/index-fixed.ts
rm lib/data/products/chairs/director-series/index-clean.ts
rm lib/data/products/chairs/director-series/index-new.ts
rm app/chairs/director-series/page-new.tsx
```

### Step 2: Remove Backup Files (optional)
```bash
# Remove backup files if everything works correctly
rm lib/data/products/chairs/director-series/index.ts.bak
rm app/chairs/director-series/page.tsx.bak
```

## Phase 6: Documentation

### Step 1: Update Task Status
- Mark tasks as completed in the task-master-ai.json file
- Add completion details

### Step 2: Document the Process
- Create a summary of the cleanup process
- Document any issues encountered and solutions
- Update development guidelines to prevent similar issues

## Implementation Checklist

- [ ] Create backup branch
- [ ] Create fixed index file
- [ ] Test fixed index file
- [ ] Replace original index file
- [ ] Create new director series page
- [ ] Replace original page file
- [ ] Verify build process
- [ ] Test all chair pages
- [ ] Remove temporary files
- [ ] Update documentation
- [ ] Update task status