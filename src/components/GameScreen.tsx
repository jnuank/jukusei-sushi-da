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
  const hasFinishedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // ゲーム開始時にタイマースタート & フォーカス
  useEffect(() => {
    timer.start();
    containerRef.current?.focus();
  }, []);

  // キーボード入力のハンドリング
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        game.handleKeyPress(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [game.handleKeyPress]);

  // 時間切れまたは全問完了でゲーム終了
  useEffect(() => {
    if ((timer.isTimeUp || game.isFinished) && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      const elapsed = timer.isTimeUp ? duration : timer.elapsedTime;
      const totalKeystrokes = game.totalChars;
      const accuracy = totalKeystrokes > 0
        ? (totalKeystrokes - game.missCount) / totalKeystrokes
        : 0;
      const wpm = elapsed > 0
        ? ((totalKeystrokes - game.missCount) / 5) / (elapsed / 60)
        : 0;

      onFinish({
        score: game.score,
        correctCount: game.correctCount,
        missCount: game.missCount,
        accuracy,
        wpm,
        totalChars: totalKeystrokes,
        elapsedTime: elapsed,
      });
    }
  }, [timer.isTimeUp, game.isFinished]);

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
