// src/pages/AdaptiveLearning.tsx
import React, { useState, useEffect } from 'react';
import usePageTitle from '@/hooks/usePageTitle';
import { aiAdaptiveNextQuestion } from '@/lib/ai';
import { Item } from '@/lib/quizEngine';
import QuizPlayer from '@/components/QuizPlayer';
import { BrainCircuit } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

export default function AdaptiveLearning() {
  // Set page title
  usePageTitle('Învățare adaptivă');
  const [sessionItems, setSessionItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Începem sesiunea cu o întrebare aleatorie
    const fetchFirstQuestion = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const firstQuestion = await aiAdaptiveNextQuestion(null, null);
        setSessionItems([firstQuestion]);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirstQuestion();
  }, []);

  const handleTestFinished = async (wrongAnswers: Item[]) => {
    const lastQuestion = sessionItems[sessionItems.length - 1];
    const wasCorrect = !wrongAnswers.some(item => item.id === lastQuestion.id);
    
    // Cerem următoarea întrebare de la AI
    setIsLoading(true);
    try {
      const nextQuestion = await aiAdaptiveNextQuestion(lastQuestion, wasCorrect);
      setSessionItems(prev => [...prev, nextQuestion]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="card text-center text-red-500">{error}</div>;
  }

  if (isLoading && sessionItems.length === 0) {
    return (
        <div className="card text-center space-y-4">
            <BrainCircuit size={48} className="mx-auto text-primary animate-pulse" />
            <h1 className="text-lg font-semibold">Se pregătește Antrenamentul Inteligent...</h1>
            <p className="text-sm text-muted">AI-ul analizează tematica pentru a alege prima întrebare.</p>
            <Skeleton count={3} />
        </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="card bg-primary/10 border-primary/20 text-center">
        <h1 className="font-semibold">Mod de Învățare Adaptivă</h1>
        <p className="text-xs text-muted mt-1">AI-ul alege următoarea întrebare pe baza răspunsului tău, pentru a-ți consolida cunoștințele.</p>
      </div>
      
      {sessionItems.length > 0 && (
        <QuizPlayer 
          key={sessionItems.length} // Forțează re-randarea componentei pentru fiecare întrebare nouă
          items={[sessionItems[sessionItems.length - 1]]} // Dăm doar ultima întrebare
          moduleName="Antrenament Inteligent"
          onTestFinished={handleTestFinished}
        />
      )}

      {isLoading && sessionItems.length > 0 && (
          <div className="card text-center text-muted">AI-ul alege următoarea întrebare...</div>
      )}
    </div>
  );
}