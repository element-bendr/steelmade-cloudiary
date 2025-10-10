# This script safely removes duplicate files after ensuring they are not imported anywhere

# Usage: .\Remove-DuplicateFile.ps1 -DuplicateFile <file-path> -OriginalFile <original-file-path>
# Example: .\Remove-DuplicateFile.ps1 -DuplicateFile "lib\data\products\chairs\director-series\index-fixed.ts" -OriginalFile "lib\data\products\chairs\director-series\index.ts"

param(
    [Parameter(Mandatory=$true)]
    [string]$DuplicateFile,
    
    [Parameter(Mandatory=$true)]
    [string]$OriginalFile
)

# Check if files exist
if (-not (Test-Path $DuplicateFile)) {
    Write-Error "Error: Duplicate file does not exist: $DuplicateFile"
    exit 1
}

if (-not (Test-Path $OriginalFile)) {
    Write-Error "Error: Original file does not exist: $OriginalFile"
    exit 1
}

# Get base names for logs
$DuplicateBase = Split-Path $DuplicateFile -Leaf
$OriginalBase = Split-Path $OriginalFile -Leaf

Write-Host "===== Checking for imports of $DuplicateFile =====" -ForegroundColor Cyan

# Find all potential imports of the duplicate file
$ImportPath = ($DuplicateFile -replace '\.[^.]*$', '') -replace '\\', '/'
$FilesToSearch = Get-ChildItem -Path . -Recurse -Include *.ts, *.tsx, *.js, *.jsx | Where-Object { 
    $_.FullName -notmatch "node_modules" -and 
    $_.FullName -notmatch "\.git" -and 
    $_.FullName -notmatch "\.next" -and 
    $_.FullName -notmatch "build" -and 
    $_.FullName -notmatch "dist"
}

$ImportsFound = $false
foreach ($File in $FilesToSearch) {
    $Content = Get-Content $File.FullName -Raw
    if ($Content -match "from\s+[`"'].*$ImportPath[`"']") {
        $ImportsFound = $true
        Write-Host "Found import in: $($File.FullName)" -ForegroundColor Yellow
        $Matches = Select-String -Path $File.FullName -Pattern "from\s+[`"'].*$ImportPath[`"']" -AllMatches
        foreach ($Match in $Matches) {
            Write-Host "  Line $($Match.LineNumber): $($Match.Line.Trim())" -ForegroundColor Yellow
        }
    }
}

if ($ImportsFound) {
    Write-Host ""
    Write-Host "WARNING: File appears to be imported in other files." -ForegroundColor Red
    Write-Host "Please update these imports to use $OriginalFile before removing." -ForegroundColor Red
    Write-Host "Operation aborted for safety." -ForegroundColor Red
    exit 1
} else {
    Write-Host "No imports found. Safe to remove." -ForegroundColor Green
}

# Create backup directory if it doesn't exist
$BackupDir = ".\removed-duplicates-backup"
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

# Backup the file before removal
$Timestamp = Get-Date -Format "yyyyMMddHHmmss"
$BackupFile = "$BackupDir\${DuplicateBase}_${Timestamp}.bak"
Copy-Item $DuplicateFile $BackupFile
Write-Host "Backup created at: $BackupFile" -ForegroundColor Green

# Remove the file
Remove-Item $DuplicateFile
Write-Host "Removed: $DuplicateFile" -ForegroundColor Green

# Update the removed files log
$LogFile = ".\docs\removed-files-log.md"
if (Test-Path $LogFile) {
    $Today = Get-Date -Format "yyyy-MM-dd"
    $LogContent = Get-Content $LogFile -Raw
    $DuplicateFileFormatted = $DuplicateFile.Replace('\', '/')
    $OriginalFileFormatted = $OriginalFile.Replace('\', '/')
    $Pattern = "\| $DuplicateFileFormatted \| $OriginalFileFormatted \| +\| +\|"
    $Replacement = "| $DuplicateFileFormatted | $OriginalFileFormatted | $Today | Safely removed after verifying no imports reference it |"
    $NewLogContent = $LogContent -replace $Pattern, $Replacement
    Set-Content -Path $LogFile -Value $NewLogContent
    Write-Host "Updated removal log in $LogFile" -ForegroundColor Green
} else {
    Write-Host "Warning: Could not find removed-files-log.md to update" -ForegroundColor Yellow
}

Write-Host "===== File removal complete =====" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run TypeScript compiler to verify no type errors" -ForegroundColor Cyan
Write-Host "2. Test the application to ensure functionality is preserved" -ForegroundColor Cyan