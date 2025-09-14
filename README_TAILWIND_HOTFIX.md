
Tailwind + Preflight Hotfix
===========================

Why you saw white default buttons / tiny padding
------------------------------------------------
Tailwind utilities and preflight were not loaded. Without them, buttons render with the browser default white background and tiny padding.

What this pack does
-------------------
1) Adds `src/index.css` with:
   - `@tailwind base; @tailwind components; @tailwind utilities;`
   - A tiny fallback that keeps buttons readable until Tailwind builds.
2) Updates `src/main.tsx` to import `./index.css` **before** `./styles/theme.css`.
3) Provides `tailwind.config.ts` and `postcss.config.js`.

How to install
--------------
1) Copy the files from this ZIP into your repo (merge the `src/` and root files).
2) Ensure deps are installed:
   npm i -D tailwindcss postcss autoprefixer
3) Restart dev server. If you use a Service Worker, do a hard refresh (Ctrl+Shift+R).

That's it. The utilities (`px-4`, `rounded-2xl`, `text-sm`, etc.) will apply, and your buttons/cards will match the designs.
