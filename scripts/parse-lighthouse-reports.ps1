$reports = @(
  'E:\\steelmade-cloudiary-chairs\\reports\\lighthouse-chairs.report.json',
  'E:\\steelmade-cloudiary-chairs\\reports\\lighthouse-modular-furniture-workstations.report.json'
)

foreach ($f in $reports) {
  Write-Host "---\nReport: $f\n"
  $j = Get-Content $f -Raw | ConvertFrom-Json
  $scores = $j.categories.PSObject.Properties | ForEach-Object { $_.Name + ': ' + [math]::Round($_.Value.score * 100) }
  Write-Host ($scores -join ', ')\n
  $audits = $j.audits.PSObject.Properties | Where-Object { $_.Value.score -lt 1 -and $_.Value.scoreDisplayMode -ne 'notApplicable' } | Sort-Object { $_.Value.score } | Select-Object -First 8
  Write-Host "Top failing/low audits:"
  foreach ($a in $audits) {
  $id = $a.Name
  $val = $a.Value
  $score = if ($null -ne $val.score) { [math]::Round($val.score * 100) } else { 'N/A' }
  Write-Host "- $id ($score) - $($val.title)"
  }
  Write-Host ""
}
