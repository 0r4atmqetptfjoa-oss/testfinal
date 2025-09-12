
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, BookOpen, Shield, Library, Activity, Flame, Trophy, Search } from "lucide-react";
import { last7DaysActivity, loadGame, levelFromXP } from "@/lib/game";
import { shareText } from "@/lib/mobile";
import PullToRefresh from "@/components/PullToRefresh";
import AnimatedCounter from "@/components/AnimatedCounter";
import AccentPickerPro from "@/components/AccentPickerPro";
import MobileNavBar from "@/components/MobileNavBar";
import CommandPalettePro from "@/components/CommandPalettePro";
import Coachmarks from "@/components/Coachmarks";

type ModuleCard = { icon: React.ReactNode; title: string; route: string };

function Card({ children, onClick }: { children: React.ReactNode; onClick?: ()=>void }){
  return (
    <button onClick={onClick} className="rounded-2xl border border-ui bg-card p-4 text-left active:scale-[0.99]">
      {children}
    </button>
  );
}

export default function Home(){
  const nav = useNavigate();
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [palOpen, setPalOpen] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [feed, setFeed] = useState<{title: string; subtitle: string}[]>([]);

  useEffect(()=>{
    const s = loadGame();
    setXp(s.xp); setStreak(s.streak);
    // demo feed
    setLoadingFeed(true);
    setTimeout(()=>{
      setFeed([
        { title: "Tactică: Dispozitive de luptă", subtitle: "Recomandat pentru azi" },
        { title: "Legislație: Drepturile militarilor", subtitle: "Capitol 2.1" },
        { title: "Logistică: Aprovizionare", subtitle: "Revizuire rapidă" },
      ]);
      setLoadingFeed(false);
    }, 600);
  }, []);

  const weekly = useMemo(()=> last7DaysActivity().map(d=>d.xp), []);
  const lvl = levelFromXP(xp);

  const modules: ModuleCard[] = [
    { icon: <BookOpen size={20}/>, title: "Mod Învățare", route: "/learning" },
    { icon: <Shield size={20}/>, title: "Simulare Examen", route: "/exam" },
    { icon: <Library size={20}/>, title: "Teste Generale", route: "/all-tests" },
    { icon: <Activity size={20}/>, title: "Pregătire Fizică", route: "/fitness" },
  ];

  async function refresh(){
    setLoadingFeed(true);
    await new Promise(r=> setTimeout(r, 800));
    setFeed([
      { title: "Comunicatii: Radiocomunicații", subtitle: "Întărește noțiunile-cheie" },
      { title: "Tactică: Acoperiri și deghizare", subtitle: "11 min" },
      { title: "Legislație: Regulamente", subtitle: "Capitol 3" },
    ]);
    setLoadingFeed(false);
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 relative">
      <Coachmarks/>
      <header className="flex items-center justify-between mb-3">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold">Salut, Răzvan!</h1>
          <div className="text-xs text-muted">Nivel <AnimatedCounter value={lvl.level}/> • {Math.round(lvl.pct*100)}% către următorul</div>
        </div>
        <div className="flex items-center gap-2">
          <AccentPickerPro/>
        </div>
      </header>

      <PullToRefresh onRefresh={refresh}>
        {/* Hero */}
        <Card onClick={()=> nav("/adaptive-learning")}>
          <div>
            <div className="text-xs text-muted mb-1">Misiunea Zilei</div>
            <div className="text-lg font-semibold mb-1">Completează 10 întrebări de Tactică</div>
            <div className="text-xs text-muted">Obiectiv: 10/10 • Recomandat: 8–12 min</div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl btn-accent">Începe</button>
            <button onClick={(e)=>{ e.stopPropagation(); shareText("Misiunea zilei", "Completează 10 întrebări de Tactică"); }} className="px-3 py-2 rounded-xl border border-ui bg-card text-xs">Trimite</button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-xl border border-ui bg-card px-3 py-1 text-xs flex items-center gap-1"><span className="text-orange-500">🔥</span> <AnimatedCounter value={streak}/> zile</div>
            <div className="rounded-xl border border-ui bg-card px-3 py-1 text-xs flex items-center gap-1"><span className="text-accent">🏆</span> <AnimatedCounter value={xp}/> XP</div>
          </div>
        </Card>

        {/* Progres & Navigare */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Card>
            <div className="text-xs text-muted mb-2">Progresul tău (7 zile)</div>
            <div className="flex items-end justify-between gap-2">
              {weekly.map((v,i)=>{
                const max = Math.max(1, ...weekly); const h = Math.round((v / max) * 64);
                const days = ["L","M","M","J","V","S","D"];
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-6 rounded bg-cyan-400/20 border border-cyan-400/40 overflow-hidden" style={{ height: 66 }}>
                      <div className="w-full bg-cyan-400" style={{ height: h }} />
                    </div>
                    <div className="text-[10px] text-muted">{days[i]}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card onClick={()=> nav("/adaptive-learning")}>
            <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 inline-block mb-2"><BrainCircuit size={18}/></div>
            <div className="text-sm font-medium">Antrenament</div>
            <div className="text-xs text-muted">Sesiune adaptivă</div>
          </Card>

          {modules.map((m, idx)=> (
            <Card key={idx} onClick={()=> nav(m.route)}>
              <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 inline-block mb-2">{m.icon}</div>
              <div className="text-sm font-medium">{m.title}</div>
              <div className="text-xs text-muted">Intră acum</div>
            </Card>
          ))}
        </div>

        {/* Feed recomandări */}
        <div className="mt-3">
          <div className="text-xs text-muted mb-2">Recomandări pentru tine</div>
          <div className="space-y-2">
            {loadingFeed ? (
              [1,2,3].map(i=> (
                <div key={i} className="rounded-2xl border border-ui bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded bg-gray-800/60 w-10 h-10 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="animate-pulse rounded bg-gray-800/60 h-3 w-1/2" />
                      <div className="animate-pulse rounded bg-gray-800/60 h-3 w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              feed.map((f, i)=> (
                <Card key={i}>
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="text-xs text-muted">{f.subtitle}</div>
                </Card>
              ))
            )}
          </div>
        </div>
      </PullToRefresh>

      {/* Command palette FAB */}
      <button onClick={()=> setPalOpen(true)} className="fixed bottom-20 right-4 h-12 w-12 rounded-full btn-accent flex items-center justify-center shadow-xl active:scale-95 z-40">
        <Search size={20}/>
      </button>
      <CommandPalettePro open={palOpen} onClose={()=> setPalOpen(false)} onGo={(r)=> nav(r)} />

      <MobileNavBar/>
    </div>
  );
}
