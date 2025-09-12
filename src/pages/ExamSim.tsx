import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizPlayer from '@/components/QuizPlayer';
import { getLegislationQuestions } from '@/lib/questions';
import { loadSpecialtyQuestions } from '@/lib/contentLoader'; // Importăm noua funcție
import { Question } from '@/public/data/v12/types';
import Skeleton from 'react-loading-skeleton';

export default function ExamSim() {
  const nav = useNavigate();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const legislation = await getLegislationQuestions();
      const specialty = await loadSpecialtyQuestions();

      if (specialty.length === 0) {
        console.error("Nu s-au putut încărca întrebările de specialitate.");
        setError("Nu am putut încărca testele pentru specialitatea selectată. Te rugăm să încerci din nou.");
        return;
      }

      const combinedQuestions = [
        ...legislation.slice(0, 30),
        ...specialty.slice(0, 60)
      ];

      setQuestions(combinedQuestions);
    };

    fetchQuestions();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500 font-semibold">{error}</div>;
  }

  if (!questions) {
    return <div className='p-4'><Skeleton count={10} /></div>;
  }

  return (
    <QuizPlayer
      questions={questions}
      onComplete={(finalScore, detailedAnswers) => {
        console.log('Examen finalizat!', { finalScore, detailedAnswers });
        nav('/progress', { state: { lastQuiz: detailedAnswers, score: finalScore } });
      }}
      title="Simulare Examen"
    />
  );
}