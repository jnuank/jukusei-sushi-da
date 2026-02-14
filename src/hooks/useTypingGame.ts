import { useState } from 'react';
import type { Question } from '../types';

export type CharStatus = 'pending' | 'correct' | 'miss';

export function useTypingGame(questions: Question[]) {
  const [questionIndex] = useState(0);
  const [currentPosition] = useState(0);
  const [charStatuses] = useState<CharStatus[]>(
    () => Array(questions[0].text.length).fill('pending'),
  );

  const currentQuestion = questions[questionIndex];

  return {
    currentQuestion,
    currentPosition,
    charStatuses,
  };
}
