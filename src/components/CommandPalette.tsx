
import React, { useMemo, useState } from "react";
import BottomSheet from "./BottomSheet";
import { Search, BookOpen, Library, Shield, BrainCircuit } from "lucide-react";

type Item = { id: string; title: string; subtitle?: string; icon?: React.ReactNode; route: string };
const DATA: Item[] = [
  { id: "learn", title: "Mod Învățare", subtitle: "Rezumate, capitole, tematică", icon: <BookOpen size={18}/>, route: "/learning" },
  { id: "exam", title: "Simulare Examen", subtitle: "Întrebări grilă + cronometru", icon: <Shield size={18}/>, route: "/exam" },
  { id: "tests", title: "Teste Generale", subtitle: "Filtre pe module", icon: <Library size={18}/>, route: "/all-tests" },
  { id: "adaptive", title: "Antrenament Inteligent", subtitle: "AI coaching", icon: <BrainCircuit size={18}/>, route: "/adaptive-learning" },
];

export default function CommandPalette({ open, onClose, onGo }: { open: boolean; onClose: ()=>void; onGo: (route: string)=>void }){
  const [q, setQ] = useState("");
  const result = useMemo(()=>{
    const qq = q.trim().toLowerCase();
    if (!qq) return DATA;
    return DATA.filter(i => (i.title + " " + (i.subtitle||"")).toLowerCase().includes(qq));
  }, [q]);
  return (
    <BottomSheet open={open} onClose={onClose} title="Căutare rapidă">
      <div className="rounded-xl border border-gray-800 bg-black/40 flex items-center px-3 py-2 mb-3">
        <Search size={16} className="text-gray-500 mr-2"/> 
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Caută module, lecții, teste..." className="bg-transparent outline-none flex-1 text-gray-200 text-sm" autoFocus />
      </div>
      <div className="max-h-[50vh] overflow-y-auto space-y-2">
        {result.map(it => (
          <button key={it.id} onClick={()=>{ onGo(it.route); onClose(); }}
            className="w-full rounded-xl border border-gray-800 bg-gray-900 p-3 text-left flex items-center gap-3 active:scale-[0.99]">
            <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">{it.icon}</div>
            <div className="flex-1">
              <div className="text-gray-200 text-sm font-medium">{it.title}</div>
              <div className="text-gray-500 text-xs">{it.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}
