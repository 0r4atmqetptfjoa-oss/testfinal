
# Android WOW – FULL PACK **PLUS**

**Ce adaugă peste pachetele anterioare:**
1) **Coach mode extins** – Guided Tour cu highlight pe elemente (selector‑based).
2) **Exam Mode** – `ExamPlayer.tsx` cu **Edge Timer** (gradient pe marginea superioară).
3) **Offline caching** – Service Worker simplu + `registerSW()` pentru PWA.
4) **Sync server** – coadă locală + flush la `online` pentru actualizări de **temă** și **game**.
5) **Lottie badges/loader** – JSON light + componentă `Lottie` cu fallback.

## Integrare rapidă
- Copiază fișierele în proiect.
- În `main.tsx` (sau echivalent), importă registrul PWA *după* render:
```ts
import { registerSW } from "@/pwa/register";
registerSW();
```
- Providerii:
```tsx
import { ThemeAccentProvider } from "@/lib/theme";
import SyncProvider from "@/providers/SyncProvider";

export default function App(){
  return (
    <ThemeAccentProvider>
      <SyncProvider>
        {/* Router */}
      </SyncProvider>
    </ThemeAccentProvider>
  );
}
```
- Rute:
  - `/exam` → Montează `ExamPlayer` cu items și `seconds` dorit.
- Dependențe:
```bash
npm i lottie-web
```
*(framer-motion/lucide-react/recharts sunt deja recomandate în pachetele anterioare)*

## Note
- `public/sw.js` este un SW custom minimalist (stale‑while‑revalidate + network‑first pentru `/api/`). Pentru caching avansat, poți trece la **vite-plugin-pwa**.
- `lib/sync.ts` trimite batch-uri la `/api/sync` (schimbă endpoint-ul după backendul tău).
- `GuidedTour` consumă un array de pași `{ selector, title, text }`. Pune atribute `data-tour="..."` pe elementele țintă și treci `selector: '[data-tour="accent"]'`, etc.

Let’s build that Play‑Store‑worthy APK 🚀
