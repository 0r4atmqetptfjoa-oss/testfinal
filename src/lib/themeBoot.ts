
export function themeBoot(){
  try{
    const a = (localStorage.getItem("accent_theme") as any) || "violet";
    const p = (localStorage.getItem("palette_theme") as any) || "default";
    const v = (localStorage.getItem("theme_variant") as any) || "night";
    const el = document.documentElement;
    const acc = `theme-accent-${a}`;
    const pal = `theme-palette-${p}`;
    const varr = `theme-variant-${v}`;
    el.classList.remove("theme-accent-violet","theme-accent-cyan","theme-accent-emerald");
    el.classList.remove("theme-palette-default","theme-palette-desert","theme-palette-naval","theme-palette-alpine");
    el.classList.remove("theme-variant-army","theme-variant-desert","theme-variant-naval","theme-variant-alpine","theme-variant-woodland","theme-variant-night");
    el.classList.add(acc, pal, varr);
  }catch{}
}
