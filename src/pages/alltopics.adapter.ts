// Adapter to map Question -> Item expected by QuizPlayer
import type { Question } from '@/src/types/question';
import type { Item } from '@/utils/quizEngine';
export function mapQuestionToItem(q: Question): Item {
  return {
    id: q.id,
    module: 'specialty',
    question: q.stem,
    choices: q.options,
    answer: q.answerIndex
  };
}
