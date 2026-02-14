import { useEffect, useRef } from 'react';
import type { Question, GameResult } from '../types';
import { useTypingGame } from '../hooks/useTypingGame';
import { useTimer } from '../hooks/useTimer';
import { TypingDisplay } from './TypingDisplay';
import styles from './GameScreen.module.css';

interface Props {
  questions: Question[];
  duration: number;
  onFinish: (result: GameResult) => void;
}

export function GameScreen({ questions, duration, onFinish }: Props) {
  const timer = useTimer(duration);
  const game = useTypingGame(questions);
  const containerRef = useRef<HTMLDivElement>(null);

  // ゲーム開始時にタイマースタート & フォーカス
  useEffect(() => {
    timer.start();
    containerRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      game.handleKeyPress(e.key);
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onBlur={() => containerRef.current?.focus()}
    >
      <div className={styles.header}>
        <span className={styles.timer} data-urgent={timer.remainingTime <= 10}>
          {timer.remainingTime}
        </span>
        <span className={styles.score}>{game.score}</span>
      </div>
      <div className={styles.questionArea}>
        <TypingDisplay
          text={game.currentQuestion.text}
          charStatuses={game.charStatuses}
          currentPosition={game.currentPosition}
        />
      </div>
    </div>
  );
}
