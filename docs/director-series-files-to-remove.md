# Director Series Files to Remove

This document identifies files that should be removed as part of the director series cleanup (Task 27.12).

## Temporary Files

1. **Index File Backups and Alternates**:
   - `e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\index-fixed.ts` - Replaced by the fixed index.ts
   - `e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\index-clean.ts` - No longer needed
   - `e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\index-new.ts` - No longer needed
   - `e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\index.ts.bak` - Backup file

2. **Page File Backups and Alternates**:
   - `e:\steelmade-cloudiary-chairs\app\chairs\director-series\page-new.tsx` - Replaced by the new page.tsx
   - `e:\steelmade-cloudiary-chairs\app\chairs\director-series\page.tsx.bak` - Backup file

## Removal Process

These files can be safely removed using the following process:

1. Verify the application builds and runs correctly with the new implementations
2. Remove the files one by one, testing after each removal
3. Document any issues encountered

## Verification Steps

After removing these files, verify:

- The application builds without errors
- The director series page displays all chairs correctly
- Individual chair pages render properly
- Chair variant selection works as expected

## Safety Precautions

- Ensure all files are committed to version control before removal
- Consider maintaining backups for a short period (1-2 weeks) until confident in the new implementation