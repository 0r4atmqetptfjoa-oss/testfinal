
# Android WOW – Full Extras Pack

**Include TOT:**
- Accent Picker **extins** (accent + paletă) + salvare profil (stub API).
- Command Palette **completă** (fuzzy, secțiuni: Recente, Marcate, Teste salvate).
- **Lottie badges** (6 JSON light) + componentă `Lottie` (fallback emoji).
- **Edge Lighting** pe Quiz (feedback corect/greșit/progres/final).
- **Haptic patterns** custom (ex: scurt–lung–scurt la perfect score).
- **Pull‑to‑refresh** pe Home + Feed cu skeleton.
- **Coach mode** (3 hinturi la primele sesiuni).
- Home & Quiz **actualizate** pentru Android‑first.

## Integrare
1. Copiază peste proiect conținutul din `src/` și `public/`.
2. Importă stilurile în entry:
```ts
import "@/styles/theme.css";
```
3. Împachetează providerul de temă în `App.tsx`:
```tsx
import { ThemeAccentProvider } from "@/lib/theme";
export default function App(){
  return <ThemeAccentProvider>{/* Router */}</ThemeAccentProvider>;
}
```
4. Dependențe:
```bash
npm i framer-motion lucide-react recharts lottie-web
```

## APK – Ghid rapid
**Opțiunea A – Capacitor (recomandat pentru APK):**
```bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init elearn-mil com.yourorg.elearnmil
npm run build          # generează /dist din Vite
npx cap add android
npx cap copy android && npx cap open android
# Android Studio: Build > Build Bundle(s)/APK(s) > Build APK(s)
```
Setează în `AndroidManifest.xml`: `android:targetSdkVersion` actual, permisiuni (internet, vibrate), și adaptive icons.

**Opțiunea B – TWA (Bubblewrap) pentru PWA în Play Store:** folosește Bubblewrap pentru a genera un Trusted Web Activity din PWA-ul tău.

## Note
- API profil: înlocuiește în `lib/theme.ts` endpoint-ul `/api/profile` cu serverul tău.
- Lottie: JSON-urile din `src/assets/lottie` sunt minimaliste (svg shapes). Poți înlocui cu animații branduite.
- Edge Lighting: culori corelate cu `--accent` + status quiz.
- Haptics: `navigator.vibrate` – funcționează pe majoritatea device-urilor Android.

Let’s ship something Play‑Store‑worthy! 🚀
