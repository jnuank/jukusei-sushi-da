import { renderHook, act } from '@testing-library/react';
import { useTypingGame } from './useTypingGame';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  { text: 'const', category: 'keyword' },
  { text: 'let', category: 'keyword' },
];

describe('useTypingGame', () => {
  it('初期状態で最初の問題が表示される', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    expect(result.current.currentQuestion.text).toBe('const');
  });

  it('初期状態でカーソル位置が0である', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    expect(result.current.currentPosition).toBe(0);
  });

  it('初期状態で全文字がpendingである', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    expect(result.current.charStatuses).toEqual([
      'pending', 'pending', 'pending', 'pending', 'pending',
    ]);
  });

  it('正しい文字を入力するとcorrectになり位置が進む', () => {
    const { result } = renderHook(() => useTypingGame(mockQuestions));
    act(() => {
      result.current.handleKeyPress('c');
    });
    expect(result.current.charStatuses[0]).toBe('correct');
    expect(result.current.currentPosition).toBe(1);
  });
});
