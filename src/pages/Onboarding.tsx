// ===============================================
// FILE: src/pages/Onboarding.tsx
// CHANGE: lock filiera to "indirecta" and simplify flow
// ===============================================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setProfile, Branch, branchSlug, setFiliera } from "../lib/profile";
import { Shield, Mountain, Hammer, Radio, Truck, Cross, Building2, Swords } from "lucide-react";

type Step = 0|1|2|3;
export default function Onboarding(){
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [role, setRole] = useState<"ofiter"|"subofiter"|null>(null);
  // filiera este forțată pe "indirecta"
  const filiera: "indirecta" = "indirecta";
  const [arma, setArma] = useState<Branch|null>(null);
  const pct = step===0 ? 10 : step===1 ? 60 : step===2 ? 100 : 100;
  const next = ()=> setStep(s=> Math.min(2, (s+1) as Step));
  const back = ()=> setStep(s=> Math.max(0, (s-1) as Step));

  useEffect(()=>{ setFiliera("indirecta"); },[]);

  function finish(){
    setProfile({ role, filiera, branch: arma } as any);
    localStorage.setItem("onboarding_completed","1");
    nav(`/module/${branchSlug(arma as any)}`, { replace: true });
  }
  const ARMS: {label:Branch, icon:React.ReactNode}[] = [
    { label:"Infanterie", icon:<Swords className="w-4 h-4" /> },
    { label:"Tancuri", icon:<Shield className="w-4 h-4" /> },
    { label:"Vânători de munte", icon:<Mountain className="w-4 h-4" /> },
    { label:"Artilerie", icon:<Shield className="w-4 h-4" /> },
    { label:"Geniu", icon:<Hammer className="w-4 h-4" /> },
    { label:"Comunicații", icon:<Radio className="w-4 h-4" /> },
    { label:"Logistică", icon:<Truck className="w-4 h-4" /> },
    { label:"Medical", icon:<Cross className="w-4 h-4" /> },
  ];
  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 pt-6 pb-10 max-w-xl mx-auto relative">
      {step>0 && (<button onClick={back} className="fixed top-3 left-3 z-40 rounded-full border border-ui bg-black/70 px-3 py-1 text-xs">Înapoi</button>)}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/60"><div className="h-full" style={{ background:"var(--accent)", width:`${pct}%` }} /></div>
      <div className="text-center mt-6 mb-6"><div className="text-2xl font-bold">Bun venit!</div><div className="text-sm text-gray-500">Profil pentru filiera indirectă</div></div>
      {step===0 && (
        <div className="rounded-2xl border border-ui bg-card p-5 text-center">
          <div className="text-sm text-muted mb-2">Pregătit?</div>
          <div className="text-lg font-semibold">Începem imediat</div>
          <div className="mt-4 flex justify-center"><button onClick={next} className="px-5 py-3 rounded-xl btn btn-primary">Începem</button></div>
          <div className="mt-6 text-xs text-gray-500">Pas 1/2</div>
        </div>
      )}
      {step===1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={()=> setRole("ofiter")} className={`rounded-2xl border p-4 text-left bg-card ${role==="ofiter"?"border-accent":"border-ui"}`}>
              <div className="font-semibold">Ofițer</div>
              <div className="text-xs text-gray-500">Filieră indirectă</div>
            </button>
            <button onClick={()=> setRole("subofiter")} className={`rounded-2xl border p-4 text-left bg-card ${role==="subofiter"?"border-accent":"border-ui"}`}>
              <div className="font-semibold">Subofițer</div>
              <div className="text-xs text-gray-500">Filieră indirectă</div>
            </button>
          </div>
          <div className="text-[11px] text-muted">Notă: Filiera directă a fost ascunsă în această versiune – aplicația este dedicată exclusiv filierei indirecte.</div>
          <div className="flex justify-end"><button onClick={next} disabled={!role} className={`px-4 py-2 rounded-xl btn btn-primary ${(!role)?"opacity-40":""}`}>Continuă</button></div>
        </div>
      )}
      {step===2 && (
        <div className="space-y-4">
          <div className="text-sm text-gray-500">Alege arma / specialitatea</div>
          <div className="grid grid-cols-2 gap-3">
            {ARMS.map(({label,icon})=> (
              <button key={label} onClick={()=> setArma(label)} className={`rounded-2xl border p-4 text-left bg-card ${arma===label?"border-accent":"border-ui"}`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-ui text-accent">{icon}</div>
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className="text-xs text-gray-500">Curriculum dedicat</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={()=> setStep(1)} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button>
            <button onClick={finish} disabled={!arma} className={`px-4 py-2 rounded-xl btn btn-primary ${!arma?"opacity-40":""}`}>Finalizează</button>
          </div>
        </div>
      )}
    </div>
  );
}
