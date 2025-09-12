
# Android WOW – FULL PACK **MAX**

Include TOT din pachetele anterioare + următoarele:
- 🎨 **Lottie Badges personalizabile** (tint la runtime): `lottieBrand.ts` + `BadgesBrand.tsx`
- 🧭 **Guided Tour PRO** cu auto‑anchor (replanează tooltipul ca să rămână în viewport)
- 📦 **vite-plugin-pwa** (Workbox) – pre-cache rute, runtime caching pentru API/imagini/assets
- ☁️ **Persistență reală (REST)** – mock server Express + merge logic pentru stări offline

## Integrare rapidă

### 1) Lottie badge tint
```tsx
import { BadgeFirst, BadgePerfect } from "@/components/BadgesBrand";
<BadgeFirst color="#8b5cf6"/>
<BadgePerfect color="#22d3ee"/>
```
sau:
```tsx
import Lottie from "@/components/Lottie";
import { tintLottie } from "@/lib/lottieBrand";
import raw from "@/assets/lottie/badge_first.json";
const data = tintLottie(raw, "#10b981");
<Lottie src={data} />
```

### 2) Guided Tour PRO
```tsx
import GuidedTourPro from "@/components/GuidedTourPro";
<GuidedTourPro steps={[
  { selector: '[data-tour="accent"]', title: 'Schimbă accentul', text: 'Alege violet/cyan/emerald.' },
  { selector: '[data-tour="fab-search"]', title: 'Paleta de comenzi', text: 'Caută instant module/lecții/teste.' },
  { selector: '[data-tour="mission"]', title: 'Misiunea zilei', text: 'XP rapid și păstrezi streak-ul.' },
]} />
```

### 3) PWA (vite-plugin-pwa)
- Salvează `vite.config.pwa.ts` și rulează:
```bash
npm i vite-plugin-pwa -D
# folosește configul din vite.config.pwa.ts în locul lui vite.config.ts sau integrează pluginul în configul existent
```
- Build: `npm run build` → pluginul generează SW-ul și manifestul.

### 4) Server REST (mock) pentru persistență
- Rulează serverul Express (vezi `server/README_SERVER.md`).
- Clientul poate folosi `/api/profile` & `/api/game` pentru a sincroniza starea reală.
- `lib/sync.ts` din pachetele anterioare poate posta la `/api/sync` (batch).

## Notă
- Dacă folosești `vite-plugin-pwa`, **elimină** SW-ul custom (dacă exista `public/sw.js`), ca să eviți conflicte.
- Lottie JSON-urile incluse sunt **minimaliste** (demo). Poți schimba fișierele cu animații branduite; utilitarul `tintLottie` va recolora automat la accent.
