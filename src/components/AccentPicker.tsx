
import React, { useState } from "react";
import { useAccent } from "@/lib/theme";
import { Palette } from "lucide-react";

const ACCENTS: { key: "violet"|"cyan"|"emerald"; label: string; color: string }[] = [
  { key: "violet", label: "Violet", color: "#8b5cf6" },
  { key: "cyan", label: "Cyan", color: "#22d3ee" },
  { key: "emerald", label: "Emerald", color: "#10b981" },
];

export default function AccentPicker(){
  const { accent, setAccent } = useAccent();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={()=> setOpen(o=>!o)} className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-sm flex items-center gap-2">
        <Palette size={16}/> Accent
      </button>
      {open && (
        <div className="absolute right-0 mt-2 rounded-xl border border-gray-800 bg-gray-900 p-2 z-40">
          <div className="grid grid-cols-3 gap-2 w-48">
            {ACCENTS.map(a => (
              <button key={a.key} onClick={()=>{ setAccent(a.key); setOpen(false); }}
                className={`rounded-lg p-2 border ${accent===a.key ? "border-accent" : "border-gray-800"}`} style={{ background: a.color }}>
                <span className="sr-only">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
