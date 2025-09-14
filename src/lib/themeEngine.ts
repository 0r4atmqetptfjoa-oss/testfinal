
export type Accent = "violet" | "cyan" | "emerald";
export type Palette = "default" | "desert" | "naval" | "alpine";
export type Variant = "army"|"desert"|"naval"|"alpine"|"woodland"|"night";

const KEY_ACCENT = "accent_theme";
const KEY_PALETTE = "palette_theme";
const KEY_VARIANT = "theme_variant";

export function applyAccent(accent: Accent){
  const el = document.documentElement;
  el.classList.remove("theme-accent-violet","theme-accent-cyan","theme-accent-emerald");
  el.classList.add(`theme-accent-${accent}`);
  try{ localStorage.setItem(KEY_ACCENT, accent); }catch{}
  emit("theme:change");
}
export function applyPalette(palette: Palette){
  const el = document.documentElement;
  el.classList.remove("theme-palette-default","theme-palette-desert","theme-palette-naval","theme-palette-alpine");
  el.classList.add(`theme-palette-${palette}`);
  try{ localStorage.setItem(KEY_PALETTE, palette); }catch{}
  emit("theme:change");
}
export function applyVariant(variant: Variant){
  const el = document.documentElement;
  el.classList.remove("theme-variant-army","theme-variant-desert","theme-variant-naval","theme-variant-alpine","theme-variant-woodland","theme-variant-night");
  el.classList.add(`theme-variant-${variant}`);
  try{ localStorage.setItem(KEY_VARIANT, variant); }catch{}
  emit("theme:change");
}

export function readAccent(): Accent { try{ return (localStorage.getItem(KEY_ACCENT) as Accent) || "violet"; }catch{ return "violet"; } }
export function readPalette(): Palette { try{ return (localStorage.getItem(KEY_PALETTE) as Palette) || "default"; }catch{ return "default"; } }
export function readVariant(): Variant { try{ return (localStorage.getItem(KEY_VARIANT) as Variant) || "night"; }catch{ return "night"; } }

export function setTheme(accent: Accent, palette: Palette, variant?: Variant){
  applyAccent(accent); applyPalette(palette); if (variant) applyVariant(variant);
}
function emit(evt: string){ try{ window.dispatchEvent(new CustomEvent(evt)); }catch{} }

/** Map module/branch to suggested variant */
export function variantForBranch(slug: string): Variant {
  const s = slug.toLowerCase();
  if (/(infanterie|vanatori|munte|forest)/.test(s)) return "woodland";
  if (/(tanc|blindate|cavalerie)/.test(s)) return "army";
  if (/(geniu|engineer)/.test(s)) return "alpine";
  if (/(artilerie|dca)/.test(s)) return "desert";
  if (/(comunicatii|naval|marina)/.test(s)) return "naval";
  if (/(medical|sanitar)/.test(s)) return "night";
  if (/(logistic)/.test(s)) return "desert";
  return "night";
}
