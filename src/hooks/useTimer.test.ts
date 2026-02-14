import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('初期状態で指定した秒数が残り時間となる', () => {
    const { result } = renderHook(() => useTimer(60));
    expect(result.current.remainingTime).toBe(60);
  });

  it('start後に1秒ごとにカウントダウンする', () => {
    const { result } = renderHook(() => useTimer(60));
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.remainingTime).toBe(59);
  });

  it('0以下にはならない', () => {
    const { result } = renderHook(() => useTimer(2));
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.remainingTime).toBe(0);
  });

  it('残り時間が0になるとisTimeUpがtrueになる', () => {
    const { result } = renderHook(() => useTimer(3));
    expect(result.current.isTimeUp).toBe(false);
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.isTimeUp).toBe(true);
  });

  it('経過時間が取得できる', () => {
    const { result } = renderHook(() => useTimer(60));
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.elapsedTime).toBe(10);
  });
});
