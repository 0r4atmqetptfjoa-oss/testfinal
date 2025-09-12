
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Target, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Selection = { category?: string; track?: string; branch?: string };
const steps = ["Alege categoria", "Alege filiera", "Alege specialitatea"] as const;
type Step = 0 | 1 | 2;

const pageVariants = {
  enter: (dir: number) => ({ opacity: 0, y: 12, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, y: 0, x: 0, transition: { type: "spring", stiffness: 320, damping: 26 } },
  exit: (dir: number) => ({ opacity: 0, y: 12, x: dir > 0 ? -40 : 40 }),
};

function ProgressBar({ percent }: { percent: number }){
  return (
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
      <motion.div
        className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ type: "tween", duration: 0.35 }}
      />
    </div>
  );
}

function SelectCard({
  selected, icon, title, subtitle, onClick
}: { selected?: boolean; icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }){
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl border p-4 bg-gray-900 hover:scale-[1.03] transition-transform
      focus:outline-none focus:ring-2 focus:ring-violet-500/40
      ${selected ? "border-violet-500" : "border-gray-700 hover:border-violet-500/70"}`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200">{icon}</div>
        <div className="flex-1">
          <div className="text-gray-200 font-semibold text-lg">{title}</div>
          <div className="text-gray-400 text-sm">{subtitle}</div>
        </div>
        <ChevronRight className="text-gray-500" />
      </div>
    </button>
  );
}

export default function Onboarding(){
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [dir, setDir] = useState(1);
  const [sel, setSel] = useState<Selection>({});

  const percent = useMemo(()=> Math.round(((step+1)/3)*100), [step]);

  const goNext = () => { setDir(1); setStep((s)=> Math.min(2, (s+1) as Step) as Step); };
  const goPrev = () => { setDir(-1); setStep((s)=> Math.max(0, (s-1) as Step) as Step); };

  const complete = () => {
    localStorage.setItem("userSelection", JSON.stringify(sel));
    nav("/home");
  };

  const categories = [
    { key: "Ofițeri", icon: <Shield size={24}/>, sub: "Pregătire și examene pentru ofițeri" },
    { key: "Subofițeri", icon: <Target size={24}/>, sub: "Traseu dedicat subofițerilor" },
    { key: "Maiștri", icon: <Target size={24}/>, sub: "Modul pentru maiștri militari" },
  ];
  const tracks = [
    { key: "Directă", icon: <BookOpen size={24}/>, sub: "Acces direct în corpul de cadre" },
    { key: "Recrutare", icon: <BookOpen size={24}/>, sub: "Traseu prin școli militare" },
  ];
  const branches = [
    { key: "Intendență", icon: <BookOpen size={24}/>, sub: "Logistică și sprijin" },
    { key: "Infanterie", icon: <BookOpen size={24}/>, sub: "Operații terestre" },
    { key: "Geniu", icon: <BookOpen size={24}/>, sub: "Suport de luptă" },
  ];

  const pages: React.ReactNode[] = [
    categories.map(c => (
      <SelectCard key={c.key}
        selected={sel.category === c.key}
        icon={c.icon}
        title={c.key}
        subtitle={c.sub}
        onClick={()=>{ setSel(s=>({...s, category: c.key})); goNext(); }}
      />
    )),
    tracks.map(t => (
      <SelectCard key={t.key}
        selected={sel.track === t.key}
        icon={t.icon}
        title={t.key}
        subtitle={t.sub}
        onClick={()=>{ setSel(s=>({...s, track: t.key})); goNext(); }}
      />
    )),
    branches.map(b => (
      <SelectCard key={b.key}
        selected={sel.branch === b.key}
        icon={b.icon}
        title={b.key}
        subtitle={b.sub}
        onClick={()=>{ setSel(s=>({...s, branch: b.key})); }}
      />
    )),
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="space-y-2">
          <ProgressBar percent={percent} />
          <div className="text-xs text-gray-400">{step+1}/3 • {steps[step]}</div>
        </div>

        <div className="text-center space-y-1">
          <motion.h1 initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.35}}
            className="text-3xl font-bold">Bun venit, aspirant!</motion.h1>
          <p className="text-gray-400">Alege câteva opțiuni pentru a-ți personaliza pregătirea.</p>
        </div>

        <div className="relative">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={step} custom={dir} variants={pageVariants} initial="enter" animate="center" exit="exit">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pages[step]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button onClick={goPrev} disabled={step===0}
            className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 disabled:opacity-40 bg-gray-900 hover:border-violet-500 transition-colors">
            Înapoi
          </button>
          {step<2 ? (
            <button onClick={goNext}
              className="px-4 py-2 rounded-xl border border-gray-700 bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-95">
              Continuă
            </button>
          ) : (
            <button onClick={complete}
              className="px-4 py-2 rounded-xl border border-gray-700 bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-95">
              Gata • Începe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
