// TYPE PATCH for quizEngine (pool indexing + 'as const' on arrays)
export type Difficulty = 'easy'|'medium'|'hard';

export type Item = {
  id: string;
  module: string;
  question: string;
  choices: string[];
  answer: number;
};

export function pickFromPools(pool: Record<Difficulty, Item[]>, tryOrder: Difficulty[]): { pick?: Item; lastDifficulty?: Difficulty }{
  let pick: Item|undefined;
  let lastDifficulty: Difficulty|undefined;
  for (const d of tryOrder) {
    if (pool[d] && pool[d].length) { pick = pool[d].shift(); lastDifficulty = d; break; }
  }
  return { pick, lastDifficulty };
}
