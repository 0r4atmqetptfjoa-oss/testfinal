
export type Scale = 0.9|1|1.1|1.2;
const K_HAPTICS = "app_haptics";
const K_SOUNDS = "app_sounds";
const K_SCALE = "ui_scale";
export function getHaptics(){ return localStorage.getItem(K_HAPTICS)!=="0"; }
export function setHaptics(v:boolean){ localStorage.setItem(K_HAPTICS, v?"1":"0"); }
export function getSounds(){ return localStorage.getItem(K_SOUNDS)!=="0"; }
export function setSounds(v:boolean){ localStorage.setItem(K_SOUNDS, v?"1":"0"); }
export function getScale(): Scale { return (parseFloat(localStorage.getItem(K_SCALE) || "1") as Scale) || 1; }
export function setScale(v:Scale){ localStorage.setItem(K_SCALE, String(v)); document.documentElement.style.setProperty("--scale", String(v)); }
