
import React, { useMemo, useState } from "react";
import BottomSheet from "./BottomSheet";
import { Search } from "lucide-react";
import { LocalData, QuickItem } from "@/lib/localdata";

type Item = { id: string; title: string; subtitle?: string; route: string, section?: string };

const DATA: Item[] = [
  { id: "learn", title: "Mod Învățare", subtitle: "Rezumate, capitole, tematică", route: "/learning", section: "Module" },
  { id: "exam", title: "Simulare Examen", subtitle: "Întrebări grilă + cronometru", route: "/exam", section: "Module" },
  { id: "tests", title: "Teste Generale", subtitle: "Filtre pe module", route: "/all-tests", section: "Module" },
  { id: "adaptive", title: "Antrenament Inteligent", subtitle: "AI coaching", route: "/adaptive-learning", section: "Module" },
  // Demo: lecții & teste salvate
  { id: "l1", title: "Legislație – Drepturile militarilor", subtitle: "Capitol 2.1", route: "/learning/legislatie/cap-2-1", section: "Lecții" },
  { id: "l2", title: "Tactică – Dispozitive de luptă", subtitle: "Capitol 5", route: "/learning/tactica/cap-5", section: "Lecții" },
  { id: "t1", title: "Test – Tactică (30 întrebări)", subtitle: "Salvat", route: "/tests/tactica-30", section: "Teste" },
];

function fuzzyScore(q:string, s:string){
  q = q.toLowerCase(); s = s.toLowerCase();
  let qi=0, score=0, streak=0, lastIndex=-1;
  for (let i=0;i<s.length && qi<q.length;i++){
    if (s[i]===q[qi]){ qi++; streak++; score += 10 + streak*2 - (lastIndex>=0 ? (i-lastIndex-1) : 0); lastIndex=i; }
    else { streak=0; }
  }
  return qi===q.length ? score : 0;
}

export default function CommandPalettePro({ open, onClose, onGo }: { open: boolean; onClose: ()=>void; onGo: (route: string)=>void }){
  const [q, setQ] = useState("");

  const recent = LocalData.getRecent();
  const marked = LocalData.getMarked();
  const saved = LocalData.getSavedTests();

  const allItems: Item[] = useMemo(()=> [...DATA, ...marked.map(m=>({...m, section:"Marcate"})), ...saved.map(s=>({...s, section:"Teste salvate"})) ], []);
  const filtered = useMemo(()=> {
    const qq = q.trim().toLowerCase();
    if (!qq) return null;
    return allItems
      .map(i => ({ i, score: fuzzyScore(qq, i.title + " " + (i.subtitle||"")) }))
      .filter(r => r.score > 0)
      .sort((a,b)=> b.score - a.score)
      .map(r => r.i)
  }, [q, allItems]);

  const sections: { name: string; items: Item[] }[] = [];
  if (filtered){
    const map: Record<string, Item[]> = {};
    for (const i of filtered){ const k = i.section || "Rezultate"; (map[k] ||= []).push(i); }
    for (const k of Object.keys(map)){ sections.push({ name: k, items: map[k] }); }
  }

  function go(route: string, item?: Item){
    if (item) LocalData.addRecent({ id: item.id, title: item.title, route: item.route });
    onGo(route); onClose();
  }

  return (
    <BottomSheet open={open} onClose={onClose} title="Căutare rapidă">
      <div className="rounded-xl border border-ui bg-black/40 flex items-center px-3 py-2 mb-3">
        <Search size={16} className="text-muted mr-2"/> 
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Caută module, lecții, teste..." className="bg-transparent outline-none flex-1 text-gray-200 text-sm" autoFocus />
      </div>

      {!filtered && (
        <div className="space-y-4">
          {recent.length>0 && (
            <div>
              <div className="text-xs text-muted mb-2">Recente</div>
              <div className="grid grid-cols-1 gap-2">
                {recent.map((it: QuickItem)=> (
                  <button key={it.route} onClick={()=> go(it.route)}
                    className="w-full rounded-xl border border-ui bg-card p-3 text-left">
                    <div className="text-gray-200 text-sm font-medium">{it.title}</div>
                    <div className="text-muted text-xs">{it.route}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {marked.length>0 && (
            <div>
              <div className="text-xs text-muted mb-2">Lecții marcate</div>
              <div className="grid grid-cols-1 gap-2">
                {marked.map((it: QuickItem)=> (
                  <button key={it.route} onClick={()=> go(it.route)}
                    className="w-full rounded-xl border border-ui bg-card p-3 text-left">
                    <div className="text-gray-200 text-sm font-medium">{it.title}</div>
                    <div className="text-muted text-xs">{it.subtitle||it.route}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {saved.length>0 && (
            <div>
              <div className="text-xs text-muted mb-2">Teste salvate</div>
              <div className="grid grid-cols-1 gap-2">
                {saved.map((it: QuickItem)=> (
                  <button key={it.route} onClick={()=> go(it.route)}
                    className="w-full rounded-xl border border-ui bg-card p-3 text-left">
                    <div className="text-gray-200 text-sm font-medium">{it.title}</div>
                    <div className="text-muted text-xs">{it.subtitle||it.route}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {filtered && (
        <div className="max-h-[55vh] overflow-y-auto space-y-4">
          {sections.map(sec => (
            <div key={sec.name}>
              <div className="text-xs text-muted mb-2">{sec.name}</div>
              <div className="grid grid-cols-1 gap-2">
                {sec.items.map(it => (
                  <button key={it.id} onClick={()=> go(it.route, it)}
                    className="w-full rounded-xl border border-ui bg-card p-3 text-left">
                    <div className="text-gray-200 text-sm font-medium">{it.title}</div>
                    <div className="text-muted text-xs">{it.subtitle||it.route}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </BottomSheet>
  );
}
