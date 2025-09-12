import React, { useState } from 'react';
import type { Item } from '@/lib/quizEngine';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizPlayerProps {
    items: Item[];
    moduleName: string;
    onTestFinished: (wrongItems: Item[]) => void;
}

export default function QuizPlayer({ items, moduleName, onTestFinished }: QuizPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [wrongAnswers, setWrongAnswers] = useState<Item[]>([]);

    const currentItem = items[currentIndex];
    const isAnswered = selectedOption !== null;

    const handleSelectOption = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        if (index !== currentItem.answer) {
            setWrongAnswers(prev => [...prev, currentItem]);
        }
    };

    const handleNext = () => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            onTestFinished(wrongAnswers);
        }
    };
    
    // Funcție pentru a determina stilul butonului
    const getButtonClass = (index: number) => {
        if (!isAnswered) {
            return 'btn btn-outline'; // Stilul default
        }
        if (index === currentItem.answer) {
            return 'btn btn-success'; // Răspunsul corect
        }
        if (index === selectedOption) {
            return 'btn btn-error'; // Răspunsul greșit selectat
        }
        return 'btn btn-outline opacity-50'; // Celelalte opțiuni
    };

    if (items.length === 0) {
        return (
            <div className="card bg-base-200 text-center">
                <div className="card-body">
                    <h2 className="card-title">Eroare</h2>
                    <p>Nu s-au putut încărca întrebările pentru acest modul.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="card-title">{moduleName}</h2>
                                <span className="badge badge-primary">
                                    {currentIndex + 1} / {items.length}
                                </span>
                            </div>
                            <p className="text-lg font-semibold mb-6 min-h-16">{currentItem.question}</p>
                            <div className="space-y-3">
                                {currentItem.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full justify-start h-auto py-3 text-left whitespace-normal ${getButtonClass(index)}`}
                                        onClick={() => handleSelectOption(index)}
                                        disabled={isAnswered}
                                    >
                                        <span className="font-mono mr-4">{String.fromCharCode(65 + index)}</span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {isAnswered && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-6 p-4 bg-base-300 rounded-md border border-base-100"
                                >
                                    <h4 className="font-bold mb-2">Explicație:</h4>
                                    <p>{currentItem.explanation}</p>
                                </motion.div>
                            )}

                            <div className="card-actions justify-end mt-6">
                               {isAnswered && (
                                    <button className="btn btn-primary" onClick={handleNext}>
                                        {currentIndex === items.length - 1 ? 'Finalizează Testul' : 'Următoarea Întrebare'}
                                    </button>
                               )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}