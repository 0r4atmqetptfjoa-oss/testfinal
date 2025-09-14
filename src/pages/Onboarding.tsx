
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setProfile, Branch, branchSlug } from "../lib/profile";
import { TankIcon, ParachuteIcon, MountainIcon, CannonIcon, WrenchIcon, RadioIcon, TruckIcon, CrossIcon } from "../icons/Arms";

type Step = 0|1|2|3;
export default function Onboarding(){
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [role, setRole] = useState<"ofiter"|"subofiter"|null>(null);
  const [filiera, setFiliera] = useState<"directa"|"indirecta"|null>(null);
  const [arma, setArma] = useState<Branch|null>(null);
  const pct = step===0 ? 10 : step===1 ? 40 : step===2 ? 70 : 100;
  const next = ()=> setStep(s=> Math.min(3, (s+1) as Step));
  const back = ()=> setStep(s=> Math.max(0, (s-1) as Step));
  function finish(){
    setProfile({ role, filiera, branch: arma } as any);
    localStorage.setItem("onboarding_completed","1");
    nav(`/module/${branchSlug(arma as any)}`, { replace: true });
  }
  const ARMS: {label:Branch, icon:React.ReactNode}[] = [
    { label:"Infanterie", icon:<MountainIcon className="text-accent" /> },
    { label:"Tancuri", icon:<TankIcon className="text-accent" /> },
    { label:"Vânători de munte", icon:<MountainIcon className="text-accent" /> },
    { label:"Artilerie", icon:<CannonIcon className="text-accent" /> },
    { label:"Geniu", icon:<WrenchIcon className="text-accent" /> },
    { label:"Comunicații", icon:<RadioIcon className="text-accent" /> },
    { label:"Logistică", icon:<TruckIcon className="text-accent" /> },
    { label:"Medical", icon:<CrossIcon className="text-accent" /> },
  ];
  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 pt-6 pb-10 max-w-xl mx-auto relative">
      {step>0 && (<button onClick={back} className="fixed top-3 left-3 z-40 rounded-full border border-ui bg-black/70 px-3 py-1 text-xs">Înapoi</button>)}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/60"><div className="h-full" style={{ background:"var(--accent)", width:`${pct}%` }} /></div>
      <div className="text-center mt-6 mb-6"><div className="text-2xl font-bold">Bun venit!</div><div className="text-sm text-gray-500">Setează-ți profilul în 3 pași</div></div>
      {step===0 && (<div className="rounded-2xl border border-ui bg-card p-5 text-center"><div className="text-sm text-muted mb-2">Pregătit?</div><div className="text-lg font-semibold">Începem imediat</div><div className="mt-4 flex justify-center"><button onClick={next} className="px-5 py-3 rounded-xl btn btn-primary">Începem</button></div><div className="mt-6 text-xs text-gray-500">Pas 0/3</div></div>)}
      {step===1 && (<div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={()=> setRole("ofiter")} className={`rounded-2xl border p-4 text-left bg-card ${role==="ofiter"?"border-accent":"border-ui"}`}><div className="font-semibold">Ofițer</div><div className="text-xs text-gray-500">Filieră directă/indirectă</div></button>
          <button onClick={()=> setRole("subofiter")} className={`rounded-2xl border p-4 text-left bg-card ${role==="subofiter"?"border-accent":"border-ui"}`}><div className="font-semibold">Subofițer</div><div className="text-xs text-gray-500">Parcurs ghidat</div></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={()=> setFiliera("directa")} className={`rounded-2xl border p-4 text-left bg-card ${filiera==="directa"?"border-accent":"border-ui"}`}><div className="font-semibold">Filieră directă</div></button>
          <button onClick={()=> setFiliera("indirecta")} className={`rounded-2xl border p-4 text-left bg-card ${filiera==="indirecta"?"border-accent":"border-ui"}`}><div className="font-semibold">Filieră indirectă</div></button>
        </div>
        <div className="flex justify-end"><button onClick={next} disabled={!role||!filiera} className={`px-4 py-2 rounded-xl btn btn-primary ${(!role||!filiera)?"opacity-40":""}`}>Continuă</button></div>
      </div>)}
      {step===2 && (<div className="space-y-4">
        <div className="text-sm text-gray-500">Alege arma / specialitatea</div>
        <div className="grid grid-cols-2 gap-3">
          {ARMS.map(({label,icon})=>(
            <button key={label} onClick={()=> setArma(label)} className={`rounded-2xl border p-4 text-left bg-card ${arma===label?"border-accent":"border-ui"}`}>
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-black/40 border border-ui text-accent">{icon}</div><div><div className="font-semibold">{label}</div><div className="text-xs text-gray-500">Curriculum dedicat</div></div></div>
            </button>
          ))}
        </div>
        <div className="flex justify-between"><button onClick={()=> setStep(1)} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button><button onClick={next} disabled={!arma} className={`px-4 py-2 rounded-xl btn btn-primary ${!arma?"opacity-40":""}`}>Continuă</button></div>
      </div>)}
      {step===3 && (<div className="space-y-4"><div className="rounded-2xl border border-ui bg-card p-4"><div className="text-sm">Gata! Profil creat. Poți schimba oricând din butonul „Profiluri”.</div></div><div className="flex justify-between"><button onClick={()=> setStep(2)} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button><button onClick={finish} className="px-4 py-2 rounded-xl btn btn-primary">Finalizează</button></div></div>)}
    </div>
  );
}
