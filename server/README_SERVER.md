
# Mock Server (REST) pentru persistență reală

**Rulare (Node 18+):**
```bash
npm i express cors
ts-node server/index.ts
# sau:
npx ts-node server/index.ts
# ori transpilează cu tsc și rulează node dist/server/index.js
```
Endpoints:
- `GET/POST /api/profile` – accent/palette etc.
- `GET/POST /api/game` – salvează/mergează XP/Streak/Badges/Activity (conflict-resolution offline)
- `POST /api/sync` – primește coada de evenimente (theme/game) și le aplică.
