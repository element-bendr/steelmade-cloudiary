# Duplicate File Removal Instructions

This document provides instructions for removing the duplicate files identified in the duplicate-files-report.md.

## Before You Begin

1. Ensure you have committed your current work to git
2. Create a new branch for this operation:
   ```
   git checkout -b cleanup/remove-duplicate-files
   ```
3. Review the duplicate-files-report.md to understand which files will be removed

## Option 1: Automated Removal (Recommended)

We've created scripts to help with the removal process. Choose the script that matches your operating system:

### Windows

1. Open a command prompt in the project root directory
2. Run the batch script to remove all duplicates at once:
   ```
   scripts\remove-all-duplicates.bat
   ```

This will:
- Create backups of all removed files in the "removed-duplicates-backup" directory
- Remove the duplicate files
- Update the removed-files-log.md with details

### PowerShell (Individual Files)

To remove files one by one with more control:

1. Open PowerShell in the project root directory
2. Run the script for each file you want to remove:
   ```
   .\scripts\Remove-DuplicateFile.ps1 -DuplicateFile "lib\data\products\chairs\director-series\index-fixed.ts" -OriginalFile "lib\data\products\chairs\director-series\index.ts"
   ```

### Linux/Mac

1. Open a terminal in the project root directory
2. Make the script executable:
   ```
   chmod +x scripts/remove-duplicate-file.sh
   ```
3. Run the script for each file you want to remove:
   ```
   ./scripts/remove-duplicate-file.sh lib/data/products/chairs/director-series/index-fixed.ts lib/data/products/chairs/director-series/index.ts
   ```

## Option 2: Manual Removal

If you prefer to remove files manually:

1. For each file in duplicate-files-report.md:
   a. Check if the file is imported anywhere in the codebase:
      ```
      node scripts/find-imports.js lib/data/products/chairs/director-series/index-fixed.ts
      ```
   b. If imports are found, update them to use the original file
   c. Create a backup of the file
   d. Remove the file using `rm` or `del`
   e. Update the removed-files-log.md with the details

## After Removal

1. Run TypeScript compiler to check for errors:
   ```
   npm run tsc
   ```
   or
   ```
   npx tsc --noEmit
   ```

2. Build the application to verify it builds successfully:
   ```
   npm run build
   ```

3. Run the application and test functionality:
   ```
   npm run dev
   ```

4. Commit the changes:
   ```
   git add .
   git commit -m "Remove duplicate files to consolidate codebase"
   ```

5. Push your branch and create a pull request:
   ```
   git push origin cleanup/remove-duplicate-files
   ```

## Safety Measures

- All removed files are backed up in the "removed-duplicates-backup" directory
- The scripts check for imports before removing files
- The removal process is documented in removed-files-log.md

## Troubleshooting

If you encounter issues after removing files:

1. Check the backup directory for the original file
2. Restore the file if needed:
   ```
   copy removed-duplicates-backup\index-fixed.ts_20230101_120000.bak lib\data\products\chairs\director-series\index-fixed.ts
   ```
3. Check the console for import errors that might point to files still referencing the removed files