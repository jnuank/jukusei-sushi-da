import { useState, useCallback } from 'react';
import type { Question } from '../types';

export type CharStatus = 'pending' | 'correct' | 'miss';

export function useTypingGame(questions: Question[]) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>(
    () => Array(questions[0].text.length).fill('pending'),
  );
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[questionIndex];

  const handleKeyPress = useCallback((key: string) => {
    if (isFinished) return;

    const expected = questions[questionIndex].text[currentPosition];
    const isCorrect = key === expected;

    setCharStatuses((prev) => {
      const next = [...prev];
      next[currentPosition] = isCorrect ? 'correct' : 'miss';
      return next;
    });

    if (!isCorrect) {
      setMissCount((prev) => prev + 1);
    }

    setTotalChars((prev) => prev + 1);

    const nextPosition = currentPosition + 1;

    if (nextPosition >= questions[questionIndex].text.length) {
      // 問題完了
      if (isCorrect || !isCorrect) {
        setCorrectCount((prev) => prev + 1);
        setScore((prev) => prev + questions[questionIndex].text.length * 10);
      }

      const nextIndex = questionIndex + 1;
      if (nextIndex >= questions.length) {
        setIsFinished(true);
        setCurrentPosition(nextPosition);
      } else {
        setQuestionIndex(nextIndex);
        setCurrentPosition(0);
        setCharStatuses(Array(questions[nextIndex].text.length).fill('pending'));
      }
    } else {
      setCurrentPosition(nextPosition);
    }
  }, [isFinished, questionIndex, currentPosition, questions]);

  return {
    currentQuestion,
    currentPosition,
    charStatuses,
    score,
    correctCount,
    missCount,
    totalChars,
    isFinished,
    handleKeyPress,
  };
}
