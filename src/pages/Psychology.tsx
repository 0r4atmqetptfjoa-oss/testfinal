
import { useEffect, useMemo, useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';
import QuizPlayer from "../components/QuizPlayer";
import type { Item } from "../utils/quizEngine";

// Shape of a raw psychology question from the JSON file
type RawPsyQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  rationales?: string[];
  topic?: string;
  module?: string;
  difficulty?: string;
};

/**
 * Psychology page. Loads the raw psychology questions and groups them into
 * multiple sets. Each set contains up to 20 questions for easier review.
 */
export default function Psychology(){
  const [tests, setTests] = useState<Item[][] | null>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Item[]>([]);
  const [review, setReview] = useState(false);
  useEffect(()=>{
    fetch("/data/v12/psychology.json").then(r => r.json()).then((raw: { questions: RawPsyQuestion[] }) => {
      const mapped: Item[] = raw.questions.map(q => ({
        id: q.id,
        module: 'psychology',
        question: q.question,
        choices: q.options,
        answer: q.answerIndex,
      }));
      // Split into chunks of 20 questions. Adjust chunk size as needed.
      const chunkSize = 20;
      const sets: Item[][] = [];
      for(let i=0;i<mapped.length;i+=chunkSize){
        sets.push(mapped.slice(i,i+chunkSize));
      }
      setTests(sets);
    });
  },[]);
  const current = useMemo(()=> idx===null || !tests ? [] : (review ? wrong : tests[idx]), [idx, tests, review, wrong]);
  const done = (w: Item[]) => { setWrong(w); setReview(false); };

  // Set page title
  usePageTitle('Evaluare psihologică');
  if(!tests) return <div className="p-4">Se încarcă…</div>;
  if(idx===null) return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <div className="text-lg font-semibold mb-2">Evaluare Psihologică — {tests.length} seturi</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tests.map((_,i)=>(<button key={i} className="py-3 px-4 rounded-xl bg-card hover:border-accent border border-ui" onClick={()=>{ setIdx(i); setWrong([]); }}>Set {i+1}</button>))}
      </div>
    </main>
  );
  if (wrong.length>0 && !review){
    return (
      <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Set finalizat!</h2>
          <p className="text-muted">Ai greșit {wrong.length} întrebări.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button className="btn btn-ghost" onClick={()=> setIdx(null)}>← Înapoi la lista</button>
            <button className="btn btn-primary" onClick={()=> setReview(true)}>Revizuiește greșelile</button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <button className="text-sm underline text-muted hover:text-gray-200 mb-2" onClick={()=> { setIdx(null); setWrong([]); setReview(false); }}>← Înapoi la lista</button>
      <QuizPlayer items={current} moduleName={review ? "Revizuire Psihologie" : `Psihologie — Set ${idx!+1}`} onTestFinished={done} />
    </main>
  );
}
