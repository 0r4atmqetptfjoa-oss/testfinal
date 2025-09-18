#!/usr/bin/env bash
set -euo pipefail

# Run from repo root
if [ ! -f package.json ]; then
  echo "Te rog rulează acest script din rădăcina repo-ului (unde este package.json)."
  exit 1
fi

# 1) Mută tipuri din public în src/types (dacă există)
mkdir -p src/types
if [ -f public/data/v12/types.ts ]; then
  echo "Mut public/data/v12/types.ts -> src/types/question.ts"
  git mv public/data/v12/types.ts src/types/question.ts 2>/dev/null || mv public/data/v12/types.ts src/types/question.ts
fi

# 2) Creează index de învățare dacă lipsește
mkdir -p public/db
if [ ! -f public/db/learning_index.json ]; then
  cat > public/db/learning_index.json <<'EOF'
{
  "units": [
    { "id":"legislation_summary", "topic":"legislation", "title":"Rezumat legislație", "body_html":"<p>Rezumat</p>" }
  ]
}
EOF
  git add public/db/learning_index.json 2>/dev/null || true
fi

# 3) Ștergeri ghidate din liste (dacă ai rulat scan)
#    Revizuiește .scan_unused_src / .scan_unused_pub înainte!
if [ -f ./.scan_unused_src ]; then
  while IFS= read -r f; do
    [ -f "$f" ] && (git rm -f "$f" 2>/dev/null || rm -f "$f") || true
  done < ./.scan_unused_src
fi

if [ -f ./.scan_unused_pub ]; then
  while IFS= read -r f; do
    [ -f "$f" ] && (git rm -f "$f" 2>/dev/null || rm -f "$f") || true
  done < ./.scan_unused_pub
fi

echo "Curățenie aplicată. Verifică 'git status', apoi 'npm run build'."
