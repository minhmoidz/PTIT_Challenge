import { useState, useEffect, useRef } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateCountdown = (targetDate: Date | null, clockOffsetMs = 0): CountdownValue => {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const now = Date.now() + clockOffsetMs;
  const diff = targetDate.getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
};

export const useCountdown = (targetDate: Date | null, clockOffsetMs = 0): CountdownValue => {
  const [countdown, setCountdown] = useState<CountdownValue>(() =>
    calculateCountdown(targetDate, clockOffsetMs)
  );
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!targetDate) {
      return;
    }

    const tick = () => {
      const next = calculateCountdown(targetDate, clockOffsetMs);
      setCountdown(next);
      if (!next.isExpired) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetDate, clockOffsetMs]);

  return targetDate ? countdown : { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
};
