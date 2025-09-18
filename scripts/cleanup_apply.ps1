Param()
if (-not (Test-Path package.json)) {
  Write-Error "Rulează scriptul din rădăcina repo-ului (unde e package.json)."
  exit 1
}

# Mută types.ts din public în src/types
New-Item -ItemType Directory -Force -Path src/types | Out-Null
if (Test-Path public/data/v12/types.ts) {
  Move-Item public/data/v12/types.ts src/types/question.ts -Force
  git add src/types/question.ts 2>$null
  git rm -f public/data/v12/types.ts 2>$null
}

# Adaugă learning_index.json dacă lipsește
New-Item -ItemType Directory -Force -Path public/db | Out-Null
if (-not (Test-Path public/db/learning_index.json)) {
  @"{
  ""units"": [
    { ""id"": ""legislation_summary"", ""topic"": ""legislation"", ""title"": ""Rezumat legislație"", ""body_html"": ""<p>Rezumat</p>"" }
  ]
}
"@ | Out-File -Encoding utf8 public/db/learning_index.json
  git add public/db/learning_index.json 2>$null
}

# Ștergeri ghidate conform listelor scan
if (Test-Path .\.scan_unused_src) {
  Get-Content .\.scan_unused_src | ForEach-Object {
    if (Test-Path $_) { try { git rm -f -- $_ } catch { Remove-Item -Force $_ } }
  }
}
if (Test-Path .\.scan_unused_pub) {
  Get-Content .\.scan_unused_pub | ForEach-Object {
    if (Test-Path $_) { try { git rm -f -- $_ } catch { Remove-Item -Force $_ } }
  }
}
Write-Host "Curățenie aplicată. Verifică 'git status', apoi 'npm run build'."
