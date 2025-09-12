
import React, { createContext, useContext, useEffect, useState } from "react";

type Accent = "violet" | "cyan" | "emerald";
type Palette = "default" | "desert" | "naval" | "alpine";

type ThemeCtx = {
  accent: Accent; palette: Palette;
  setAccent: (a: Accent)=>void;
  setPalette: (p: Palette)=>void;
  saveProfile: ()=>Promise<void>;
};

const Ctx = createContext<ThemeCtx>({ accent: "violet", palette: "default", setAccent: ()=>{}, setPalette: ()=>{}, saveProfile: async()=>{} });
const KEY_ACCENT = "accent_theme"; const KEY_PALETTE = "palette_theme";

async function postProfile(accent: Accent, palette: Palette){
  // Stub: înlocuiește cu endpoint-ul tău real (ex: /api/profile)
  try{
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accent, palette })
    });
  }catch{ /* fallback no-op */ }
}

export function ThemeAccentProvider({ children }: { children: React.ReactNode }){
  const [accent, setAccentState] = useState<Accent>("violet");
  const [palette, setPaletteState] = useState<Palette>("default");

  useEffect(()=>{
    try{
      const a = localStorage.getItem(KEY_ACCENT) as Accent | null;
      const p = localStorage.getItem(KEY_PALETTE) as Palette | null;
      if (a) setAccentState(a); if (p) setPaletteState(p);
    }catch{}
  }, []);

  useEffect(()=>{
    const el = document.documentElement;
    el.classList.remove("theme-accent-violet","theme-accent-cyan","theme-accent-emerald");
    el.classList.add(`theme-accent-${accent}`);
    try{ localStorage.setItem(KEY_ACCENT, accent); }catch{}
  }, [accent]);

  useEffect(()=>{
    const el = document.documentElement;
    el.classList.remove("theme-palette-default","theme-palette-desert","theme-palette-naval","theme-palette-alpine");
    el.classList.add(`theme-palette-${palette}`);
    try{ localStorage.setItem(KEY_PALETTE, palette); }catch{}
  }, [palette]);

  const setAccent = (a: Accent)=> setAccentState(a);
  const setPalette = (p: Palette)=> setPaletteState(p);
  const saveProfile = async()=> { await postProfile(accent, palette); };

  return <Ctx.Provider value={{ accent, palette, setAccent, setPalette, saveProfile }}>{children}</Ctx.Provider>;
}
export function useAccent(){ return useContext(Ctx); }
