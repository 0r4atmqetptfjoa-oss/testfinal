#!/usr/bin/env bash
set -euo pipefail

# Folosește ripgrep dacă există, altfel grep -R
RG=rg
if ! command -v rg >/dev/null 2>&1; then
  RG="grep -R"
fi

echo "== Repo cleanup scan =="
echo "Data: $(date)"
echo

# Root checks
if [ ! -f package.json ]; then
  echo "ATENȚIE: Rulează din rădăcina repo-ului (unde e package.json)."
fi

echo "== Neutilizate potențiale (heuristici) =="

# Candidate lists
find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" \) > .scan_all_src 2>/dev/null || true
find public -type f \( -name "*.json" -o -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) > .scan_all_pub 2>/dev/null || true

# Exclusions (adjust)
grep -vE "(\.d\.ts$|/types/|/__tests__/|/coverage/|/node_modules/)" .scan_all_src > .scan_src || true
cp .scan_all_pub .scan_pub || true

echo
echo "-- Fișiere potențial nefolosite în src/ --"
touch .scan_unused_src
while IFS= read -r f; do
  base=$(basename "$f")
  # caută numele fișierului în întreg repo-ul (excluzând el însuși)
  if ! $RG -n "$base" -- . | grep -v "$f" >/dev/null 2>&1; then
    echo "$f" | tee -a .scan_unused_src
  fi
done < .scan_src

echo
echo "-- Fișiere potențial nefolosite în public/ --"
touch .scan_unused_pub
while IFS= read -r f; do
  base=$(basename "$f")
  # exclude manifest/icon standard
  if echo "$base" | grep -Eiq 'favicon|manifest|robots|apple-touch-icon|logo'; then
    continue
  fi
  if ! $RG -n "$base" -- src public  >/dev/null 2>&1; then
    echo "$f" | tee -a .scan_unused_pub
  fi
done < .scan_pub

echo
echo "== Rezumat =="
echo "Neutilizate în src/: $(wc -l < .scan_unused_src 2>/dev/null || echo 0)"
echo "Neutilizate în public/: $(wc -l < .scan_unused_pub 2>/dev/null || echo 0)"
echo
echo "Liste: .scan_unused_src, .scan_unused_pub (poți edita manual înainte de cleanup)."
