import { useEffect, useState, useMemo } from "react"; // Am adăugat useMemo aici
import type { Item } from "@/lib/quizEngine";
import QuizPlayer from "@/components/QuizPlayer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type EngData = { tests: Item[][] };

export default function English() {
  const [data, setData] = useState<EngData | null>(null);
  const [testIndex, setTestIndex] = useState<number | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<Item[]>([]);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    fetch("/data/v12/english.json").then(r => r.json()).then(setData);
  }, []);

  const handleTestFinished = (wrongItems: Item[]) => {
    setWrongAnswers(wrongItems);
    setReviewMode(false); 
  };

  const currentTestItems = useMemo(() => {
    if (testIndex === null || !data) return [];
    return reviewMode ? wrongAnswers : data.tests[testIndex];
  }, [testIndex, data, reviewMode, wrongAnswers]);

  if (!data) {
    return (
      <div className="p-4 space-y-3">
        <Skeleton height={30} width={250} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} height={50} />)}
        </div>
      </div>
    );
  }

  if (testIndex === null) {
    return (
      <div className="p-4 space-y-3">
        <div className="text-lg font-semibold">Teste Engleză — {data.tests.length} teste</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {data.tests.map((_, i) => (
            <button key={i} className="py-3 px-4 rounded-xl bg-card hover:bg-white/10 dark:hover:bg-white/5 border border-border"
              onClick={() => { setTestIndex(i); setWrongAnswers([]); }}>
              Test {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (wrongAnswers.length > 0 && !reviewMode) {
    return (
      <div className="p-4 space-y-4">
        <div className="card text-center space-y-2">
          <h2 className="text-xl font-semibold">Test finalizat!</h2>
          <p className="text-muted">Ai greșit {wrongAnswers.length} întrebări.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button className="btn btn-ghost" onClick={() => setTestIndex(null)}>
              ← Înapoi la lista de teste
            </button>
            <button className="btn btn-primary" onClick={() => setReviewMode(true)}>
              Revizuiește greșelile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <button className="text-sm underline text-muted hover:text-text" onClick={()=> {
         setTestIndex(null);
         setWrongAnswers([]);
         setReviewMode(false);
       }}>
        ← Înapoi la lista de teste
      </button>
      <QuizPlayer items={currentTestItems} moduleName={reviewMode ? `Revizuire Engleză` : `Engleză Test ${testIndex + 1}`} onTestFinished={handleTestFinished} />
    </div>
  );
}