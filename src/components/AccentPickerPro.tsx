
import React, { useState } from "react";
import { useAccent } from "@/lib/theme";
import { Palette } from "lucide-react";

const ACCENTS: { key: "violet"|"cyan"|"emerald"; color: string }[] = [
  { key: "violet", color: "#8b5cf6" },
  { key: "cyan", color: "#22d3ee" },
  { key: "emerald", color: "#10b981" },
];
const PALETTES: { key: "default"|"desert"|"naval"|"alpine"; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "desert", label: "Desert" },
  { key: "naval", label: "Naval" },
  { key: "alpine", label: "Alpine" },
];

export default function AccentPickerPro(){
  const { accent, palette, setAccent, setPalette, saveProfile } = useAccent() as any;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={()=> setOpen(o=>!o)} className="rounded-xl border border-ui bg-card px-3 py-2 text-sm flex items-center gap-2">
        <Palette size={16}/> Temă
      </button>
      {open && (
        <div className="absolute right-0 mt-2 rounded-2xl border border-ui bg-card p-3 z-40 w-64">
          <div className="text-xs text-muted mb-2">Accent</div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {ACCENTS.map(a => (
              <button key={a.key} onClick={()=> setAccent(a.key)}
                className={`rounded-lg p-2 border ${accent===a.key ? "border-accent" : "border-ui"}`} style={{ background: a.color }} />
            ))}
          </div>
          <div className="text-xs text-muted mb-2">Paletă</div>
          <div className="grid grid-cols-2 gap-2">
            {PALETTES.map(p => (
              <button key={p.key} onClick={()=> setPalette(p.key)}
                className={`rounded-lg px-2 py-1 border ${palette===p.key ? "border-accent" : "border-ui"} text-xs`}>{p.label}</button>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <button onClick={()=> { saveProfile(); setOpen(false); }} className="text-xs btn-accent rounded px-3 py-1">Salvează</button>
          </div>
        </div>
      )}
    </div>
  );
}
