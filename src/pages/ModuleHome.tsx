// ===============================================
// FILE: src/pages/ModuleHome.tsx
// CHANGE: dynamic exam subtitle per branch + 'Ghid Filiera Indirectă' card
// ===============================================
import React, { useMemo } from "react";
import usePageTitle from '@/hooks/usePageTitle';
import { useNavigate, useParams } from "react-router-dom";
import { sound } from "../lib/sound";
import { haptics } from "../lib/haptics";
import { BookOpen, Shield, Globe, Brain, FileText, Medal, BrainCircuit, ListChecks } from "lucide-react";
// import colourful module icons for a richer UI
import LearningIcon from '@/assets/icons/learning.png';
import ExamIcon from '@/assets/icons/exam.png';
import PsychologyIcon from '@/assets/icons/psychology.png';
import BadgesIcon from '@/assets/icons/badges.png';
import AdaptiveIcon from '@/assets/icons/adaptive.png';
import { getProfile } from "../lib/profile";

function Card({ title, subtitle, onClick, icon }:{title:string; subtitle:string; onClick:()=>void; icon:React.ReactNode}){
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.98] flex items-center gap-3 w-full hover:border-accent transition-transform transform hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Animated icon */}
      <div className="p-2 rounded-lg bg-black/40 border border-ui animate-pulse">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted">{subtitle}</div>
      </div>
    </button>
  );
}

export default function ModuleHome(){
  const { slug } = useParams(); const nav = useNavigate();
  const p = getProfile();
  const examSubtitle = useMemo(()=>{
    const b = (p?.branch||"").toString().toLowerCase();
    if (b.includes("medical") || b.includes("sanitar")) return "90 întrebări: 10 legislație + 80 specialitate (engleză eliminatorie)";
    if (b.includes("artilerie") || b.includes("rachete") || b.includes("antiaerian")) return "90 întrebări: 90 legislație (engleză eliminatorie)";
    if (b.includes("logistic")) return "90 întrebări: 30 legislație + 60 specialitate";
    return "90 întrebări: 30 legislație + 60 specialitate";
  },[p?.branch]);

  // Set the page title dynamically based on the module slug
  usePageTitle(slug ? `Modul: ${slug}` : 'Modul');

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-1 capitalize">Modul: {slug}</h1>
      <p className="text-sm text-muted mb-4">Selectează una dintre opțiuni.</p>
      <div className="grid grid-cols-1 gap-3">
        <Card title="Ghid Filiera Indirectă" subtitle="Proces, criterii, selecție și admitere" icon={<FileText size={20}/>} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/ghid"); }} />
        <Card title="Mod învățare" subtitle="Capitole & tematică — studiază teoria pentru examene" icon={<img src={LearningIcon} alt="Învățare" className="w-5 h-5" />} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/learning"); }} />
        <Card title="Simulare Examen" subtitle={examSubtitle} icon={<img src={ExamIcon} alt="Simulare examen" className="w-5 h-5" />} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/exam"); }}/>
        <Card title="Teste Engleză" subtitle="Seturi oficiale — probă eliminatorie" icon={<Globe size={20}/>} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/english"); }}/>
        <Card title="Evaluare Psihologică" subtitle="Teste de aptitudini generale" icon={<img src={PsychologyIcon} alt="Evaluare psihologică" className="w-5 h-5" />} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/psychology"); }}/>
        {/* Teste generale – seturi de întrebări din toate tematicile */}
        <Card title="Teste generale" subtitle="Examene mixte — întrebări din toate tematicile" icon={<ListChecks size={20}/>} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/all-tests"); }} />
        {/* Insigne (Badges) – mutat aici deoarece nu se mai află în bara de navigare */}
        <Card title="Insigne" subtitle="Badge‑uri & niveluri — vezi insignele câștigate" icon={<img src={BadgesIcon} alt="Insigne" className="w-5 h-5" />} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/badges"); }} />
        {/* Învățare adaptivă – modul AI pentru antrenament adaptiv */}
        <Card title="Învățare adaptivă" subtitle="Mod AI personalizat — întrebări adaptate răspunsurilor tale" icon={<img src={AdaptiveIcon} alt="Învățare adaptivă" className="w-5 h-5" />} onClick={()=> { haptics.light(); sound.ui(); (nav as any)("/adaptive-learning"); }} />
      </div>
    </div>
  );
}
