
import React, { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle, XCircle, Award } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Toast from "@/components/Toast";
import Lottie from "@/components/Lottie";
import EdgeLighting from "@/components/EdgeLighting";
import { awardXP } from "@/lib/game";
import { vibrate } from "@/lib/haptics";
import { sfxCorrect, sfxWrong, sfxFinish } from "@/lib/sound";

import badgeFirst from "@/assets/lottie/badge_first.json";
import badgePerfect from "@/assets/lottie/badge_perfect.json";

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
  const [edge, setEdge] = useState<"idle"|"correct"|"wrong"|"progress"|"done">("idle");

  const item = items[index];
  const progress = Math.round((index/items.length)*100);

  const showXP = (txt: string) => { setToast(txt); setShowToast(true); setTimeout(()=> setShowToast(false), 900); };
  const select = (c: string) => { if (!revealed) setSelected(c); };

  const check = () => {
    if (selected == null || revealed) return;
    const ok = selected === item.answer;
    if (ok){
      setScore(s=>s+1); sfxCorrect(); vibrate("success"); setEdge("correct");
      awardXP(10, "answer_correct"); setXpGain(x=>x+10); showXP("+10 XP");
    } else {
      sfxWrong(); vibrate("error"); setEdge("wrong");
      awardXP(2, "answer_wrong"); setXpGain(x=>x+2); showXP("+2 XP");
    }
    setRevealed(true);
    setTimeout(()=> setEdge("progress"), 420);
  };

  const next = () => {
    if (index+1 < items.length){
      setIndex(i=>i+1); setSelected(null); setRevealed(false);
      setEdge("progress");
    } else { finish(); }
  };

  const finish = () => {
    const perfect = score === items.length;
    if (perfect){ awardXP(20, "test_perfect"); setXpGain(x=>x+20); vibrate("perfect"); }
    awardXP(10, "test_complete_first"); setXpGain(x=>x+10);
    sfxFinish(); setEdge("done");
    setView("summary"); onFinish?.(score);
  };

  if (!item && view === "play"){ return <div className="text-muted">Nu există întrebări.</div>; }

  if (view === "summary"){
    const perfect = score === items.length;
    return (
      <div className="min-h-[60vh] rounded-2xl border border-ui bg-card p-6 text-gray-200 relative">
        <EdgeLighting status="done"/>
        <div className="text-2xl font-bold mb-1">Rezumat test</div>
        <div className="text-sm text-muted mb-4">Scor: {score}/{items.length} • XP câștigat: {xpGain}</div>

        <div className="space-y-3 mb-6">
          <div className="rounded-2xl border border-ui bg-card p-4 flex items-center gap-3">
            <Lottie src={badgeFirst} style={{ width: 56, height: 56 }} />
            <div className="flex-1">
              <div className="font-medium">Badge: Primul zbor</div>
              <div className="text-xs text-muted">Finalizează primul test</div>
            </div>
          </div>
          {perfect && (
            <div className="rounded-2xl border border-ui bg-card p-4 flex items-center gap-3">
              <Lottie src={badgePerfect} style={{ width: 56, height: 56 }} />
              <div className="flex-1">
                <div className="font-medium">Badge: Perfect 10</div>
                <div className="text-xs text-muted">Obține scor maxim într-un test</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>{ setIndex(0); setScore(0); setXpGain(0); setSelected(null); setRevealed(false); setView('play'); setEdge('progress'); }} className="px-4 py-2 rounded-xl btn-accent">Încearcă din nou</button>
          <button onClick={()=> window.location.assign('/home')} className="px-4 py-2 rounded-xl border border-ui bg-card hover:border-accent">Continuă</button>
          <button onClick={()=> alert('Modul de revizuire urmează')} className="px-4 py-2 rounded-xl border border-ui bg-card hover:border-accent">Revizuiește</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 relative">
      <EdgeLighting status={edge}/>
      <ProgressBar percent={progress} accent="cyan" />
      <motion.div drag="x" dragElastic={0.1} dragConstraints={{ left: 0, right: 0 }} className="rounded-2xl border border-ui bg-card p-4 mt-3">
        <div className="text-xs text-muted mb-2">Întrebarea {index+1} / {items.length} • swipe ←/→</div>
        <div className="text-lg font-bold mb-3">{item.question}</div>
        <div className="space-y-2">
          {item.choices.map((c)=>{
            const isCorrect = revealed && c === item.answer;
            const isWrongSel = revealed && selected === c && !isCorrect;
            const faded = revealed && !isCorrect && selected !== c;
            return (
              <button
                key={c}
                onClick={()=> !revealed && setSelected(c)}
                disabled={revealed}
                className={`w-full text-left rounded-xl border p-3 bg-card active:scale-[0.98] transition-transform
                  ${selected===c ? "border-accent" : "border-ui"} ${faded ? "opacity-50" : ""}`}
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
            <button onClick={check} disabled={selected==null} className={`px-4 py-2 rounded-xl btn-accent ${selected==null ? "opacity-40" : ""}`}>
              Verifică răspunsul
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={()=> setIndex(i=>Math.max(0,i-1))} className="px-4 py-2 rounded-xl border border-ui bg-card">Înapoi</button>
              <button onClick={next} className="px-4 py-2 rounded-xl btn-accent">Următoarea</button>
            </div>
          )}
        </div>
      </motion.div>
      <Toast text={toast} show={showToast} />
    </div>
  );
}
