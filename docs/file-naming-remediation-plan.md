# File Naming Remediation Plan

This document outlines the plan for addressing file naming issues identified in the file-naming-issues.md report.

## Identified Issues Overview

Based on the file-naming-issues.md report, we've identified several categories of naming issues:

1. **Temporary Files**: Files with `-new`, `-fixed`, `-clean`, or `-enhanced` suffixes
2. **Inconsistent Casing**: Mismatch between file purpose and naming convention
3. **Location Issues**: Files that don't follow the conventions for their specific directory
4. **Version Indicators**: Files with version numbers in their names

## Remediation Approach

We'll take the following structured approach to resolve these issues:

### Phase 1: Consolidate Remaining Temporary Files

1. **Identify Temporary Files**:
   - Check for any remaining files with `-new`, `-fixed`, etc. suffixes
   - Compare with the original/canonical files
   - Determine if they contain unique functionality that should be preserved

2. **Consolidation Process**:
   - Enhance the canonical file with any necessary functionality from the temporary version
   - Use the `find-imports.js` script to identify any imports of the temporary file
   - Update those imports to point to the canonical file
   - Add the temporary file to the removed-files-log.md
   - Remove the temporary file

### Phase 2: Rename Files with Inconsistent Casing

1. **React Components**:
   - Rename files to PascalCase (e.g., `button.jsx` → `Button.jsx`)
   - Update all imports referencing these files

2. **Utility Files**:
   - Rename to kebab-case (e.g., `stringUtils.ts` → `string-utils.ts`)
   - Update all imports referencing these files

3. **Next.js Pages**:
   - Ensure page files follow Next.js conventions (e.g., `Page.tsx` → `page.tsx`)
   - Update any imports if necessary

### Phase 3: Fix Files in Incorrect Locations

1. **Relocate Files**:
   - Move files to the appropriate directories based on their purpose
   - Update all imports referencing these files
   - Test thoroughly after each move

### Phase 4: Remove Version Indicators

1. **Remove Version Numbers**:
   - Rename files to remove version indicators (e.g., `utils-v2.ts` → `utils.ts`)
   - Consolidate functionality if multiple versions exist
   - Update all imports referencing these files

## Implementation Guidelines

For each file that needs to be renamed:

1. **Create a Branch**:
   ```
   git checkout -b fix/file-naming-[category]
   ```

2. **Check for Imports**:
   ```
   node scripts/find-imports.js [file-path]
   ```

3. **Rename Files**:
   - Use git mv to preserve history:
   ```
   git mv [old-path] [new-path]
   ```

4. **Update Imports**:
   - Carefully update all import references
   - Use search and replace with caution

5. **Test Thoroughly**:
   ```
   npm run test
   npm run build
   npm run dev
   ```

6. **Commit Changes**:
   ```
   git add .
   git commit -m "Fix file naming: [details]"
   ```

7. **Update Documentation**:
   - Add entry to CHANGELOG.md
   - Update removed-files-log.md if files were removed
   - Create a renamed-files-log.md to track renamed files

## Verification

After completing all phases:

1. **Run the Linter Again**:
   ```
   node scripts/lint-file-names.js
   ```

2. **Compare Results**:
   - Verify that the number of issues has decreased
   - Address any new issues that may have been introduced

3. **Complete Final Testing**:
   - Run comprehensive tests to ensure no functionality was broken
   - Check for any console errors or warnings

## Timeline

- **Phase 1**: Consolidate Temporary Files - 1 day
- **Phase 2**: Rename Files with Inconsistent Casing - 1 day
- **Phase 3**: Fix Files in Incorrect Locations - 1 day
- **Phase 4**: Remove Version Indicators - 1 day
- **Verification and Documentation**: 1 day

## Status Tracking

We'll track the status of each file in a spreadsheet with the following columns:
- File Path
- Issue Type
- Required Action
- New File Path
- Status (Pending, In Progress, Completed)
- Imports Updated (Yes/No)
- Tested (Yes/No)
- Notes