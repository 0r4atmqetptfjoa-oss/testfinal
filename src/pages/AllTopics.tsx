import React, { useState, useEffect } from 'react';
import usePageTitle from '@/hooks/usePageTitle';
import { useNavigate } from 'react-router-dom';
import QuizPlayer from '@/components/QuizPlayer';
import { getLegislationQuestions, getEnglishQuestions, getPsychologyQuestions } from '@/lib/questions';
import { loadSpecialtyQuestions } from '@/lib/contentLoader'; // Din nou, importăm funcția
import { Question } from '@/public/data/v12/types';
import { Book, Globe, Shield, Brain } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

type Module = 'specialty' | 'legislation' | 'english' | 'psychology';

export default function AllTopics() {
  const nav = useNavigate();
  // Update page title
  usePageTitle('Teste Generale');
  const [module, setModule] = useState<Module | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    const userSelection = localStorage.getItem('userSelection');
    if (userSelection) {
      setSelection(JSON.parse(userSelection));
    }
  }, []);

  const startQuiz = async (selectedModule: Module) => {
    setIsLoading(true);
    let q: Question[] = [];
    let title = '';
    switch (selectedModule) {
      case 'specialty':
        q = await loadSpecialtyQuestions();
        title = `Specialitate (${selection?.branch || ''})`;
        break;
      case 'legislation':
        q = await getLegislationQuestions();
        title = 'Legislație';
        break;
      case 'english':
        q = await getEnglishQuestions();
        title = 'Engleză';
        break;
      case 'psychology':
        q = await getPsychologyQuestions();
        title = 'Psihologie';
        break;
    }
    setQuestions(q);
    setModule(selectedModule);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className='p-4'><Skeleton count={10} /></div>;
  }

  if (questions && module) {
    return (
      <QuizPlayer
        questions={questions}
        onComplete={(finalScore, detailedAnswers) => {
          setModule(null);
          setQuestions(null);
          nav('/progress', { state: { lastQuiz: detailedAnswers, score: finalScore } });
        }}
        title={`Test Grilă - ${module.charAt(0).toUpperCase() + module.slice(1)}`}
      />
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Teste Generale</h1>
      <p>Alege un modul pentru a începe un test grilă.</p>
      <div className="space-y-3">
        {selection && (
          <button onClick={() => startQuiz('specialty')} className="w-full p-4 bg-primary text-white rounded-lg flex items-center gap-4">
            <Shield size={24} />
            <div className='text-left'>
              <p className="font-semibold">Specialitate ({selection.branch})</p>
              <p className="text-sm opacity-80">Teste specifice armei tale</p>
            </div>
          </button>
        )}
        <button onClick={() => startQuiz('legislation')} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center gap-4">
          <Book size={24} />
          <div className='text-left'>
            <p className="font-semibold">Legislație</p>
            <p className="text-sm opacity-80">Întrebări din legislația apărării</p>
          </div>
        </button>
        <button onClick={() => startQuiz('english')} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center gap-4">
          <Globe size={24} />
           <div className='text-left'>
            <p className="font-semibold">Engleză</p>
            <p className="text-sm opacity-80">Teste de limba engleză</p>
          </div>
        </button>
        <button onClick={() => startQuiz('psychology')} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center gap-4">
          <Brain size={24} />
           <div className='text-left'>
            <p className="font-semibold">Psihologie</p>
            <p className="text-sm opacity-80">Teste de evaluare psihologică</p>
          </div>
        </button>
      </div>
    </div>
  );
}