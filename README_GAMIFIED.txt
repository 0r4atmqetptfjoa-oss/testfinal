
# Gamified Redesign (Bento Dashboard, Quiz gamificat, Profil/Progres)

**Drop‑in files** (complete) pentru un redesign modern cu React + TypeScript + Tailwind + Framer Motion:
- `src/pages/Home.tsx` – Dashboard Bento (Misiunea zilei, progres 7 zile, statistici rapide, carduri de navigare).
- `src/pages/QuizPlayer.tsx` – Player gamificat (XP on answer, toast + haptics, bară progres cyan, ecran final cu badge-uri).
- `src/pages/Progress.tsx` – Profil & progres (nivel, XP, badge-uri, grafic Recharts 30 de zile).
- `src/components/` – **BentoCard**, **WeeklyBar**, **Stat**, **ProgressBar**, **Toast**, **PageHeader**.
- `src/lib/` – **game.ts** (XP, streak, badges, activitate, haptics), **sound.ts** (sunete corect/greșit/final/badge).

## Paletă
- Fundal: `bg-black`
- Carduri: `bg-gray-900`
- Borduri: `border-gray-800`
- Text: `text-gray-200`, `text-gray-500`
- Accente: `violet-500` (primar), `cyan-400` (progres), `green-500` (success), `red-500` (error)

## Dependențe recomandate
```bash
npm i framer-motion lucide-react recharts
# (Tailwind deja prezent)
```

## Note de integrare
- Asigură-te că există aliasul Vite `@` către `src` (în `vite.config.ts`), ceea ce deja ai în proiectul tău.
- Adaugă rute spre noile pagini (ex. `/progress`) în `App.tsx`/router.
- Pentru haptics pe mobil, browserul trebuie să permită `navigator.vibrate`.
- Recharts necesită importuri din `recharts`; graficul este lazy simple.

Happy shipping! 🚀
