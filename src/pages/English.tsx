
import { useEffect, useMemo, useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';
import QuizPlayer from "../components/QuizPlayer";
import type { Item } from "../utils/quizEngine";

// Define the shape of a raw English question from the JSON file
type RawEngQuestion = {
  id: string;
  section: string;
  prompt: string;
  passage: string | null;
  options: string[];
  answerIndex: number;
  explanation?: string;
  rationales?: string[];
  difficulty?: string;
};

type RawEngData = { tests: RawEngQuestion[][] };

/**
 * English tests page. Loads the English JSON dataset and maps each raw
 * question to the Item format expected by QuizPlayer (question/choices/answer).
 */
export default function English(){
  // Update document title
  usePageTitle('Teste Engleză');
  const [tests, setTests] = useState<Item[][] | null>(null);
  const [idx, setIdx] = useState<number | null>(null);
  const [wrong, setWrong] = useState<Item[]>([]);
  const [review, setReview] = useState(false);

  useEffect(()=>{
    fetch("/data/v12/english.json").then(r => r.json()).then((raw: RawEngData) => {
      // Map each raw test to our Item structure
      const mapped: Item[][] = raw.tests.map(test => test.map(q => ({
        id: q.id,
        module: 'english',
        question: q.prompt,
        choices: q.options,
        answer: q.answerIndex,
      })));
      setTests(mapped);
    });
  },[]);

  // Determine the current set of questions: either review wrong answers or the selected test
  const current = useMemo(()=> idx===null || !tests ? [] : (review ? wrong : tests[idx]), [idx, tests, review, wrong]);
  const done = (w: Item[]) => { setWrong(w); setReview(false); };

  if(!tests) return <div className="p-4">Se încarcă…</div>;

  // If no test is selected, show list of tests
  if(idx===null) return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <div className="text-lg font-semibold mb-2">Teste Engleză — {tests.length} teste</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tests.map((_,i)=>(<button key={i} className="py-3 px-4 rounded-xl bg-card hover:border-accent border border-ui" onClick={()=>{ setIdx(i); setWrong([]); }}>Test {i+1}</button>))}
      </div>
    </main>
  );
  // After finishing the test, show summary and option to review wrong answers
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
  // Render the quiz
  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24">
      <button className="text-sm underline text-muted hover:text-gray-200 mb-2" onClick={()=> { setIdx(null); setWrong([]); setReview(false); }}>← Înapoi la lista de teste</button>
      <QuizPlayer items={current} moduleName={review ? "Revizuire Engleză" : `Engleză Test ${idx!+1}`} onTestFinished={done} />
    </main>
  );
}
