import { useEffect, useMemo, useState } from "react";
import { buildExam, type Item } from "@/lib/quizEngine";
import QuizPlayer from "@/components/QuizPlayer";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type Bank = { questions: Item[] };

async function loadAll(): Promise<Bank> {
  const [leg, spec, psy] = await Promise.all([
    fetch("/data/v12/legislation.json").then(r => r.json()).catch(() => ({ questions: [] })),
    fetch("/data/v12/logistics.json").then(r => r.json()).catch(() => ({ questions: [] })),
    fetch("/data/v12/psychology.json").then(r => r.json()).catch(() => ({ questions: [] })),
  ]);
  const questions = [...(leg?.questions || []), ...(spec?.questions || []), ...(psy?.questions || [])];
  return { questions };
}

export default function AllTopics() {
  const [allQuestions, setAllQuestions] = useState<Item[]>([]);
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 10000));
  const [limit, setLimit] = useState<number>(30);
  const [modules, setModules] = useState<string[]>(["legislation", "specialty", "psychology"]);
  const [examStarted, setExamStarted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Item[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    loadAll().then(({ questions }) => setAllQuestions(questions));
  }, []);

  function toggleModule(id: string) {
    setModules(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const filteredQuestions = useMemo(() => {
    if (modules.length === 0) return [];
    return allQuestions.filter(q => modules.includes(q.module || ""));
  }, [allQuestions, modules]);

  const questionsForExam = useMemo(() => {
    if (reviewMode) return wrongAnswers;
    return buildExam(filteredQuestions, {
      limit,
      ratios: { easy: 0.3, medium: 0.5, hard: 0.2 },
      seed,
      antiGuessing: true
    });
  }, [filteredQuestions, limit, seed, reviewMode, wrongAnswers]);

  const handleTestFinished = (wrongItems: Item[]) => {
    setWrongAnswers(wrongItems);
    setIsFinished(true);
  };
  
  const handleStart = () => {
    setExamStarted(true);
    setWrongAnswers([]);
    setReviewMode(false);
    setIsFinished(false);
  }

  if (allQuestions.length === 0) {
      return <div className="p-4"><Skeleton count={8} /></div>
  }

  if (examStarted) {
    if (isFinished && !reviewMode) {
        return (
            <div className="card text-center space-y-4">
                <h1 className="text-lg font-semibold">Test Finalizat!</h1>
                {wrongAnswers.length > 0 ? (
                    <>
                        <p className="text-sm text-muted">Ai greșit {wrongAnswers.length} întrebări.</p>
                        <div className="flex justify-center gap-3 pt-2">
                            <button className="btn btn-ghost" onClick={() => setExamStarted(false)}>← Schimbă Setările</button>
                            <button className="btn btn-primary" onClick={() => setReviewMode(true)}>Revizuiește greșelile</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-lg text-green-500 font-bold">Felicitări! Ai răspuns corect la toate întrebările!</p>
                        <button className="btn btn-primary" onClick={() => setExamStarted(false)}>Înapoi la Setări</button>
                    </>
                )}
            </div>
        )
    }
    return (
      <div className="space-y-4">
        <button className="text-sm underline text-muted hover:text-text" onClick={() => setExamStarted(false)}>
          ← Schimbă setările
        </button>
        <QuizPlayer items={questionsForExam} moduleName={reviewMode ? "Revizuire Test General" : "Test General"} onTestFinished={handleTestFinished} />
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <div className="text-lg font-semibold">Teste din toată tematica</div>
      
      <div className="space-y-2">
        <label className="font-medium">Alege modulele</label>
        <div className="flex flex-wrap gap-2">
          {["legislation", "specialty", "psychology"].map(m => {
            const labels: any = { legislation: "Legislație", specialty: "Specialitate", psychology: "Psihologie" };
            const active = modules.includes(m);
            return (
              <button key={m} onClick={() => toggleModule(m)}
                className={`px-3 py-1.5 text-sm rounded-lg border ${active ? "bg-primary text-white border-primary" : "bg-card hover:bg-white/10"}`}>
                {labels[m]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <label className="text-sm font-medium">Întrebări:
          <input className="input w-24 ml-2" type="number" min={5} max={120} value={limit} onChange={e => setLimit(parseInt(e.target.value || '0'))} />
        </label>
        <label className="text-sm font-medium">Seed:
          <input className="input w-32 ml-2" value={seed} onChange={e => setSeed(parseInt(e.target.value || '0'))} />
        </label>
      </div>

      <div className="text-xs text-muted pt-2">
        Set pregătit: {questionsForExam.length} întrebări din modulele selectate.
      </div>

      <div className="flex justify-end">
        <button
          disabled={modules.length === 0 || questionsForExam.length === 0}
          onClick={handleStart}
          className="btn btn-primary">
          Start Test
        </button>
      </div>
    </div>
  );
}