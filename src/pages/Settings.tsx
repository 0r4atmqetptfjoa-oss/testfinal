
import React, { useEffect, useState } from "react";
import { applyAccent, applyPalette, applyVariant, readAccent, readPalette, readVariant, type Accent, type Palette, type Variant } from "../lib/themeEngine";

const accents: Accent[] = ["violet","cyan","emerald"];
const palettes: Palette[] = ["default","desert","naval","alpine"];
const variants: Variant[] = ["army","desert","naval","alpine","woodland","night"];

export default function Settings(){
  const [accent, setA] = useState<Accent>(readAccent());
  const [palette, setP] = useState<Palette>(readPalette());
  const [variant, setV] = useState<Variant>(readVariant());

  useEffect(()=>{ applyAccent(accent); },[accent]);
  useEffect(()=>{ applyPalette(palette); },[palette]);
  useEffect(()=>{ applyVariant(variant); },[variant]);

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-6">
      <h1 className="text-xl font-bold">Setări</h1>
      <section className="rounded-2xl border border-ui bg-card p-4">
        <div className="text-sm text-muted mb-3">Accent</div>
        <div className="flex gap-2">
          {accents.map(a=>(
            <button key={a} onClick={()=> setA(a)}
              className={`h-8 w-8 rounded-full border ${accent===a ? "border-accent":"border-ui"}`}
              aria-label={`accent ${a}`}
              style={{ background: a==="violet"?"#8b5cf6": a==="cyan"?"#22d3ee":"#10b981" }}
            />
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-ui bg-card p-4">
        <div className="text-sm text-muted mb-3">Paletă</div>
        <div className="grid grid-cols-2 gap-2">
          {palettes.map(p=>(
            <button key={p} onClick={()=> setP(p)}
              className={`px-3 py-2 rounded-xl border ${palette===p ? "border-accent":"border-ui"}`}>{p}</button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-ui bg-card p-4">
        <div className="text-sm text-muted mb-3">Variant (temă “armă”)</div>
        <div className="grid grid-cols-3 gap-2">
          {variants.map(v=>(
            <button key={v} onClick={()=> setV(v)}
              className={`px-3 py-2 rounded-xl border ${variant===v ? "border-accent":"border-ui"}`}>{v}</button>
          ))}
        </div>
      </section>
    </div>
  );
}
