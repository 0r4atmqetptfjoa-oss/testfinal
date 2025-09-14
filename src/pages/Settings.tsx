
import React, { useEffect, useState } from "react";
import { applyAccent, applyPalette, applyVariant, readAccent, readPalette, readVariant, type Accent, type Palette, type Variant } from "../lib/themeEngine";
import { getHaptics, setHaptics, getSounds, setSounds, getScale, setScale, type Scale } from "../lib/prefs";
import { haptics } from "../lib/haptics";
import { sound } from "../lib/sound";

const accents: Accent[] = ["violet","cyan","emerald"];
const palettes: Palette[] = ["default","desert","naval","alpine"];
const variants: Variant[] = ["night","army","desert","naval","alpine","woodland"];
const scales: Scale[] = [0.9, 1, 1.1, 1.2];

export default function Settings(){
  const [accent, setA] = useState<Accent>(readAccent());
  const [palette, setP] = useState<Palette>(readPalette());
  const [variant, setV] = useState<Variant>(readVariant());
  const [useHaptics, sH] = useState<boolean>(getHaptics());
  const [useSounds, sS] = useState<boolean>(getSounds());
  const [scale, sScale] = useState<Scale>(getScale());

  useEffect(()=>{ applyAccent(accent); },[accent]);
  useEffect(()=>{ applyPalette(palette); },[palette]);
  useEffect(()=>{ applyVariant(variant); },[variant]);
  useEffect(()=>{ setHaptics(useHaptics); if(useHaptics) haptics.light(); },[useHaptics]);
  useEffect(()=>{ setSounds(useSounds); if(useSounds) sound.ui(); },[useSounds]);
  useEffect(()=>{ setScale(scale); },[scale]);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-6">
      <h1 className="text-xl font-bold">Setări</h1>

      <section className="rounded-2xl border border-ui bg-card p-4 space-y-3">
        <div className="text-sm text-muted">Accent</div>
        <div className="flex gap-2">
          {accents.map(a=>(
            <button key={a} onClick={()=> setA(a)} className={`h-8 w-8 rounded-full border ${accent===a?"border-accent":"border-ui"}`}
              style={{ background: a==="violet"?"#8b5cf6": a==="cyan"?"#22d3ee":"#10b981" }} aria-label={`accent ${a}`} />
          ))}
        </div>
        <div className="text-sm text-muted mt-3">Paletă</div>
        <div className="grid grid-cols-2 gap-2">
          {palettes.map(p=>(<button key={p} onClick={()=> setP(p)} className={`px-3 py-2 rounded-xl border ${palette===p?"border-accent":"border-ui"}`}>{p}</button>))}
        </div>
        <div className="text-sm text-muted mt-3">Variant (temă „armă”)</div>
        <div className="grid grid-cols-3 gap-2">
          {variants.map(v=>(<button key={v} onClick={()=> setV(v)} className={`px-3 py-2 rounded-xl border ${variant===v?"border-accent":"border-ui"}`}>{v}</button>))}
        </div>
      </section>

      <section className="rounded-2xl border border-ui bg-card p-4 space-y-3">
        <h2 className="text-lg font-semibold">Feedback tactil & sunete</h2>
        <div className="flex items-center justify-between">
          <span className="font-medium">Vibrații (Haptics)</span>
          <button onClick={()=> sH(!useHaptics)} className={`btn w-24 ${useHaptics?"btn-primary":""}`}>{useHaptics?"Activat":"Inactiv"}</button>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Sunete UI</span>
          <button onClick={()=> sS(!useSounds)} className={`btn w-24 ${useSounds?"btn-primary":""}`}>{useSounds?"Activat":"Inactiv"}</button>
        </div>
      </section>

      <section className="rounded-2xl border border-ui bg-card p-4">
        <h2 className="text-lg font-semibold mb-3">Scală UI</h2>
        <div className="flex gap-2">
          {scales.map(s=>(<button key={s} onClick={()=> sScale(s)} className={`btn flex-1 ${scale===s?"btn-primary":"btn-ghost"}`}>{Math.round(s*100)}%</button>))}
        </div>
      </section>
    </div>
  );
}
