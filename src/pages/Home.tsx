
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Play, BookOpen, Shield, Library, Activity, BrainCircuit } from "lucide-react";
import ListRow from "@/components/ListRow";
import PageHeader from "@/components/PageHeader";

type ModuleItem = { icon: React.ReactNode; title: string; subtitle: string; route: string };

export default function Home(){
  const nav = useNavigate();
  const selection = useMemo(()=>{
    try { return JSON.parse(localStorage.getItem("userSelection") || "{}"); } catch { return {}; }
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
      <PageHeader
        title="Salut, Răzvan!"
        subtitle={selection?.category ? (<span>{selection.category} • Filiera {selection.track} • {selection.branch}</span>) : "Bine ai revenit în platformă."}
      />

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

      <div className="space-y-2">
        {modules.map((m) => (
          <ListRow key={m.title} icon={m.icon} title={m.title} subtitle={m.subtitle} onClick={()=> nav(m.route)} />
        ))}
      </div>
    </div>
  );
}
