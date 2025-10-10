@echo off
echo ===================================
echo Comprehensive Fix Script
echo ===================================
echo.

echo This script will fix all known issues in the codebase:
echo 1. Route parameter naming inconsistencies
echo 2. Product type inconsistencies
echo 3. Director series file issues
echo 4. Windows file permission issues
echo.

echo Step 1: Fixing route parameter issues
echo ------------------------------------
if exist scripts\fix-duplicate-params.js (
  echo Running fix-duplicate-params.js...
  node scripts\fix-duplicate-params.js
) else (
  echo fix-duplicate-params.js not found, skipping.
)

if exist scripts\fix-id-category-conflict.js (
  echo Running fix-id-category-conflict.js...
  node scripts\fix-id-category-conflict.js
) else (
  echo fix-id-category-conflict.js not found, skipping.
)

echo.
echo Step 2: Fixing product type inconsistencies
echo -----------------------------------------
if exist scripts\fix-product-type-imports.js (
  echo Running fix-product-type-imports.js...
  node scripts\fix-product-type-imports.js
) else (
  echo fix-product-type-imports.js not found, skipping.
)

echo.
echo Step 3: Fixing director series file issues
echo ---------------------------------------
if exist scripts\fix-director-series.bat (
  echo Running fix-director-series.bat...
  call scripts\fix-director-series.bat
) else (
  echo fix-director-series.bat not found, skipping.
)

echo.
echo Step 4: Checking for Windows file permission issues
echo ------------------------------------------------
if exist scripts\fix-windows-permissions.js (
  echo Running fix-windows-permissions.js...
  node scripts\fix-windows-permissions.js
) else (
  echo fix-windows-permissions.js not found, skipping.
)

echo.
echo Process completed!
echo Please restart your Next.js development server to apply all changes.
echo.