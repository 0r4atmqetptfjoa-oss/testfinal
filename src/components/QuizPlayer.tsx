// src/components/QuizPlayer.tsx
import React, { useState, useEffect, useRef } from 'react';
import type { Item } from '@/lib/quizEngine';
import useSound from 'use-sound';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useProgressStore, WrongAnswer } from '@/lib/progressStore';
import { useStore } from '@/store';
import { motion } from 'framer-motion';

type Props = {
  items: Item[];
  moduleName: string;
  onTestFinished?: (wrongAnswers: Item[]) => void;
};

export default function QuizPlayer({ items, moduleName, onTestFinished }: Props) {
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wronglyAnswered, setWronglyAnswered] = useState<WrongAnswer[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const startTimeRef = useRef<number>(Date.now()); // Măsurăm timpul

  const addResult = useProgressStore((state) => state.addResult);
  const soundEffectsEnabled = useStore((state) => state.soundEffects);
  
  const { width, height } = useWindowSize();
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.5 });

  const q = items[qi];
  const isFinished = qi === items.length - 1 && sel !== null;

  const handleAnswer = (selectedIndex: number) => {
    if (sel !== null) return;
    setSel(selectedIndex);
    const isCorrect = selectedIndex === q.answerIndex;
    if (isCorrect) {
      setScore(s => s + 1);
      if (soundEffectsEnabled) playCorrect();
    } else {
      if (soundEffectsEnabled) playIncorrect();
      setWronglyAnswered(prev => [...prev, { questionId: q.id, module: q.module || moduleName, category: q.topic }]);
    }
  };

  const handleNext = () => {
    if (qi < items.length - 1) {
      setQi(i => i + 1);
      setSel(null);
    } else {
      // Final de test
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      const finalScore = score + (sel === q.answerIndex ? 1 : 0);
      if ((finalScore / items.length) >= 0.6) setShowConfetti(true);
      
      addResult({
        module: moduleName,
        score: finalScore,
        total: items.length,
        duration,
        wrongAnswers: wronglyAnswered,
      });

      const wrongItems = items.filter(item => wronglyAnswered.some(wa => wa.questionId === item.id));
      onTestFinished?.(wrongItems);
    }
  };

  if (!items || items.length === 0) {
    return <div className="card text-center">Nu s-au putut încărca întrebările pentru acest modul.</div>;
  }

  const finalScore = score;
  const grade = (finalScore / items.length) * 10;
  
  return (
    <div className="space-y-4">
      {showConfetti && <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={400} tweenDuration={10000} />}
      
      <div className="w-full bg-border rounded-full h-2.5">
        <motion.div 
          className="bg-primary h-2.5 rounded-full" 
          initial={{ width: `${(qi / items.length) * 100}%` }}
          animate={{ width: `${((qi + (sel !== null ? 1 : 0)) / items.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        ></motion.div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>{moduleName}</span>
        <span>Progres: {qi + 1} / {items.length}</span>
      </div>

      <motion.div key={qi} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="text-base font-medium">{q.prompt || q.question}</div>
      </motion.div>
      
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = sel !== null;
          const isCorrect = isSelected && i === q.answerIndex;
          const isWrong = isSelected && i === sel && !isCorrect;

          let stateClasses = "border-border bg-card hover:bg-white/10 dark:hover:bg-white/5";
          if (isCorrect) stateClasses = "border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
          if (isWrong) stateClasses = "border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200";
          
          const clickable = sel === null ? "cursor-pointer" : "opacity-90";

          return (
            <motion.div 
              key={i} 
              whileHover={{ scale: sel === null ? 1.02 : 1 }} 
              whileTap={{ scale: sel === null ? 0.98 : 1 }}
              className={`p-3 rounded-lg border ${stateClasses} ${clickable}`} 
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </motion.div>
          );
        })}
      </div>

      {sel !== null && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm p-3 rounded-lg bg-card mt-3">
          <div className="font-semibold mb-1">Explicație:</div>
          <div className="text-muted">{q.explanation || "—"}</div>
        </motion.div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="text-sm font-semibold">Scor: {score} / {items.length}</div>
        {!isFinished ? (
          <button className="btn btn-primary" onClick={handleNext} disabled={sel === null}>Întrebarea următoare</button>
        ) : (
          <div className={`text-sm font-bold ${grade >= 6 ? 'text-green-500' : 'text-red-500'}`}>
            Finalizat — Nota: {grade.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}