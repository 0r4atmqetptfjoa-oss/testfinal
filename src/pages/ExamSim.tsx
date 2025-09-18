// ===============================================
// FILE: src/pages/ExamSim.tsx
// CHANGE: dynamic exam composition per branch (conform ghidului)
// ===============================================
import { useEffect, useMemo, useState } from "react";
import QuizPlayer from "../components/QuizPlayer";
import { buildExam, Item } from "../utils/quizEngine";
import { loadSpecialtyQuestions } from "../utils/contentLoader";
import { getProfile } from "../lib/profile";

async function loadBank(): Promise<Item[]> {
  const [leg, spec] = await Promise.all([
    fetch("/data/v12/legislation.json").then(r => r.json()).then(d => normalizeArray(d?.questions || [])),
    loadSpecialtyQuestions().then(normalizeArray),
  ]);
  return [...leg, ...spec];
}

// Acceptă atât schema {options, answerIndex} cât și {choices, answer}
function normalizeArray(arr: any[]): Item[] {
  return (arr||[]).map((q:any)=> ({
    id: q.id,
    module: q.module || (q.topic ? (q.topic.toLowerCase().includes("lege")?"legislation":"specialty") : "specialty"),
    question: q.question || q.stem || "",
    choices: q.choices || q.options || [],
    answer: typeof q.answer === "number" ? q.answer : (typeof q.answerIndex === "number" ? q.answerIndex : 0),
  }));
}

function examConfig(){
  const p = getProfile();
  const b = (p?.branch || "").toString().toLowerCase();
  // valori implicite
  let leg=30, spec=60, total=90, englishElim=false;
  if (b.includes("medical") || b.includes("sanitar")) { leg=10; spec=80; englishElim=true; }
  else if (b.includes("artilerie") || b.includes("rachete") || b.includes("antiaerian")) { leg=90; spec=0; englishElim=true; }
  else if (b.includes("logistic")) { leg=30; spec=60; }
  // pentru alte arme păstrăm 30/60
  return { leg, spec, total, englishElim };
}

export default function ExamSim(){
  const [allItems, setAllItems] = useState<Item[] | null>(null);
  const [seed, setSeed] = useState(()=> Math.floor(Math.random()*100000));
  const [wrong, setWrong] = useState<Item[]>([]);
  const [review, setReview] = useState(false);
  const [started, setStarted] = useState(false);

  const cfg = examConfig();

  useEffect(()=>{ loadBank().then(setAllItems); },[]);

  const itemsForExam = useMemo(()=>{
    if(!allItems) return [];
    if(review) return wrong;
    const leg = allItems.filter(q => q.module === "legislation");
    const spec = allItems.filter(q => q.module === "specialty");
    return [
      ...buildExam(leg, { limit: cfg.leg, seed }),
      ...buildExam(spec, { limit: cfg.spec, seed: seed+1 })
    ];
  },[allItems, seed, review, wrong, cfg.leg, cfg.spec]);

  const start = ()=> { setSeed(Math.floor(Math.random()*100000)); setWrong([]); setReview(false); setStarted(true); };
  const done = (w: Item[]) => { setWrong(w); setStarted(false); };

  if (!allItems) return <div className="p-4">Se încarcă…</div>;

  if (!started) {
    return (
      <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
        <div className="text-center space-y-3">
          <h1 className="text-lg font-semibold">Simulare Examen Oficial</h1>
          <p className="text-sm text-muted">{cfg.total} întrebări: {cfg.leg} Legislație, {cfg.spec} Specialitate.</p>
          {cfg.englishElim && <p className="text-[11px] text-muted">Proba de limba engleză este eliminatorie și nu intră în media – vezi secțiunea „Teste Engleză”.</p>}
          {wrong.length>0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted">Ai {wrong.length} greșeli din simularea anterioară.</p>
              <div className="flex gap-3 justify-center">
                <button className="btn btn-ghost" onClick={start}>Începe din nou</button>
                <button className="btn btn-primary" onClick={()=> setReview(true)}>Revizuiește greșelile</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={start}>Începe o nouă simulare</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <QuizPlayer items={itemsForExam} moduleName={review ? "Revizuire Simulare" : "Simulare Examen"} onTestFinished={done} />
    </div>
  );
}
