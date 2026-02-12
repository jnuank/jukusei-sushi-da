import { useState, useMemo } from 'react';
import { GameScreen } from './components/GameScreen';
import { getQuestions } from './data';
import type { GameResult } from './types';
import './App.css';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type Screen = 'game' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('game');
  const [result, setResult] = useState<GameResult | null>(null);

  const questions = useMemo(() => shuffleArray(getQuestions('mix')), []);

  const handleFinish = (gameResult: GameResult) => {
    setResult(gameResult);
    setScreen('result');
  };

  if (screen === 'result' && result) {
    return (
      <div className="result-screen">
        <h1>結果</h1>
        <p>スコア: {result.score}</p>
        <p>正解数: {result.correctCount}</p>
        <p>ミス: {result.missCount}</p>
        <p>正確率: {(result.accuracy * 100).toFixed(1)}%</p>
        <p>WPM: {result.wpm.toFixed(1)}</p>
        <button onClick={() => window.location.reload()}>もう一度</button>
      </div>
    );
  }

  return <GameScreen questions={questions} duration={60} onFinish={handleFinish} />;
}

export default App;
