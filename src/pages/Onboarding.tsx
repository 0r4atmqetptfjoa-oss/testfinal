
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Target, Swords, BookOpenCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setProfile, Branch, branchSlug } from "../lib/profile";

type Step = 0|1|2|3;

export default function Onboarding(){
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [role, setRole] = useState<"ofiter"|"subofiter"|null>(null);
  const [filiera, setFiliera] = useState<"directa"|"indirecta"|null>(null);
  const [arma, setArma] = useState<Branch|null>(null);

  const pct = step===0 ? 10 : step===1 ? 40 : step===2 ? 70 : 100;
  const next = ()=> setStep((s)=> Math.min(3, (s+1) as Step));
  const back = ()=> setStep((s)=> Math.max(0, (s-1) as Step));

  function finish(){
    setProfile({ role, filiera, branch: arma } as any);
    try{ localStorage.setItem("onboarding_completed", "1"); }catch{}
    nav(`/module/${branchSlug(arma as any)}`, { replace: true });
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 pt-6 pb-10 max-w-xl mx-auto relative overflow-hidden">
      {step>0 && (
        <button onClick={back} className="absolute top-3 left-3 z-40 rounded-full border border-ui bg-black/70 px-3 py-1 text-xs flex items-center gap-1">
          <ArrowLeft size={14}/> Înapoi
        </button>
      )}

      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/60">
        <div className="h-full" style={{ background: "var(--accent)", width: `${pct}%` }} />
      </div>

      <div className="text-center mt-6 mb-6">
        <div className="text-2xl font-bold">Bun venit!</div>
        <div className="text-sm text-gray-500">Personalizăm experiența ta pentru rezultate maxime.</div>
      </div>

      <AnimatePresence mode="wait">
        {step===0 && (
          <motion.div key="welcome" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }} className="text-center">
            <div className="rounded-2xl border border-ui bg-card p-5">
              <div className="text-sm text-muted mb-2">Pregătit să începem?</div>
              <div className="text-lg font-semibold">Setează-ți profilul în 3 pași</div>
              <div className="text-xs text-muted mt-1">Durează sub un minut.</div>
              <div className="mt-4 flex justify-center">
                <button onClick={next} className="px-5 py-3 rounded-xl btn-accent">Începem</button>
              </div>
            </div>
            <div className="mt-6 text-xs text-gray-500">Pas 0/3</div>
            <div className="mt-3">
              <button onClick={()=> { localStorage.setItem("onboarding_completed","1"); nav("/home", { replace: true }); }} className="text-xs text-gray-500 underline">Sari onboarding</button>
            </div>
          </motion.div>
        )}

        {step===1 && (
          <motion.div key="step1" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button onClick={()=> setRole("ofiter")} className={\`w-full rounded-2xl border p-4 text-left bg-card \${role==="ofiter" ? "border-accent":"border-ui"}\`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-800 border border-gray-700"><Shield size={20}/></div>
                  <div><div className="font-semibold">Ofițer</div><div className="text-xs text-gray-500">Filieră directă/indirectă</div></div>
                </div>
              </button>
              <button onClick={()=> setRole("subofiter")} className={\`w-full rounded-2xl border p-4 text-left bg-card \${role==="subofiter" ? "border-accent":"border-ui"}\`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-800 border border-gray-700"><Swords size={20}/></div>
                  <div><div className="font-semibold">Subofițer</div><div className="text-xs text-gray-500">Parcurs ghidat</div></div>
                </div>
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <button onClick={()=> setFiliera("directa")} className={\`w-full rounded-2xl border p-4 text-left bg-card \${filiera==="directa" ? "border-accent":"border-ui"}\`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-800 border border-gray-700"><Target size={20}/></div>
                  <div><div className="font-semibold">Filieră directă</div><div className="text-xs text-gray-500">Concurs / admitere</div></div>
                </div>
              </button>
              <button onClick={()=> setFiliera("indirecta")} className={\`w-full rounded-2xl border p-4 text-left bg-card \${filiera==="indirecta" ? "border-accent":"border-ui"}\`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-800 border border-gray-700"><BookOpenCheck size={20}/></div>
                  <div><div className="font-semibold">Filieră indirectă</div><div className="text-xs text-gray-500">Schimbare de armă / specializare</div></div>
                </div>
              </button>
            </div>
            <div className="mt-5 text-xs text-gray-500">Pas 1/3</div>
            <div className="mt-3 flex gap-2 justify-end">
              <button onClick={next} disabled={!role || !filiera} className={\`px-4 py-2 rounded-xl btn-accent \${(!role || !filiera) ? "opacity-40":""}\`}>Continuă</button>
            </div>
          </motion.div>
        )}

        {step===2 && (
          <motion.div key="step2" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
            <div className="text-sm text-gray-500 mb-2">Alege arma / specialitatea</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Infanterie","Tancuri","Vânători de munte","Artilerie","Geniu","Comunicații","Logistică","Medical"].map((a)=> (
                <button key={a} onClick={()=> setArma(a as any)} className={\`w-full rounded-2xl border p-4 text-left bg-card \${arma===a ? "border-accent":"border-ui"}\`}>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gray-800 border border-gray-700"><Target size={20}/></div>
                    <div><div className="font-semibold">{a}</div><div className="text-xs text-gray-500">Curriculum dedicat</div></div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-5 text-xs text-gray-500">Pas 2/3</div>
            <div className="mt-3 flex gap-2 justify-between">
              <button onClick={back} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button>
              <button onClick={next} disabled={!arma} className={\`px-4 py-2 rounded-xl btn-accent \${!arma ? "opacity-40":""}\`}>Continuă</button>
            </div>
          </motion.div>
        )}

        {step===3 && (
          <motion.div key="step3" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} transition={{ type: "spring", stiffness: 320, damping: 28 }}>
            <div className="text-sm text-gray-500 mb-3">Gata!</div>
            <div className="rounded-2xl border border-ui bg-card p-4">
              <div className="text-sm">Profil creat. Poți schimba oricând din Hub sau din butonul „Schimbă profil”.</div>
            </div>
            <div className="mt-5 text-xs text-gray-500">Pas 3/3</div>
            <div className="mt-3 flex gap-2 justify-between">
              <button onClick={back} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button>
              <button onClick={finish} className="px-4 py-2 rounded-xl btn-accent">Finalizează</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
