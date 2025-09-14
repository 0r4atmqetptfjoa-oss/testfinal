
import React from "react";
import { useNavigate } from "react-router-dom";
import { applyVariant } from "../lib/themeEngine";

const QUICK = [
  { key: "army", label: "Army" },
  { key: "desert", label: "Desert" },
  { key: "naval", label: "Naval" },
  { key: "alpine", label: "Alpine" },
  { key: "woodland", label: "Woodland" },
  { key: "night", label: "Night" },
] as const;

export default function Hub(){
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-4">
      <h1 className="text-xl font-bold">Hub</h1>
      <section className="rounded-2xl border border-ui bg-card p-4">
        <div className="text-sm font-semibold mb-2">Teme rapide</div>
        <div className="grid grid-cols-3 gap-2">
          {QUICK.map(q => (
            <button key={q.key} onClick={()=> applyVariant(q.key as any)}
              className="px-3 py-2 rounded-xl border border-ui hover:opacity-90">{q.label}</button>
          ))}
        </div>
      </section>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={()=> nav("/onboarding")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Relansează Onboarding</div>
          <div className="text-xs text-muted">Schimbă rol/filieră/armă</div>
        </button>
        <button onClick={()=> nav("/settings")} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
          <div className="text-sm font-medium">Teme & Preferințe</div>
          <div className="text-xs text-muted">Accent, palete, variante</div>
        </button>
      </div>
    </div>
  );
}
