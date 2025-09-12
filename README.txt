
# Redesign UI – fișiere drop-in

Aceste fișiere sunt complete și pot înlocui versiunile existente din proiect:

- `src/pages/Onboarding.tsx`
- `src/pages/Home.tsx`
- `src/pages/Learning.tsx`
- `src/pages/QuizPlayer.tsx`
- `src/lib/sound.ts` (nou – pentru sunete corect/greșit)

## Notă
- Componentele folosesc **TailwindCSS** culori dark (`bg-gray-950`, `bg-gray-900`, `border-gray-700`, `text-gray-200/400`) și accent cu gradient `from-violet-500 to-purple-500`.
- Animații cu **Framer Motion**: fade-in/slide și hover scale `1.03`.
- `Learning.tsx` aplică clasa `prose prose-invert`; adăugați pluginul `@tailwindcss/typography` în `tailwind.config.js` dacă nu este deja prezent.

### Tailwind – activare typography (dacă doriți)
```js
// tailwind.config.js
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
}
```
