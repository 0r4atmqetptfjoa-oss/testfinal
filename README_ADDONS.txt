
# Add-ons: componente comune + Tailwind Typography

Au fost adăugate următoarele fișiere **complete** (drop-in):
- `src/components/PageHeader.tsx`
- `src/components/ListRow.tsx`
- `src/components/ProgressBar.tsx`
- `src/lib/sound.ts` (feedback audio pentru quiz)
- pagini actualizate să folosească noile componente: 
  - `src/pages/Onboarding.tsx`
  - `src/pages/Home.tsx`
  - `src/pages/Learning.tsx`
  - `src/pages/QuizPlayer.tsx`
- `tailwind.config.js` actualizat cu pluginul `@tailwindcss/typography`.

> Notă: Asigurați-vă că aveți instalat pachetul:
```
npm i -D @tailwindcss/typography
```
sau
```
pnpm add -D @tailwindcss/typography
```
