
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sound } from "../lib/sound";
import { haptics } from "../lib/haptics";

const MODULES = [
  { key: "legislation", label: "Legislație", desc: "Întrebări din legislația apărării" },
  { key: "english", label: "Engleză", desc: "Teste de limba engleză" },
  { key: "psychology", label: "Psihologie", desc: "Evaluare psihologică" },
  { key: "specialty", label: "Specialitate", desc: "Conținut specific armei alese" },
] as const;

export default function ModuleHome(){
  const nav = useNavigate(); const { slug } = useParams();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-1">Modul: {slug}</h1>
      <p className="text-sm text-muted mb-4">Alege unul dintre modulele de mai jos</p>
      <div className="space-y-2">
        {MODULES.map(m => (
          <button key={m.key} onClick={()=> { haptics.light(); sound.ui(); nav(`/learning?module=${m.key}`); }}
            className="w-full p-4 bg-card rounded-2xl border border-ui text-left hover:border-accent active:scale-[0.99]">
            <div className="font-semibold">{m.label}</div>
            <div className="text-xs text-muted">{m.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
