@echo off
echo ===================================
echo Next.js Route Parameters Fix Helper
echo ===================================
echo.

echo This script will help you fix route parameter naming issues
echo even when you encounter permission errors on Windows.
echo.

echo Step 1: Check for permission issues
echo -----------------------------------
node scripts\fix-windows-permissions.js
echo.

echo Step 2: Update parameter names in code without renaming directories
echo ------------------------------------------------------------------
node scripts\update-params-without-renaming.js
echo.

echo Step 3: Attempt to rename directories (optional)
echo -----------------------------------------------
echo Do you want to attempt to rename the directories? (Y/N)
set /p RENAME=

if /i "%RENAME%"=="Y" (
  echo.
  echo Attempting to rename directories...
  node scripts\fix-permissions-rename.js
) else (
  echo.
  echo Skipping directory renaming.
  echo You can run 'node scripts\fix-permissions-rename.js' later if needed.
)

echo.
echo Process completed!
echo Please restart your Next.js development server to apply changes.
echo.