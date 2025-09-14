
export type Accent = "violet"|"cyan"|"emerald";
export type Palette = "default"|"desert"|"naval"|"alpine";
export type Variant = "night"|"army"|"desert"|"naval"|"alpine"|"woodland";
export function readAccent():Accent{ return (localStorage.getItem("accent_theme") as Accent) || "violet"; }
export function readPalette():Palette{ return (localStorage.getItem("palette_theme") as Palette) || "default"; }
export function readVariant():Variant{ return (localStorage.getItem("theme_variant") as Variant) || "night"; }
export function applyAccent(a:Accent){ const el=document.documentElement; el.classList.remove("theme-accent-violet","theme-accent-cyan","theme-accent-emerald"); el.classList.add(`theme-accent-${a}`); localStorage.setItem("accent_theme", a); }
export function applyPalette(p:Palette){ const el=document.documentElement; el.classList.remove("theme-palette-default","theme-palette-desert","theme-palette-naval","theme-palette-alpine"); el.classList.add(`theme-palette-${p}`); localStorage.setItem("palette_theme", p); }
export function applyVariant(v:Variant){ const el=document.documentElement; el.classList.remove("theme-variant-night","theme-variant-army","theme-variant-desert","theme-variant-naval","theme-variant-alpine","theme-variant-woodland"); el.classList.add(`theme-variant-${v}`); localStorage.setItem("theme_variant", v); }
