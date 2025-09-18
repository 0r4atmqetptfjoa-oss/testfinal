// Centralized application types
// This file re‑exports common types used across the application.

// A `Question` represents a single multiple‑choice question loaded from public data.
// It matches the schema defined in `public/data/v12/types.ts` but lives in src/
// so it can participate in module resolution and strict type checking.
export type Question = {
  /** Unique identifier for the question */
  id: string;
  /** Source module from which the question originates (e.g. legislation, logistics) */
  module: 'legislation' | 'logistics' | 'english' | 'psychology' | 'specialty';
  /** The text stem of the question */
  stem: string;
  /** Array of answer options */
  options: string[];
  /** Index into the `options` array representing the correct answer */
  answerIndex: number;
  /** Explanation or rationale for the answer */
  explanation: string;
};

// Re‑export the `Item` and `BuildOptions` types from the quiz engine. These types
// describe the internal representation of quiz items and configuration options.
export type { Item, BuildOptions } from '../lib/quizEngine';