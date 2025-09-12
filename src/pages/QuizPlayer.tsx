
import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Award } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Toast from "@/components/Toast";
import { awardXP, haptic, checkBadges } from "@/lib/game";
import { sfxCorrect, sfxWrong, sfxFinish, sfxBadge } from "@/lib/sound";

export type QuizItem = { id: string; question: string; choices: string[]; answer: string; why?: string; };

export default function QuizPlayer({ items, onFinish }: { items: QuizItem[]; onFinish?: (score: number) => void }){
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [toast, setToast] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [view, setView] = useState<"play"|"summary">("play");
  const startedAt = useRef<number>(Date.now());

  const item = items[index];
  const progress = Math.round((index/items.length)*100);

  const showXP = (txt: string) => {
    setToast(txt); setShowToast(true);
    setTimeout(()=> setShowToast(false), 900);
  };

  const select = (c: string) => { if (!revealed) setSelected(c); };

  const check = () => {
    if (selected == null || revealed) return;
    const ok = selected === item.answer;
    if (ok){
      setScore(s=>s+1);
      sfxCorrect(); haptic("success");
      awardXP(10, "answer_correct");
      setXpGain(x=>x+10); showXP("+10 XP");
    } else {
      sfxWrong(); haptic("error");
      awardXP(2, "answer_wrong");
      setXpGain(x=>x+2); showXP("+2 XP");
    }
    setRevealed(true);
  };

  const next = () => {
    if (index+1 < items.length){
      setIndex(i=>i+1); setSelected(null); setRevealed(false);
    } else {
      finish();
    }
  };

  const finish = () => {
    const durationSec = Math.round((Date.now() - startedAt.current)/1000);
    const perfect = score === items.length;
    if (perfect){ awardXP(20, "test_perfect"); setXpGain(x=>x+20); }
    // first test completion heuristic: if score>0 and items>0, pass reason
    awardXP(10, "test_complete_first");
    setXpGain(x=>x+10);
    sfxFinish(); haptic("impact");
    setView("summary");
    onFinish?.(score);
  };

  if (!item && view === "play"){
    return <div className="text-gray-500">Nu există întrebări.</div>;
  }

  if (view === "summary"){
    const perfect = score === items.length;
    return (
      <div className="min-h-[60vh] rounded-2xl border border-gray-800 bg-gray-900 p-6 text-gray-200">
        <div className="text-2xl font-bold mb-1">Rezumat test</div>
        <div className="text-sm text-gray-500 mb-4">Scor: {score}/{items.length} • XP câștigat: {xpGain}</div>

        {/* Badge unlocked animations */}
        <div className="space-y-2 mb-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
            className="rounded-xl border border-gray-800 bg-gray-900 p-4 flex items-center gap-3">
            <Award className="text-violet-500" />
            <div className="flex-1">
              <div className="font-medium">Badge: Primul zbor</div>
              <div className="text-sm text-gray-500">Finalizează primul test</div>
            </div>
          </motion.div>
          {perfect && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.05 }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-4 flex items-center gap-3">
              <Award className="text-cyan-400" />
              <div className="flex-1">
                <div className="font-medium">Badge: Perfect 10</div>
                <div className="text-sm text-gray-500">Obține scor maxim într-un test</div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={()=> setView("play")} className="px-4 py-2 rounded-xl bg-violet-500 text-white">Încearcă din nou</button>
          <button onClick={()=> window.location.assign('/')} className="px-4 py-2 rounded-xl border border-gray-800 bg-gray-900 hover:border-violet-500">Continuă</button>
          <button onClick={()=> alert('Modul de revizuire urmează')} className="px-4 py-2 rounded-xl border border-gray-800 bg-gray-900 hover:border-violet-500">Revizuiește</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ProgressBar percent={progress} accent="cyan" />

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-4">
        <div className="text-sm text-gray-500 mb-2">Întrebarea {index+1} / {items.length}</div>
        <div className="text-xl font-bold mb-4">{item.question}</div>

        <div className="space-y-2">
          {item.choices.map((c)=>{
            const isCorrect = revealed && c === item.answer;
            const isWrongSel = revealed && selected === c && !isCorrect;
            const faded = revealed && !isCorrect && selected !== c;
            return (
              <button
                key={c}
                onClick={()=> select(c)}
                disabled={revealed}
                className={`w-full text-left rounded-xl border p-3 bg-gray-900 hover:scale-[1.03] transition-transform
                  ${selected===c ? "border-violet-500" : "border-gray-800 hover:border-violet-500/70"} ${faded ? "opacity-50" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-200">{c}</span>
                  {isCorrect && <CheckCircle className="text-green-500" size={20}/>}
                  {isWrongSel && <XCircle className="text-red-500" size={20}/>}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-4">
          {!revealed ? (
            <button
              onClick={check}
              disabled={selected==null}
              className="px-4 py-2 rounded-xl bg-violet-500 text-white disabled:opacity-40"
            >
              Verifică răspunsul
            </button>
          ) : (
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl bg-violet-500 text-white"
            >
              Următoarea Întrebare
            </button>
          )}
        </div>
      </div>

      <Toast text={toast} show={showToast} />
    </div>
  );
}
