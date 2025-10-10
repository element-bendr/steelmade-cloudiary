param(
  [string[]]$Reports = @("E:\\steelmade-cloudiary-chairs\\reports\\lighthouse-chairs.report.json","E:\\steelmade-cloudiary-chairs\\reports\\lighthouse-modular-furniture-workstations.report.json")
)

foreach ($r in $Reports) {
  if (-not (Test-Path $r)) { Write-Host "Report not found: $r"; continue }
  Write-Host "---\nReport: $r\n"
  $j = Get-Content $r -Raw | ConvertFrom-Json

  $opps = $j.audits.PSObject.Properties | Where-Object { $_.Value.details -and $_.Value.details.type -and $_.Value.details.type -eq 'opportunity' } | Sort-Object { $_.Value.details.overallSavingsMs } -Descending | Select-Object -First 8
  if ($opps.Count -gt 0) {
    Write-Host "Top opportunities (estimated savings):"
    foreach ($o in $opps) {
      $id = $o.Name
      $title = $o.Value.title
      $savings = $o.Value.details.overallSavingsMs
      Write-Host ('- {0}: {1} (~{2} ms)' -f $id, $title, [math]::Round($savings))
    }
    Write-Host ""
  } else { Write-Host "No opportunity audits found."; Write-Host "" }

  $diagCandidates = @('total-byte-weight','uses-long-cache-ttl','unused-css-rules','uses-rel-preconnect','render-blocking-resources','largest-contentful-paint-element','uses-responsive-images')
  Write-Host "Diagnostics / useful numeric audits:"
  foreach ($k in $diagCandidates) {
    if ($j.audits.$k) {
      $val = $j.audits.$k
      $num = $null
      if ($val.numericValue) { $num = $val.numericValue }
      elseif ($val.details -and $val.details.items -and $val.details.items.Count -gt 0) { $num = $val.details.items.Count }
  Write-Host ('- {0}: score={1} numericValue={2} title={3}' -f $k, $val.score, $num, $val.title)
    }
  }

  Write-Host "\n"
}
