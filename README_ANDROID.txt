
# Android‑First UI Pack

**Ce primești**
- **Theme Accent Picker** (violet/cyan/emerald) – schimbă accentul live (CSS vars).
- **Command Palette (Bottom Sheet)** – căutare rapidă în module/lecții/teste (FAB pe mobil).
- **Gesture‑ready Quiz** – swipe stânga/dreapta, haptics, XP toasts.
- **Parallax Hero** pe Home, partajare Android (Web Share API), prompt PWA.
- **Mobile Nav Bar** bottom (safe area), Ripple la tap, Skeletons + Loader global.

**Instalare**
```bash
npm i framer-motion recharts lucide-react
# dacă nu este deja, include styles:
# import "@/styles/theme.css" în src/main.tsx sau în index.css
```
În `App.tsx`, învelește aplicația în `ThemeAccentProvider` (și optional un GlobalLoaderProvider):
```tsx
import { ThemeAccentProvider } from "@/lib/theme";
import GlobalLoaderProvider from "@/components/GlobalLoader";

export default function App() {
  return (
    <ThemeAccentProvider>
      <GlobalLoaderProvider>
        {/* Routerul tău */}
      </GlobalLoaderProvider>
    </ThemeAccentProvider>
  );
}
```

**Rute afectate**
- `Home.tsx` (parallax hero + FAB pentru Command Palette + MobileNavBar).
- `QuizPlayer.tsx` (gestures swipe + haptics + XP toast).
- `Progress.tsx` (layout compact mobil + grafic).

**Opțional**
- Adaugă `manifest.json` cu `display: "standalone"` și `theme_color` pentru o experiență full‑screen pe Android.
- Poți expune `keepScreenAwake()` în modulul de fitness pentru a evita stingerea ecranului în alergări.

Have fun! 🚀
