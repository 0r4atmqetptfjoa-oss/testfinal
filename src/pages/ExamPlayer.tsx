
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import EdgeTimer from "@/components/EdgeTimer";
import Toast from "@/components/Toast";
import { awardXP } from "@/lib/game";
import { vibrate } from "@/lib/haptics";
import { sfxCorrect, sfxWrong, sfxFinish } from "@/lib/sound";

export type ExamItem = { id: string; q: string; a: string[]; correct: string };

export default function ExamPlayer({ items, seconds=300, onFinish }: { items: ExamItem[]; seconds?: number; onFinish?: (score: number)=>void }){
  const [index, setIndex] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [rev, setRev] = useState(false);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState(""); const [showToast, setShowToast] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef<number>(Date.now());

  useEffect(()=>{
    function onOffline(){ setToast("Mod offline: continuă, răspunsurile sunt salvate local."); setShowToast(true); setTimeout(()=> setShowToast(false), 1400); }
    window.addEventListener("offline", onOffline);
    return ()=> window.removeEventListener("offline", onOffline);
  }, []);

  const item = items[index];

  function showXP(txt: string){ setToast(txt); setShowToast(true); setTimeout(()=> setShowToast(false), 900); }

  function check(){
    if (!sel || rev) return;
    const ok = sel === item.correct;
    if (ok){ setScore(s=>s+1); sfxCorrect(); vibrate("success"); awardXP(8,"exam_correct"); showXP("+8 XP"); }
    else { sfxWrong(); vibrate("error"); awardXP(1,"exam_wrong"); showXP("+1 XP"); }
    setRev(true);
  }
  function next(){
    if (index+1 < items.length){ setIndex(i=>i+1); setSel(null); setRev(false); }
    else finish();
  }
  function finish(){
    sfxFinish(); setDone(true); onFinish?.(score);
    awardXP(15, "exam_finish");
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 relative">
      {!done && <EdgeTimer seconds={seconds} onComplete={finish} />}
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 mt-3">
        <div className="text-xs text-gray-500 mb-2">Întrebarea {index+1} / {items.length}</div>
        <div className="text-lg font-bold mb-3">{item.q}</div>
        <div className="space-y-2">
          {item.a.map((c)=> {
            const isCorrect = rev && c === item.correct;
            const isWrongSel = rev && sel === c && !isCorrect;
            const faded = rev && !isCorrect && sel !== c;
            return (
              <button key={c} onClick={()=> !rev && setSel(c)} disabled={rev}
                className={`w-full text-left rounded-xl border p-3 bg-[color:var(--card)] active:scale-[0.98]
                  ${sel===c ? "border-accent" : "border-[color:var(--border)]"} ${faded ? "opacity-50":""}`}>
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
          {!rev ? (
            <button onClick={check} disabled={!sel} className={`px-4 py-2 rounded-xl btn-accent ${!sel ? "opacity-40":""}`}>Verifică</button>
          ) : (
            <button onClick={next} className="px-4 py-2 rounded-xl btn-accent">Următoarea</button>
          )}
        </div>
      </div>
      <Toast text={toast} show={showToast} />
    </div>
  );
}
