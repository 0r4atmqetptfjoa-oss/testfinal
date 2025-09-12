import { useEffect, useState, useMemo } from "react";
import { buildExam, type Item } from "@/lib/quizEngine";
import QuizPlayer from "@/components/QuizPlayer";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

async function loadBank(): Promise<Item[]> {
  const [leg, spec] = await Promise.all([
    fetch("/data/v12/legislation.json").then(r => r.json()),
    fetch("/data/v12/logistics.json").then(r => r.json()),
  ]);
  return [...(leg?.questions || []), ...(spec?.questions || [])];
}

export default function ExamSim() {
  const [allItems, setAllItems] = useState<Item[] | null>(null);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 100000));
  const [examStarted, setExamStarted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Item[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    loadBank().then(setAllItems);
  }, []);

  const itemsForExam = useMemo(() => {
    if (!allItems) return [];
    if (reviewMode) return wrongAnswers;
    
    const legislation = allItems.filter(q => q.module === 'legislation');
    const specialty = allItems.filter(q => q.module === 'specialty');
    return [
      ...buildExam(legislation, { limit: 30, seed }),
      ...buildExam(specialty, { limit: 60, seed: seed + 1 }),
    ];
  }, [allItems, seed, reviewMode, wrongAnswers]);

  const handleTestFinished = (wrongItems: Item[]) => {
    setWrongAnswers(wrongItems);
    setIsFinished(true); // Marcăm că testul s-a terminat
    if (wrongItems.length === 0) { // Dacă nu sunt greșeli, nu intrăm în modul de revizuire
        setExamStarted(false); // Permite începerea unei noi simulări
    }
  };

  const startNewSimulation = () => {
      setSeed(Math.floor(Math.random() * 100000)); // Generăm un nou seed
      setExamStarted(true);
      setWrongAnswers([]);
      setReviewMode(false);
      setIsFinished(false);
  }

  if (!allItems) {
    return <div className="p-4"><Skeleton count={8} /></div>;
  }
  
  if (!examStarted) {
    return (
        <div className="card text-center space-y-4">
            <h1 className="text-lg font-semibold">Simulare Examen Oficial</h1>
            <p className="text-sm text-muted">Vei începe un test cu 90 de întrebări (30 legislație, 60 specialitate) care simulează condițiile de examen.</p>
            <button className="btn btn-primary" onClick={startNewSimulation}>Începe o Nouă Simulare</button>
        </div>
    )
  }
  
  if (isFinished && !reviewMode) {
      return (
          <div className="card text-center space-y-4">
              <h1 className="text-lg font-semibold">Simulare Finalizată!</h1>
              {wrongAnswers.length > 0 ? (
                  <>
                      <p className="text-sm text-muted">Ai greșit {wrongAnswers.length} întrebări.</p>
                      <div className="flex justify-center gap-3 pt-2">
                          <button className="btn btn-ghost" onClick={startNewSimulation}>Încearcă din nou</button>
                          <button className="btn btn-primary" onClick={() => setReviewMode(true)}>Revizuiește greșelile</button>
                      </div>
                  </>
              ) : (
                  <>
                      <p className="text-lg text-green-500 font-bold">Felicitări! Ai răspuns corect la toate întrebările!</p>
                      <button className="btn btn-primary" onClick={startNewSimulation}>Începe o altă simulare</button>
                  </>
              )}
          </div>
      )
  }

  return <QuizPlayer items={itemsForExam} moduleName={reviewMode ? "Revizuire Simulare" : "Simulare Examen"} onTestFinished={handleTestFinished} />;
}