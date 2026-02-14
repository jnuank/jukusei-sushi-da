import { useState, useCallback, useRef, useEffect } from 'react';

export function useTimer(duration: number) {
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning || remainingTime <= 0) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        const next = prev - 1;
        return next <= 0 ? 0 : next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingTime <= 0]);

  const isTimeUp = remainingTime <= 0;
  const elapsedTime = duration - remainingTime;

  return {
    remainingTime,
    isTimeUp,
    elapsedTime,
    start,
  };
}
