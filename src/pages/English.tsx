
import { useEffect, useMemo, useState } from "react";
import QuizPlayer from "../components/QuizPlayer";
import type { Item } from "../utils/quizEngine";

type EngData = { tests: Item[][] };

export default function English(){
  const [data, setData] = useState<EngData | null>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Item[]>([]);
  const [review, setReview] = useState(false);
  useEffect(()=>{ fetch("/data/v12/english.json").then(r => r.json()).then(setData); },[]);
  const current = useMemo(()=> idx===null || !data ? [] : (review ? wrong : data.tests[idx]), [idx, data, review, wrong]);
  const done = (w: Item[]) => { setWrong(w); setReview(false); };
  if(!data) return <div className="p-4">Se încarcă…</div>;
  if(idx===null) return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <div className="text-lg font-semibold mb-2">Teste Engleză — {data.tests.length} teste</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.tests.map((_,i)=>(<button key={i} className="py-3 px-4 rounded-xl bg-card hover:border-accent border border-ui" onClick={()=>{ setIdx(i); setWrong([]); }}>Test {i+1}</button>))}
      </div>
    </main>
  );
  if (wrong.length>0 && !review){
    return (
      <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Test finalizat!</h2>
          <p className="text-muted">Ai greșit {wrong.length} întrebări.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button className="btn btn-ghost" onClick={()=> setIdx(null)}>← Înapoi la lista de teste</button>
            <button className="btn btn-primary" onClick={()=> setReview(true)}>Revizuiește greșelile</button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <button className="text-sm underline text-muted hover:text-gray-200 mb-2" onClick={()=> { setIdx(null); setWrong([]); setReview(false); }}>← Înapoi la lista de teste</button>
      <QuizPlayer items={current} moduleName={review ? "Revizuire Engleză" : `Engleză Test ${idx!+1}`} onTestFinished={done} />
    </main>
  );
}
