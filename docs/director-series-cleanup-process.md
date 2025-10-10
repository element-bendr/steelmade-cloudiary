# Director Series Cleanup Process

## Purpose

This document outlines the process for cleaning up the Director Series implementation to resolve duplicate function definitions and remove unwanted files.

## Current Issues

1. Duplicate function definition for `registerDirectorChair` in index.ts
2. Multiple chair implementations with inconsistent styling
3. Potential circular dependencies between files

## Cleanup Plan

### 1. Fix the Index File

The current index.ts file contains duplicate function definitions which is causing TypeScript errors. We will:

1. Create a clean index.ts file with a single definition of each function
2. Ensure proper imports and exports
3. Test the functionality to make sure chairs can still be registered

### 2. Remove Unwanted Files

We will remove the following types of files:

1. Duplicate chair data files
2. Old implementation files that are no longer used
3. Files with inconsistent styling or implementation patterns
4. Temporary or backup files

### 3. Inventory of Files to Remove

- Old chair implementations in lib/data/products/chairs/director-series/
- Outdated chair detail pages in app/chairs/director-series/
- Any temporary files created during development

### 4. Backup Strategy

Before removing any files:

1. Create a backup branch in git
2. Document the current structure and dependencies
3. Ensure we have proper documentation of the chairs in director-series-chair-inventory.md

### 5. Verification Process

After removing files:

1. Verify that the application builds without errors
2. Check that all chair pages still render correctly
3. Ensure consistent styling across all chairs
4. Test chair variant selection functionality

## Implementation Steps

1. Fix the index.ts file
2. Create a backup branch
3. Remove unwanted chair data files
4. Remove unused chair page files
5. Verify application functionality
6. Update documentation