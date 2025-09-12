import { useEffect, useMemo, useState } from "react";
import type { Item } from "@/lib/quizEngine";
import QuizPlayer from "@/components/QuizPlayer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type PItem = Item & { category?: 'cognitive' | 'personality' | 'situational' };
type Bank = { questions: PItem[] };

export default function Psychology() {
  const [questionBank, setQuestionBank] = useState<PItem[]>([]);
  const [length, setLength] = useState(20);
  const [categories, setCategories] = useState<Array<'cognitive' | 'personality' | 'situational'>>(['cognitive', 'personality', 'situational']);
  const [examStarted, setExamStarted] = useState(false);
  const [itemsForExam, setItemsForExam] = useState<PItem[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Item[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch("/data/v12/psychology.json").then(r => r.json()).then((d: Bank) => {
      setQuestionBank((d?.questions || []) as PItem[]);
    });
  }, []);

  function toggleCategory(cat: 'cognitive' | 'personality' | 'situational') {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  const questionPool = useMemo(() => {
    if (categories.length === 0) return [];
    const hasCategoryData = questionBank.some(q => !!q.category);
    return hasCategoryData ? questionBank.filter(q => q.category && categories.includes(q.category)) : questionBank;
  }, [questionBank, categories]);

  const handleStart = () => {
    const items = reviewMode ? wrongAnswers : (() => {
        const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.max(5, Math.min(length, shuffled.length)));
    })();
    setItemsForExam(items);
    setExamStarted(true);
    setIsFinished(false);
    if (!reviewMode) setWrongAnswers([]);
  };

  const handleTestFinished = (wrongItems: Item[]) => {
    setWrongAnswers(wrongItems);
    setIsFinished(true);
  };
  
  if (questionBank.length === 0) {
    return <div className="p-4"><Skeleton count={5} /></div>;
  }

  if (examStarted) {
    if (isFinished && !reviewMode) {
        return (
            <div className="card text-center space-y-4">
                <h1 className="text-lg font-semibold">Evaluare Finalizată!</h1>
                {wrongAnswers.length > 0 ? (
                    <>
                        <p className="text-sm text-muted">Ai greșit {wrongAnswers.length} întrebări.</p>
                        <div className="flex justify-center gap-3 pt-2">
                            <button className="btn btn-ghost" onClick={() => { setExamStarted(false); setWrongAnswers([]); }}>← Schimbă Setările</button>
                            <button className="btn btn-primary" onClick={() => { setReviewMode(true); handleStart(); }}>Revizuiește greșelile</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-lg text-green-500 font-bold">Felicitări! Performanță excelentă!</p>
                        <button className="btn btn-primary" onClick={() => { setExamStarted(false); setWrongAnswers([]); }}>Înapoi la Setări</button>
                    </>
                )}
            </div>
        );
    }
    return (
      <div className="space-y-4">
        <button className="text-sm underline text-muted hover:text-text" onClick={() => { setExamStarted(false); setReviewMode(false); setWrongAnswers([]); }}>
          ← Schimbă setările
        </button>
        <QuizPlayer items={itemsForExam} moduleName={reviewMode ? "Revizuire Psihologie" : "Evaluare Psihologică"} onTestFinished={handleTestFinished} />
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="text-lg font-semibold">Evaluare psihologică</div>
      <div className="text-sm text-muted">Alege tipurile de itemi și numărul de întrebări.</div>

      <div className="space-y-2">
        <label className="font-medium">Categorii de itemi</label>
        <div className="flex flex-wrap gap-2">
          {(['cognitive', 'personality', 'situational'] as const).map(cat => {
            const labels: any = { cognitive: 'Aptitudini cognitive', personality: 'Chestionar personalitate', situational: 'Test situațional' };
            const active = categories.includes(cat);
            return (
              <button key={cat} onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 text-sm rounded-lg border ${active ? "bg-primary text-white border-primary" : "bg-card hover:bg-white/10"}`}>
                {labels[cat]}
              </button>
            )
          })}
        </div>
      </div>
      
      <label className="text-sm font-medium flex items-center gap-2">Număr întrebări:
        <input className="input w-24" type="number" min={5} max={120}
          value={length} onChange={e => setLength(parseInt(e.target.value || '0'))} />
      </label>
      
      <div className="flex justify-end">
        <button className="btn btn-primary" disabled={categories.length === 0 || questionPool.length === 0} onClick={handleStart}>
          Start Evaluare
        </button>
      </div>

      {categories.length > 0 && questionPool.length === 0 && (
          <div className="text-xs text-amber-600">Nu există întrebări pentru categoriile selectate.</div>
      )}
    </div>
  );
}