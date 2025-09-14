
import { useEffect, useMemo, useState } from "react";
import QuizPlayer from "../components/QuizPlayer";
import { buildExam, Item } from "../utils/quizEngine";
import { loadSpecialtyQuestions } from "../utils/contentLoader";

async function loadBank(): Promise<Item[]> {
  const [leg, spec] = await Promise.all([
    fetch("/data/v12/legislation.json").then(r => r.json()).then(d => d?.questions || []),
    loadSpecialtyQuestions(),
  ]);
  return [...leg, ...spec];
}

export default function ExamSim(){
  const [allItems, setAllItems] = useState<Item[] | null>(null);
  const [seed, setSeed] = useState(()=> Math.floor(Math.random()*100000));
  const [wrong, setWrong] = useState<Item[]>([]);
  const [review, setReview] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(()=>{ loadBank().then(setAllItems); },[]);

  const itemsForExam = useMemo(()=>{
    if(!allItems) return [];
    if(review) return wrong;
    const leg = allItems.filter(q => q.module === "legislation");
    const spec = allItems.filter(q => q.module === "specialty");
    return [...buildExam(leg, { limit: 30, seed }), ...buildExam(spec, { limit: 60, seed: seed+1 })];
  },[allItems, seed, review, wrong]);

  const start = ()=> { setSeed(Math.floor(Math.random()*100000)); setWrong([]); setReview(false); setStarted(true); };
  const done = (w: Item[]) => { setWrong(w); setStarted(false); };

  if (!allItems) return <div className="p-4">Se încarcă…</div>;

  if (!started) {
    return (
      <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
        <div className="text-center space-y-3">
          <h1 className="text-lg font-semibold">Simulare Examen Oficial</h1>
          <p className="text-sm text-muted">90 de întrebări: 30 Legislație, 60 Specialitate.</p>
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
