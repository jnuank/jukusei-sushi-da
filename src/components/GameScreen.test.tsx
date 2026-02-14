import { render, screen, fireEvent } from '@testing-library/react';
import { GameScreen } from './GameScreen';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  { text: 'const', category: 'keyword' },
  { text: 'let', category: 'keyword' },
];

describe('GameScreen', () => {
  it('残り時間が表示される', () => {
    render(<GameScreen questions={mockQuestions} duration={60} onFinish={() => {}} />);
    expect(screen.getByText('60')).toBeInTheDocument();
  });

  it('スコアが表示される', () => {
    render(<GameScreen questions={mockQuestions} duration={60} onFinish={() => {}} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('問題文が表示される', () => {
    render(<GameScreen questions={mockQuestions} duration={60} onFinish={() => {}} />);
    expect(screen.getByTestId('char-0')).toHaveTextContent('c');
    expect(screen.getByTestId('char-1')).toHaveTextContent('o');
  });

  it('キー入力で正誤判定が行われる', () => {
    const { container } = render(<GameScreen questions={mockQuestions} duration={60} onFinish={() => {}} />);
    const gameContainer = container.firstElementChild!;
    fireEvent.keyDown(gameContainer, { key: 'c' });
    expect(screen.getByTestId('char-0')).toHaveAttribute('data-status', 'correct');
  });
});
