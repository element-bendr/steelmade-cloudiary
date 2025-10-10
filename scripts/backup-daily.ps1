# Daily backup script for feature/template-refactoring -> feature/template-refactoring-backup
# Run this in PowerShell (pwsh) from repository root or via CI scheduled task.
# Usage: ./scripts/backup-daily.ps1

param(
  [string]$SourceBranch = 'feature/template-refactoring',
  [string]$BackupBranch = 'feature/template-refactoring-backup'
)

Write-Host "Starting daily backup: $SourceBranch -> $BackupBranch"

# Ensure we're at repo root
$repoRoot = (Get-Location).Path
if (-not (Test-Path "$repoRoot\.git")) {
  Write-Error "This script must be run from the repository root (where .git lives)."
  exit 1
}

# Fetch latest
git fetch origin

# Ensure source branch exists locally
$sourceExists = git rev-parse --verify $SourceBranch 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Source branch '$SourceBranch' not found locally. Please create or fetch it first."
  exit 1
}

# Create or reset backup branch
Write-Host "Updating backup branch '$BackupBranch' to match '$SourceBranch'"

git branch -D $BackupBranch 2>$null | Out-Null
git checkout -b $BackupBranch $SourceBranch

# Tag with date
$tagName = "backup-$(Get-Date -Format yyyyMMdd)"
Write-Host "Creating tag: $tagName"
git tag -a $tagName -m "Daily backup $((Get-Date).ToString('yyyy-MM-dd'))"

# Push backup branch and tags
Write-Host "Pushing backup branch and tags to origin"
git push --force-with-lease origin $BackupBranch
git push origin --tags

# Return to source branch
git checkout $SourceBranch

Write-Host "Backup complete: $SourceBranch -> $BackupBranch (tag: $tagName)"
