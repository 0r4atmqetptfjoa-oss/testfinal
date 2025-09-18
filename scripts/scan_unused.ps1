Param()
Write-Host "== Repo cleanup scan (Windows) =="
if (-not (Test-Path package.json)) {
  Write-Warning "Rulează scriptul din rădăcina repo-ului (unde e package.json)."
}

# Colectăm TOATE fișierele o singură dată într-un ARRAY (evităm paranteze/expansiuni care rup parametrii)
$allFiles = Get-ChildItem -Recurse -File | Select-Object -ExpandProperty FullName

# surse și public (filtrăm tipuri text uzuale)
$src = Get-ChildItem -Recurse -File src -Include *.ts,*.tsx,*.css | Where-Object { $_.FullName -notmatch '\.d\.ts$' }
$pub = Get-ChildItem -Recurse -File public -Include *.json,*.png,*.jpg,*.svg

$unusedSrc = @()
foreach ($f in $src) {
  $name = $f.Name
  # căutăm numele în tot repo-ul (EXCLUS propriul fișier)
  $matches = Select-String -Path $allFiles -Pattern ([regex]::Escape($name)) -SimpleMatch -ErrorAction SilentlyContinue
  if (-not $matches -or ($matches | Where-Object { $_.Path -ne $f.FullName } | Measure-Object).Count -eq 0) {
    $unusedSrc += $f.FullName
  }
}

$unusedPub = @()
foreach ($f in $pub) {
  $name = $f.Name
  if ($name -match 'favicon|manifest|robots|apple-touch-icon|logo') { continue }
  $matches = Select-String -Path $allFiles -Pattern ([regex]::Escape($name)) -SimpleMatch -ErrorAction SilentlyContinue
  if (-not $matches) { $unusedPub += $f.FullName }
}

$unusedSrc | Out-File -Encoding utf8 .\.scan_unused_src
$unusedPub | Out-File -Encoding utf8 .\.scan_unused_pub

"Neutilizate în src: $($unusedSrc.Count)" | Out-File -Encoding utf8 .\scan_report.txt
"Neutilizate în public: $($unusedPub.Count)" | Add-Content -Encoding utf8 .\scan_report.txt

Write-Host "Generat .scan_unused_src, .scan_unused_pub și scan_report.txt"
