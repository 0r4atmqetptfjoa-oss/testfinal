
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { Item } from "../utils/quizEngine";

export default function QuizPlayer({ items, moduleName, onTestFinished }:{ items: Item[]; moduleName: string; onTestFinished: (wrong: Item[])=>void }){
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Item[]>([]);
  useEffect(()=>{ setI(0); setChoice(null); setWrong([]); },[items]);
  const q = items[i];
  const progress = Math.round(((i)/Math.max(1, items.length))*100);
  const select = (idx:number)=>{ if(choice!==null) return; setChoice(idx); if(idx !== q.answer) setWrong(w => [...w, q]); };
  const next = ()=> {
    if (i+1 >= items.length){
      // Înregistrăm statistici în localStorage: număr de teste, întrebări, răspunsuri corecte
      try {
        const total = items.length;
        const wrongCount = wrong.length;
        const correctCount = total - wrongCount;
        const exams = parseInt(localStorage.getItem('dashboard_exams') || '0', 10) + 1;
        const qAns = parseInt(localStorage.getItem('dashboard_questions_answered') || '0', 10) + total;
        const qCorr = parseInt(localStorage.getItem('dashboard_correct_answers') || '0', 10) + correctCount;
        localStorage.setItem('dashboard_exams', exams.toString());
        localStorage.setItem('dashboard_questions_answered', qAns.toString());
        localStorage.setItem('dashboard_correct_answers', qCorr.toString());
      } catch {}
      onTestFinished(wrong);
    } else {
      setI(i+1); setChoice(null);
    }
  };
  if(!items || items.length===0){ return <div className="rounded-2xl border border-ui bg-card p-4 text-center">Nu există întrebări pentru acest set.</div>; }
  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden"><div className="h-full bg-violet-500 transition-all" style={{width:`${progress}%`}}/></div>
      <div className="text-lg font-bold">{moduleName}</div>
      <div className="text-base font-semibold">{q.question}</div>
      <div className="space-y-2">
        {q.choices.map((c, idx)=>{
          const isCorrect = choice!==null && idx===q.answer;
          const isWrong = choice!==null && idx===choice && idx!==q.answer;
          return (
            <button key={idx} onClick={()=> select(idx)} className={
                "w-full text-left rounded-xl border p-3 transition active:scale-[0.99] "+
                (choice===null ? "border-ui bg-card hover:border-accent" :
                 isCorrect ? "border-green-500/60 bg-green-500/10" :
                 isWrong ? "border-red-500/60 bg-red-500/10" : "opacity-50 border-ui bg-card")
              }>
              <div className="flex items-center gap-2">
                <div className="flex-1">{c}</div>
                {isCorrect && <CheckCircle className="text-green-400" size={18}/>}
                {isWrong && <XCircle className="text-red-400" size={18}/>}
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button disabled={choice===null} onClick={next} className={"btn btn-primary "+(choice===null?"opacity-50 pointer-events-none":"")}>Următoarea întrebare</button>
      </div>
      <div className="text-xs text-muted text-right">{i+1}/{items.length}</div>
    </div>
  );
}
