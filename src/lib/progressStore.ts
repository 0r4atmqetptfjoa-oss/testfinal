// src/lib/progressStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type WrongAnswer = {
    questionId: string;
    module: string;
    category?: string; // e.g. "Constituție", "Tactică"
}

export type TestResult = {
  id: string;
  module: string;
  score: number;
  total: number;
  date: number;
  duration: number; // Durata în secunde
  wrongAnswers: WrongAnswer[]; // Lista întrebărilor greșite
};

type ProgressState = {
  results: TestResult[];
  addResult: (result: Omit<TestResult, 'id' | 'date'>) => void; // Facem id și date automate
  clearResults: () => void;
};

const getInitialState = (): TestResult[] => {
  try {
    const saved = localStorage.getItem('userTestProgress_v2'); // Versiune nouă
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useProgressStore = create<ProgressState>()(
  immer((set) => ({
    results: getInitialState(),
    addResult: (result) => {
      const newResult: TestResult = {
        ...result,
        id: `${result.module.toLowerCase().replace(' ', '-')}-${Date.now()}`,
        date: Date.now(),
      };
      set((state) => {
        state.results.unshift(newResult);
        if (state.results.length > 100) state.results.pop();
        localStorage.setItem('userTestProgress_v2', JSON.stringify(state.results));
      });
    },
    clearResults: () => {
      set((state) => {
        state.results = [];
        localStorage.removeItem('userTestProgress_v2');
      });
    },
  }))
);