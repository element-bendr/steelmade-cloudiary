<#
Creates the feature/template-refactoring branches and pushes them to origin safely.
Run from repository root in pwsh.
#>
param(
  [switch]$SkipPush
)

function Fail([string]$msg) { Write-Error $msg; exit 1 }

if (-not (Test-Path ".git")) { Fail "This script must be run from the repository root (.git not found)." }

# Ensure credentials - attempt a minimal git ls-remote check
try {
  git ls-remote --exit-code origin 2>$null | Out-Null
} catch {
  Write-Warning "Cannot reach remote 'origin' or no permissions. Ensure git remote origin exists and you have push access." 
}

$branches = @(
  'feature/template-refactoring',
  'feature/template-refactoring-backup',
  'feature/template-refactoring-staging'
)

# Create feature branch from current HEAD if not exists
& git rev-parse --verify ${branches[0]} > $null 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "Branch ${branches[0]} already exists locally. Skipping creation."
} else {
  git checkout -b ${branches[0]}
  if ($LASTEXITCODE -ne 0) { Fail "Failed to create ${branches[0]}" }
  Write-Host "Created ${branches[0]}"
}

# Create backup branch from feature branch (force update)
& git rev-parse --verify ${branches[1]} > $null 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "Backup branch ${branches[1]} already exists locally. Resetting to ${branches[0]}"
  git checkout ${branches[1]}
  git reset --hard ${branches[0]}
} else {
  git checkout -b ${branches[1]} ${branches[0]}
  if ($LASTEXITCODE -ne 0) { Fail "Failed to create ${branches[1]} from ${branches[0]}" }
  Write-Host "Created ${branches[1]} from ${branches[0]}"
}

# Create staging branch from feature branch if not exists
& git rev-parse --verify ${branches[2]} > $null 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Host "Staging branch ${branches[2]} already exists locally. Skipping creation."
} else {
  git checkout ${branches[0]}
  git checkout -b ${branches[2]}
  if ($LASTEXITCODE -ne 0) { Fail "Failed to create ${branches[2]} from ${branches[0]}" }
  Write-Host "Created ${branches[2]} from ${branches[0]}"
}

# Return to feature branch
git checkout ${branches[0]}

if (-not $SkipPush) {
  foreach ($b in $branches) {
    Write-Host "Pushing $b to origin"
    git push -u origin $b
  }
  Write-Host "Branches pushed."
} else {
  Write-Host "SkipPush set - branches were created locally but not pushed."
}

Write-Host "Done."
