import React, { useEffect, useState } from "react";
import usePageTitle from '@/hooks/usePageTitle';
import { loadGame, levelFromXP, last7DaysActivity } from "@/lib/game";

/**
 * Dashboard page – oferă o privire de ansamblu asupra progresului utilizatorului.
 * Afișează informații precum numărul de teste finalizate, întrebări rezolvate,
 * scoruri și nivelul atins pe baza experienței acumulate. Include un mic
 * grafic al activității din ultimele 7 zile.
 */
export default function Dashboard() {
  const [tests, setTests] = useState<number>(0);
  const [questions, setQuestions] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [lvl, setLvl] = useState<{ level: number; pct: number }>({ level: 1, pct: 0 });
  const [activity, setActivity] = useState<{ day: string; xp: number }[]>([]);

  useEffect(() => {
    // Citim statisticile din localStorage. Dacă lipsesc, folosim valori implicite.
    const exams = parseInt(localStorage.getItem('dashboard_exams') || '0', 10);
    const qAns = parseInt(localStorage.getItem('dashboard_questions_answered') || '0', 10);
    const qCorr = parseInt(localStorage.getItem('dashboard_correct_answers') || '0', 10);
    setTests(exams);
    setQuestions(qAns);
    setCorrect(qCorr);
    // Nivelul și activitatea din game state (XP)
    const game = loadGame();
    const lvlInfo = levelFromXP(game.xp);
    setLvl({ level: lvlInfo.level, pct: lvlInfo.pct });
    setActivity(last7DaysActivity());
  }, []);

  // Set page title
  usePageTitle('Dashboard');

  const accuracy = questions > 0 ? Math.round((correct / questions) * 100) : 0;

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 max-w-2xl mx-auto pb-24 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-ui bg-card p-4">
          <div className="text-sm text-muted mb-1">Teste finalizate</div>
          <div className="text-2xl font-semibold">{tests}</div>
        </div>
        <div className="rounded-2xl border border-ui bg-card p-4">
          <div className="text-sm text-muted mb-1">Întrebări rezolvate</div>
          <div className="text-2xl font-semibold">{questions}</div>
        </div>
        <div className="rounded-2xl border border-ui bg-card p-4">
          <div className="text-sm text-muted mb-1">Răspunsuri corecte</div>
          <div className="text-2xl font-semibold">{correct}</div>
        </div>
        <div className="rounded-2xl border border-ui bg-card p-4">
          <div className="text-sm text-muted mb-1">Acuratețe</div>
          <div className="text-2xl font-semibold">{accuracy}%</div>
        </div>
      </div>
      <div className="rounded-2xl border border-ui bg-card p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted">Nivel {lvl.level}</span>
          <span className="text-sm text-muted">{Math.round(lvl.pct * 100)}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
          <div className="h-full bg-violet-500" style={{ width: `${lvl.pct * 100}%` }}></div>
        </div>
      </div>
      <div className="rounded-2xl border border-ui bg-card p-4">
        <h2 className="text-lg font-semibold mb-2">Activitate 7 zile</h2>
        <div className="grid grid-cols-7 gap-1 text-center">
          {activity.map(({ day, xp }) => (
            <div key={day} className="text-xs">
              <div className="mb-1 text-muted" style={{ fontSize: '0.7rem' }}>{day.slice(5)}</div>
              <div className="h-8 bg-violet-600 rounded-md" style={{ height: `${Math.min(xp, 100)}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}