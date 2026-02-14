import { useState, useCallback } from 'react';
import type { Question } from '../types';

export type CharStatus = 'pending' | 'correct' | 'miss';

export function useTypingGame(questions: Question[]) {
  const [questionIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>(
    () => Array(questions[0].text.length).fill('pending'),
  );

  const currentQuestion = questions[questionIndex];

  const handleKeyPress = useCallback((key: string) => {
    const expected = questions[questionIndex].text[currentPosition];
    const isCorrect = key === expected;

    setCharStatuses((prev) => {
      const next = [...prev];
      next[currentPosition] = isCorrect ? 'correct' : 'miss';
      return next;
    });

    setCurrentPosition((prev) => prev + 1);
  }, [questionIndex, currentPosition, questions]);

  return {
    currentQuestion,
    currentPosition,
    charStatuses,
    handleKeyPress,
  };
}
