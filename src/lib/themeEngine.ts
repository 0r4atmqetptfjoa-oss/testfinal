
// Am extins schema temelor pentru a oferi mai multe accente, palete și variante.
export type Accent =
  | "violet"
  | "cyan"
  | "emerald"
  | "rose"
  | "blue"
  | "orange";
export type Palette =
  | "default"
  | "desert"
  | "naval"
  | "alpine"
  | "forest"
  | "ocean"
  | "sunset";
export type Variant =
  | "night"
  | "army"
  | "desert"
  | "naval"
  | "alpine"
  | "woodland"
  | "dawn"
  | "twilight"
  | "midnight";
export function readAccent():Accent{ return (localStorage.getItem("accent_theme") as Accent) || "violet"; }
export function readPalette():Palette{ return (localStorage.getItem("palette_theme") as Palette) || "default"; }
export function readVariant():Variant{ return (localStorage.getItem("theme_variant") as Variant) || "night"; }
export function applyAccent(a:Accent){
  const el = document.documentElement;
  // eliminăm toate clasele de accent cunoscute înainte de a aplica noul accent
  el.classList.remove(
    "theme-accent-violet",
    "theme-accent-cyan",
    "theme-accent-emerald",
    "theme-accent-rose",
    "theme-accent-blue",
    "theme-accent-orange",
  );
  el.classList.add(`theme-accent-${a}`);
  localStorage.setItem("accent_theme", a);
}

export function applyPalette(p:Palette){
  const el = document.documentElement;
  el.classList.remove(
    "theme-palette-default",
    "theme-palette-desert",
    "theme-palette-naval",
    "theme-palette-alpine",
    "theme-palette-forest",
    "theme-palette-ocean",
    "theme-palette-sunset",
  );
  el.classList.add(`theme-palette-${p}`);
  localStorage.setItem("palette_theme", p);
}

export function applyVariant(v:Variant){
  const el = document.documentElement;
  el.classList.remove(
    "theme-variant-night",
    "theme-variant-army",
    "theme-variant-desert",
    "theme-variant-naval",
    "theme-variant-alpine",
    "theme-variant-woodland",
    "theme-variant-dawn",
    "theme-variant-twilight",
    "theme-variant-midnight",
  );
  el.classList.add(`theme-variant-${v}`);
  localStorage.setItem("theme_variant", v);
}
