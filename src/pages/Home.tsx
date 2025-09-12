
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, BookOpen, Shield, Library, Activity, Flame, Trophy } from "lucide-react";
import { last7DaysActivity, loadGame, levelFromXP } from "@/lib/game";
import BentoCard from "@/components/BentoCard";
import WeeklyBar from "@/components/WeeklyBar";
import Stat from "@/components/Stat";
import { motion } from "framer-motion";

type ModuleCard = { icon: React.ReactNode; title: string; route: string };

export default function Home(){
  const nav = useNavigate();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(()=>{
    const s = loadGame();
    setXp(s.xp); setStreak(s.streak);
  }, []);

  const weekly = useMemo(()=> last7DaysActivity().map(d=>d.xp), []);
  const lvl = levelFromXP(xp);

  const modules: ModuleCard[] = [
    { icon: <BookOpen size={20}/>, title: "Mod Învățare", route: "/learning" },
    { icon: <Shield size={20}/>, title: "Simulare Examen", route: "/exam" },
    { icon: <Library size={20}/>, title: "Teste Generale", route: "/all-tests" },
    { icon: <Activity size={20}/>, title: "Pregătire Fizică", route: "/fitness" },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Salut, Răzvan!</h1>
          <div className="text-sm text-gray-500">Nivel {lvl.level} • {Math.round(lvl.pct*100)}% către următorul</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-sm flex items-center gap-1"><Flame className="text-orange-500" size={16}/> {streak} zile</div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 px-3 py-2 text-sm flex items-center gap-1"><Trophy className="text-violet-500" size={16}/> {xp} XP</div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 auto-rows-[minmax(120px,auto)] gap-3">
        {/* Card mare: Misiunea zilei */}
        <BentoCard glow className="col-span-12 md:col-span-8 row-span-2">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="text-sm text-gray-500 mb-1">Misiunea Zilei</div>
              <div className="text-xl font-semibold mb-2">Completează 10 întrebări de Tactică</div>
              <div className="text-sm text-gray-500">Obiectiv: 10/10 • Recomandat: 8–12 min</div>
            </div>
            <div className="mt-3">
              <button onClick={()=> nav("/adaptive-learning")} className="px-4 py-2 rounded-xl bg-violet-500 text-white hover:opacity-90">
                Începe Misiunea
              </button>
            </div>
          </div>
        </BentoCard>

        {/* Progres săptămânal */}
        <BentoCard className="col-span-12 md:col-span-4 row-span-2">
          <div className="text-sm text-gray-500 mb-2">Progresul tău (7 zile)</div>
          <WeeklyBar values={weekly} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Stat label="Zile active" value={`${weekly.filter(v=>v>0).length}/7`} />
            <Stat label="XP/zi (medie)" value={`${Math.round(weekly.reduce((a,b)=>a+b,0)/7)}`} />
          </div>
        </BentoCard>

        {/* Statistici rapide */}
        <BentoCard className="col-span-12 md:col-span-4">
          <div className="text-sm text-gray-500 mb-1">Statistici rapide</div>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Răspunsuri corecte" value="—" />
            <Stat label="Timp de studiu" value="—" />
          </div>
        </BentoCard>

        {/* Card navigare - Antrenament Inteligent */}
        <BentoCard glow onClick={()=> nav("/adaptive-learning")} className="col-span-6 md:col-span-2 cursor-pointer">
          <div className="h-full flex flex-col items-start justify-between">
            <div className="p-2 rounded-lg bg-gray-800 border border-gray-700"><BrainCircuit size={20}/></div>
            <div className="font-medium">Antrenament Inteligent</div>
          </div>
        </BentoCard>

        {/* Restul modulelor */}
        {modules.map((m, idx)=>(
          <BentoCard key={idx} onClick={()=> nav(m.route)} className="col-span-6 md:col-span-2 cursor-pointer hover:shadow-[0_0_0_2px_rgba(139,92,246,0.35)]">
            <div className="h-full flex flex-col items-start justify-between">
              <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">{m.icon}</div>
              <div className="font-medium">{m.title}</div>
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
}
