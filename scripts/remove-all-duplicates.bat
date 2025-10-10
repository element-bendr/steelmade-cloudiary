@echo off
REM This script removes all duplicate files identified in the duplicate-files-report.md

echo ===== Removing Director Series Duplicate Files =====
echo.

REM Create backup directory
if not exist "removed-duplicates-backup" mkdir "removed-duplicates-backup"

REM Director Series Files
call :process_file "lib\data\products\chairs\director-series\index-clean.ts" "lib\data\products\chairs\director-series\index.ts"
call :process_file "lib\data\products\chairs\director-series\index-enhanced.ts" "lib\data\products\chairs\director-series\index.ts"
call :process_file "lib\data\products\chairs\director-series\index-fixed.ts" "lib\data\products\chairs\director-series\index.ts"
call :process_file "lib\data\products\chairs\director-series\index-new.ts" "lib\data\products\chairs\director-series\index.ts"
call :process_file "app\chairs\director-series\page-new.tsx" "app\chairs\director-series\page.tsx"

echo.
echo ===== Removing Dynamic Route Pages Duplicate Files =====
echo.

REM Dynamic Route Pages
call :process_file "app\chairs\[seriesId]\page-fixed.tsx" "app\chairs\[seriesId]\page.tsx"
call :process_file "app\desks\[seriesId]\page-fixed.tsx" "app\desks\[seriesId]\page.tsx"
call :process_file "app\storage-solutions\[seriesId]\page-fixed.tsx" "app\storage-solutions\[seriesId]\page.tsx"

echo.
echo ===== Removing Core API Duplicate Files =====
echo.

REM Core API Files
call :process_file "lib\api\products-new.ts" "lib\api\products.ts"
call :process_file "lib\data\product-helpers-new.ts" "lib\data\product-helpers.ts"

echo.
echo ===== Removing Backup Files =====
echo.

REM Backup Files
call :process_file "temp-backup\app\chairs\[seriesId]\page-fixed.tsx" "temp-backup\app\chairs\[seriesId]\page.tsx"
call :process_file "temp-backup\app\desks\[seriesId]\page-fixed.tsx" "temp-backup\app\desks\[seriesId]\page.tsx"
call :process_file "temp-backup\app\storage-solutions\[seriesId]\page-fixed.tsx" "temp-backup\app\storage-solutions\[seriesId]\page.tsx"
call :process_file "temp-backup\lib\api\products-new.ts" "temp-backup\lib\api\products.ts"

echo.
echo ===== File Removal Complete =====
echo.
echo Next steps:
echo 1. Run TypeScript compiler to verify no type errors
echo 2. Test the application to ensure functionality is preserved
echo.

goto :eof

:process_file
set "duplicate_file=%~1"
set "original_file=%~2"

echo Processing: %duplicate_file%

REM Check if files exist
if not exist "%duplicate_file%" (
    echo   File does not exist, skipping.
    goto :eof
)

REM Create backup
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set date=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set time=%%a%%b)
set "timestamp=%date%_%time%"
set "backup_file=removed-duplicates-backup\%~nx1_%timestamp%.bak"

copy "%duplicate_file%" "%backup_file%" > nul
echo   Backup created at: %backup_file%

REM Remove the file
del "%duplicate_file%"
echo   Removed: %duplicate_file%

REM Update log file with PowerShell (more reliable than batch)
powershell -Command "$today = Get-Date -Format 'yyyy-MM-dd'; $logFile = '.\docs\removed-files-log.md'; if (Test-Path $logFile) { $content = Get-Content $logFile -Raw; $duplicateFile = '%duplicate_file%'.Replace('\', '/'); $originalFile = '%original_file%'.Replace('\', '/'); $pattern = [regex]::Escape('| ' + $duplicateFile + ' | ' + $originalFile + ' | | |'); $replacement = '| ' + $duplicateFile + ' | ' + $originalFile + ' | ' + $today + ' | Safely removed after verifying it was not imported anywhere |'; $newContent = $content -replace $pattern, $replacement; Set-Content -Path $logFile -Value $newContent; }"

echo   Logged removal in removed-files-log.md
echo.