
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, Brain, Shield, Library, Activity, BrainCircuit } from "lucide-react";

const stagger = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.28 } }),
};

type ModuleItem = { icon: React.ReactNode; title: string; subtitle: string; route: string };

export default function Home(){
  const nav = useNavigate();
  const selection = useMemo(()=>{
    try { return JSON.parse(localStorage.getItem("userSelection") || "{}"); } catch { return {}; }
  }, []);

  useEffect(()=>{
    // nothing, just a placeholder for future analytics
  }, []);

  const modules: ModuleItem[] = [
    { icon: <BrainCircuit size={20}/>, title: "Antrenament Inteligent", subtitle: "Sesiune adaptivă ghidată de AI", route: "/adaptive-learning" },
    { icon: <BookOpen size={20}/>, title: "Mod învățare", subtitle: "Rezumate și tematica completă", route: "/learning" },
    { icon: <Shield size={20}/>, title: "Simulare Examen", subtitle: "30 legislație + 60 specialitate", route: "/exam" },
    { icon: <Library size={20}/>, title: "Teste Generale", subtitle: "Filtre pe module și număr de itemi", route: "/all-tests" },
    { icon: <Activity size={20}/>, title: "Pregătire Fizică", subtitle: "Antrenament 2km cu GPS", route: "/fitness" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 max-w-3xl mx-auto space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg text-gray-400">Salut, Răzvan!</h2>
        <div className="text-sm text-gray-500">
          {selection?.category ? (<span>{selection.category} • Filiera {selection.track} • {selection.branch}</span>) : <span>Bine ai revenit în platformă.</span>}
        </div>
      </header>

      {/* Hero: Continuă */}
      <div className="rounded-2xl border border-gray-700 bg-gray-900 p-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Continuă de unde ai rămas</div>
          <div className="text-gray-400 text-sm">Reluăm ultimul modul învățat, exact la întrebarea următoare.</div>
        </div>
        <button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-95"
          onClick={()=> nav("/adaptive-learning")}
        >
          <div className="flex items-center gap-2"><Play size={18}/> Continuă</div>
        </button>
      </div>

      {/* Lista de module */}
      <div className="space-y-2">
        {modules.map((m, i) => (
          <motion.button
            key={m.title}
            custom={i}
            initial="hidden"
            animate="show"
            variants={stagger}
            whileHover={{ scale: 1.03 }}
            onClick={()=> nav(m.route)}
            className="w-full rounded-2xl border border-gray-700 bg-gray-900 p-4 text-left hover:border-violet-500 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-800 border border-gray-700">{m.icon}</div>
              <div className="flex-1">
                <div className="font-medium">{m.title}</div>
                <div className="text-gray-400 text-sm">{m.subtitle}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
