// ===============================================
// FILE: src/pages/Onboarding.tsx
// CHANGE: lock filiera to "indirecta" and expand arms list for filiera indirecta
// ===============================================
import React, { useEffect, useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';
// import decorative background image for onboarding
import swirl from "@/assets/images/swirl.png";
import { useNavigate } from "react-router-dom";
import { setProfile, branchSlug, setFiliera } from "../lib/profile";
import { Shield, Mountain, Hammer, Radio, Truck, Cross, Building2, Swords } from "lucide-react";

// import high‑definition icons for non‑combat arms and modules.  These images were
// generated offline and stored in src/assets/icons.  We avoid depicting real
// weapons or vehicles by using abstract or stylised motifs (e.g. gears for
// engineering, lab flasks for CBRN) and support roles (e.g. crates for
// logistics).  Feel free to swap these images with your own custom artwork.
import LogisticsIcon from "@/assets/icons/logistics.png";
import AdministrationIcon from "@/assets/icons/administration.png";
import CBRNIcon from "@/assets/icons/cbrn.png";
import EngineeringIcon from "@/assets/icons/engineering.png";
import RailwayIcon from "@/assets/icons/railway.png";
import MarineIcon from "@/assets/icons/marine.png";
import InformationIcon from "@/assets/icons/information.png";

// import custom abstract icons for certain arms. These neon artworks evoke the essence
// of heavy armour, mobility and artillery without depicting specific real‑world vehicles.
import tankIcon from "@/assets/arm_icons/tank.png";
import autoIcon from "@/assets/arm_icons/auto.png";
import artilleryIcon from "@/assets/arm_icons/artillery.png";

type Step = 0|1|2|3;
export default function Onboarding(){
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [role, setRole] = useState<"ofiter"|"subofiter"|null>(null);
  // filiera este forțată pe "indirecta"
  const filiera: "indirecta" = "indirecta";
  const [arma, setArma] = useState<string|null>(null);
  const pct = step===0 ? 10 : step===1 ? 60 : step===2 ? 100 : 100;
  const next = ()=> setStep(prev => {
    const n = prev + 1;
    return (n > 2 ? 2 : n) as Step;
  });
  const back = ()=> setStep(prev => {
    const n = prev - 1;
    return (n < 0 ? 0 : n) as Step;
  });

  useEffect(()=>{ setFiliera("indirecta"); },[]);

  // Set page title
  usePageTitle('Onboarding');

  function finish(){
    setProfile({ role, filiera, branch: arma } as any);
    localStorage.setItem("onboarding_completed","1");
    nav(`/module/${branchSlug(arma as any)}`, { replace: true });
  }
  const ARMS: { label: string; icon: React.ReactNode }[] = [
    // Standard arms use Lucide icons. Selected arms override the default with
    // high‑definition artwork imported from src/assets/icons.  Each custom
    // image is wrapped in an <img> tag with consistent sizing to match the
    // vector icons.  Only non‑combat branches are represented here; combat
    // specialties (Infanterie, Vânători de munte, Tancuri, Artilerie, RAA,
    // Forțe speciale etc.) continue to use vector icons until appropriate
    // artwork is provided by the user.
    { label: "Infanterie", icon: <Swords className="w-4 h-4" /> },
    { label: "Vânători de munte", icon: <Mountain className="w-4 h-4" /> },
    { label: "Tancuri", icon: <img src={tankIcon} alt="Tancuri icon" className="w-6 h-6" /> },
    { label: "Artilerie & rachete (terestre)", icon: <img src={artilleryIcon} alt="Artilerie icon" className="w-6 h-6" /> },
    { label: "Rachete și artilerie antiaeriană", icon: <img src={artilleryIcon} alt="Artilerie antiaeriană icon" className="w-6 h-6" /> },
    // Engineering (Geniu) uses the cogwheel artwork
    { label: "Geniu", icon: <img src={EngineeringIcon} alt="Geniu icon" className="w-6 h-6" /> },
    // CBRN defence uses laboratory flasks icon
    { label: "Apărare CBRN", icon: <img src={CBRNIcon} alt="CBRN icon" className="w-6 h-6" /> },
    // Research and information share the eye/network icon until a dedicated
    // research icon is provided
    { label: "Cercetare", icon: <img src={InformationIcon} alt="Cercetare icon" className="w-6 h-6" /> },
    { label: "Cercetare CBRN", icon: <img src={CBRNIcon} alt="Cercetare CBRN icon" className="w-6 h-6" /> },
    { label: "Informații militare", icon: <img src={InformationIcon} alt="Informații icon" className="w-6 h-6" /> },
    { label: "Poliție militară", icon: <Shield className="w-4 h-4" /> },
    { label: "Forțe speciale", icon: <Shield className="w-4 h-4" /> },
    { label: "Comunicații", icon: <Radio className="w-4 h-4" /> },
    { label: "Auto", icon: <img src={autoIcon} alt="Auto icon" className="w-6 h-6" /> },
    { label: "Administrație", icon: <img src={AdministrationIcon} alt="Administrație icon" className="w-6 h-6" /> },
    { label: "Construcții", icon: <Building2 className="w-4 h-4" /> },
    { label: "Căi ferate", icon: <img src={RailwayIcon} alt="Căi ferate icon" className="w-6 h-6" /> },
    { label: "Muzici militare", icon: <Shield className="w-4 h-4" /> },
    { label: "Infanterie marină", icon: <img src={MarineIcon} alt="Infanterie marină icon" className="w-6 h-6" /> },
    { label: "Logistică", icon: <img src={LogisticsIcon} alt="Logistică icon" className="w-6 h-6" /> },
    // Intendență este o specialitate înrudită cu Logistica; folosim aceeași pictogramă
    { label: "Intendență", icon: <img src={LogisticsIcon} alt="Intendență icon" className="w-6 h-6" /> },
    { label: "Medical (Sanitar)", icon: <Cross className="w-4 h-4" /> },
  ];
  return (
    <div className="min-h-screen bg-black text-gray-200 px-4 pt-6 pb-10 max-w-xl mx-auto relative">
      {/* Decorative hero image for onboarding */}
      <div className="mb-4">
        <img src={swirl} alt="Decorative neon swirl" className="w-full h-40 object-cover rounded-xl shadow-md" />
      </div>
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
              <button key={label} onClick={()=> setArma(label)} className={`rounded-2xl border p-4 text-left bg-card ${arma===label?"border-accent":"border-ui"} transition-transform transform hover:scale-[1.03] hover:shadow-md`}>
                <div className="flex items-center gap-3">
                  {/* Animated icon container */}
                  <div className="p-2 rounded-lg bg-black/40 border border-ui text-accent animate-pulse">
                    {icon}
                  </div>
                  <div className="flex-1">
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
