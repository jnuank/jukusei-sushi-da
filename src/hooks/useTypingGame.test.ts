import { renderHook, act } from '@testing-library/react';
import { useTypingGame } from './useTypingGame';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  { text: 'const', category: 'keyword' },
  { text: 'let', category: 'keyword' },
  { text: 'var', category: 'keyword' },
];

describe('useTypingGame', () => {
  it('初期状態で最初の問題が表示される', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    expect(result.current.currentQuestion.text).toBe('const');
    expect(result.current.currentPosition).toBe(0);
    expect(result.current.charStatuses).toEqual([
      'pending', 'pending', 'pending', 'pending', 'pending',
    ]);
  });

  it('正しい文字を入力すると位置が進みcorrectになる', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    act(() => {
      result.current.handleKeyPress('c');
    });
    expect(result.current.currentPosition).toBe(1);
    expect(result.current.charStatuses[0]).toBe('correct');
  });

  it('間違った文字を入力するとmissになり位置が進む', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    act(() => {
      result.current.handleKeyPress('x');
    });
    expect(result.current.currentPosition).toBe(1);
    expect(result.current.charStatuses[0]).toBe('miss');
    expect(result.current.missCount).toBe(1);
  });

  it('問題を最後まで正しく入力すると次の問題に進む', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    for (const char of 'const') {
      act(() => {
        result.current.handleKeyPress(char);
      });
    }
    expect(result.current.currentQuestion.text).toBe('let');
    expect(result.current.currentPosition).toBe(0);
    expect(result.current.correctCount).toBe(1);
  });

  it('スコアが問題の文字数 × 10で加算される', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    // "const" = 5文字 × 10 = 50点
    for (const char of 'const') {
      act(() => {
        result.current.handleKeyPress(char);
      });
    }
    expect(result.current.score).toBe(50);
  });

  it('合計タイプ数が正しくカウントされる', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    act(() => {
      result.current.handleKeyPress('c'); // correct
    });
    act(() => {
      result.current.handleKeyPress('x'); // miss
    });
    expect(result.current.totalChars).toBe(2);
  });

  it('全問題を終えるとisFinishedがtrueになる', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    for (const word of ['const', 'let', 'var']) {
      for (const char of word) {
        act(() => {
          result.current.handleKeyPress(char);
        });
      }
    }
    expect(result.current.isFinished).toBe(true);
  });
});
