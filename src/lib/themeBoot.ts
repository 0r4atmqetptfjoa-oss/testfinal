
export function themeBoot(){
  const el = document.documentElement;
  const a = localStorage.getItem("accent_theme") || "violet";
  const p = localStorage.getItem("palette_theme") || "default";
  const v = localStorage.getItem("theme_variant") || "night";
  const scale = parseFloat(localStorage.getItem("ui_scale") || "1") || 1;
  el.classList.add(`theme-accent-${a}`, `theme-palette-${p}`, `theme-variant-${v}`);
  document.documentElement.style.setProperty("--scale", String(scale));
}
