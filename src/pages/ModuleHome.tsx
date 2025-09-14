
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sound } from "../lib/sound";
import { haptics } from "../lib/haptics";
import { BookOpen, Shield, Globe, Brain } from "lucide-react";

function Card({ title, subtitle, onClick, icon }:{title:string; subtitle:string; onClick:()=>void; icon:React.ReactNode}){
  return (
    <button onClick={onClick} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99] flex items-center gap-3 w-full hover:border-accent">
      <div className="p-2 rounded-lg bg-black/40 border border-ui">{icon}</div>
      <div className="flex-1"><div className="text-sm font-medium">{title}</div><div className="text-xs text-muted">{subtitle}</div></div>
    </button>
  );
}

export default function ModuleHome(){
  const { slug } = useParams(); const nav = useNavigate();
  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <h1 className="text-xl font-bold mb-1 capitalize">Modul: {slug}</h1>
      <p className="text-sm text-muted mb-4">Selectează una dintre opțiuni.</p>
      <div className="grid grid-cols-1 gap-3">
        <Card title="Mod învățare" subtitle="Capitole & tematică" icon={<BookOpen size={18}/>} onClick={()=> { haptics.light(); sound.ui(); nav("/learning"); }} />
        <Card title="Simulare Examen" subtitle="30 legislație + 60 specialitate" icon={<Shield size={18}/>} onClick={()=> { haptics.light(); sound.ui(); nav("/exam"); }}/>
        <Card title="Teste Engleză" subtitle="Seturi oficiale" icon={<Globe size={18}/>} onClick={()=> { haptics.light(); sound.ui(); nav("/english"); }}/>
        <Card title="Evaluare Psihologică" subtitle="Baterii generale" icon={<Brain size={18}/>} onClick={()=> { haptics.light(); sound.ui(); nav("/psychology"); }}/>
      </div>
    </div>
  );
}
