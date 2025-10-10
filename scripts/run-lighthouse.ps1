# Run Lighthouse audits for the project (PowerShell)
# Produces HTML and JSON reports per page under ./reports/
# Usage: Open PowerShell in repo root and run:
#   pwsh ./scripts/run-lighthouse.ps1

param(
    [switch]$SkipBuild = $false,
    [int]$Port = 3001,
    [string]$ChromePath = ''
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
Push-Location $repoRoot

# Ensure reports directory
$reportsDir = Join-Path $repoRoot 'reports'
if (-Not (Test-Path $reportsDir)) { New-Item -ItemType Directory -Path $reportsDir | Out-Null }

# Step 1: Build (unless requested to skip)
if (-not $SkipBuild) {
    Write-Host "Running production build..."
    npm run build
}

# Step 2: Start production server using npm start (Next.js)
Write-Host "Starting production server..."
# Start the server via pwsh -Command to avoid Start-Process Win32 issues with npm wrappers
$serverCmd = "npx next start -p $Port"
$serverProc = Start-Process -FilePath 'pwsh' -ArgumentList '-NoProfile','-Command',$serverCmd -NoNewWindow -PassThru

# Wait for server to be available
$baseUrl = "http://localhost:$Port"
$tries = 0
while ($tries -lt 30) {
    try {
        Invoke-WebRequest -Uri $baseUrl -UseBasicParsing -TimeoutSec 2 | Out-Null
        break
    } catch {
        Start-Sleep -Seconds 1
        $tries++
    }
}
if ($tries -ge 30) {
    Write-Error "Server didn't start in time on $baseUrl"
    Stop-Job $serverJob -ErrorAction SilentlyContinue
    Pop-Location
    exit 1
}
Write-Host "Server is up at $baseUrl"

# Step 3: Ensure lighthouse installed
if (-not (Get-Command lighthouse -ErrorAction SilentlyContinue)) {
    Write-Host "Lighthouse CLI not found; installing globally (npm install -g lighthouse)..."
    npm install -g lighthouse
}

# If ChromePath was provided and the file exists, optionally start the browser with remote debugging
$edgeProc = $null
$remotePort = 9222
if ($ChromePath -and (Test-Path $ChromePath)) {
    Write-Host "Launching browser at $ChromePath with remote debugging port $remotePort"
    try {
        $edgeProc = Start-Process -FilePath $ChromePath -ArgumentList "--remote-debugging-port=$remotePort --user-data-dir=$repoRoot\.lighthouse-temp" -PassThru -WindowStyle Hidden
        Start-Sleep -Seconds 2
    } catch {
        Write-Host "Failed to start browser with remote debugging: $_"
        $edgeProc = $null
    }
}

$pages = @(
    '/',
    '/chairs',
    '/modular-furniture/workstations'
)

foreach ($p in $pages) {
    $url = "$baseUrl$p"
    $safeName = ($p -replace '[^a-zA-Z0-9]', '-') -replace '^-|-$',''
    if ([string]::IsNullOrEmpty($safeName)) { $safeName = 'home' }
    $htmlOut = Join-Path $reportsDir "lighthouse-$safeName.html"
    $jsonOut = Join-Path $reportsDir "lighthouse-$safeName.json"
    Write-Host "Running Lighthouse for $url -> $htmlOut"

    # Build lighthouse args; include chrome path if provided
    $lhArgs = @()
    $lhArgs += $url
    $lhArgs += '--output'
    $lhArgs += 'html'
    $lhArgs += '--output'
    $lhArgs += 'json'
    $lhArgs += '--output-path'
    $lhArgs += $htmlOut
    if ($edgeProc) {
        # Connect to the running browser via debugging port instead of launching one
        $lhArgs += '--port'
        $lhArgs += $remotePort
    } elseif ($ChromePath -and (Test-Path $ChromePath)) {
        $lhArgs += '--chrome-path'
        $lhArgs += $ChromePath
    } else {
        $lhArgs += '--chrome-flags'
        $lhArgs += '--headless --no-sandbox'
    }
    $lhArgs += '--chrome-flags'
    $lhArgs += '--headless --no-sandbox'
    $lhArgs += '--quiet'

    & lighthouse @lhArgs

    # The CLI tends to write the JSON next to the HTML filename, so move it to desired name if present
    $defaultJson = "$htmlOut.report.json"
    if (Test-Path $defaultJson) { Move-Item -Path $defaultJson -Destination $jsonOut -Force }
}

Write-Host "All lighthouse reports are under: $reportsDir"

# Cleanup: stop the server job
Write-Host "Stopping production server..."
try {
    if ($serverProc -and -not $serverProc.HasExited) {
        Stop-Process -Id $serverProc.Id -ErrorAction SilentlyContinue
    }
} catch {
    Write-Host "Failed to stop the server process gracefully: $_"
}
if ($edgeProc) {
    try {
        Stop-Process -Id $edgeProc.Id -ErrorAction SilentlyContinue
    } catch {
        Write-Host "Failed to stop Edge process: $_"
    }
    # cleanup temporary user-data-dir
    $tmpDir = Join-Path $repoRoot '.lighthouse-temp'
    if (Test-Path $tmpDir) {
        try { Remove-Item -Recurse -Force $tmpDir } catch { }
    }
}

Pop-Location
Write-Host "Done."