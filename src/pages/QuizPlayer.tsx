
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import { playCorrect, playWrong } from "@/lib/sound";

export type QuizItem = { id: string; question: string; choices: string[]; answer: string; why?: string; };

export default function QuizPlayer({ items, onFinish }: { items: QuizItem[]; onFinish?: (score: number, mistakes: QuizItem[]) => void }){
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<QuizItem[]>([]);
  const [view, setView] = useState<"play" | "summary">("play");

  const item = items[index];
  const progress = Math.round(((index)/items.length)*100);

  const select = (c: string) => { if (!revealed) setSelected(c); };
  const check = () => {
    if (selected == null) return;
    const ok = selected === item.answer;
    if (ok){ setScore(s=>s+1); playCorrect(); } else { setMistakes(m=>[...m, item]); playWrong(); }
    setRevealed(true);
  };
  const next = () => {
    if (index+1 < items.length){
      setIndex(i=>i+1); setSelected(null); setRevealed(false);
    } else { onFinish?.(score, mistakes); setView("summary"); }
  };

  if (view === "summary"){
    return (
      <div className="min-h-[60vh] rounded-2xl border border-gray-700 bg-gray-900 p-6 text-gray-200">
        <div className="text-2xl font-bold mb-2">Rezultat</div>
        <div className="text-gray-400 mb-6">Ai obținut {score}/{items.length} corecte.</div>
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={()=>{ setIndex(0); setScore(0); setMistakes([]); setSelected(null); setRevealed(false); setView('play'); }}
            className="px-4 py-2 rounded-xl border border-gray-700 bg-gradient-to-r from-violet-500 to-purple-500 text-white">Încearcă din nou</button>
          {mistakes.length>0 && (
            <button className="px-4 py-2 rounded-xl border border-gray-700 bg-gray-900 hover:border-violet-500 text-gray-200">Revizuiește Greșelile</button>
          )}
        </div>
        {mistakes.length>0 && (
          <div className="space-y-3">
            <div className="text-lg font-semibold">Întrebări de revizuit</div>
            {mistakes.map((m, i)=>(
              <div key={m.id} className="rounded-xl border border-gray-700 p-4">
                <div className="font-semibold mb-1">{i+1}. {m.question}</div>
                <div className="text-sm text-gray-400">Răspuns corect: {m.answer}</div>
                {m.why && <div className="text-sm text-gray-400 mt-1">{m.why}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ProgressBar percent={progress} />

      <div className="rounded-2xl border border-gray-700 bg-gray-900 p-4">
        <div className="text-sm text-gray-400 mb-2">Întrebarea {index+1} / {items.length}</div>
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
                  ${selected===c ? "border-violet-500" : "border-gray-700 hover:border-violet-500/70"} ${faded ? "opacity-50" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-200">{c}</span>
                  {isCorrect && <CheckCircle className="text-green-400" size={20}/>}
                  {isWrongSel && <XCircle className="text-red-400" size={20}/>}
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
              className="px-4 py-2 rounded-xl border border-gray-700 bg-gradient-to-r from-violet-500 to-purple-500 text-white disabled:opacity-40"
            >
              Verifică răspunsul
            </button>
          ) : (
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl border border-gray-700 bg-gradient-to-r from-violet-500 to-purple-500 text-white"
            >
              Următoarea Întrebare
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
