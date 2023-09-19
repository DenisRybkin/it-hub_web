import { useEffect, useRef, useState } from 'react';

export interface IUseTimer {
  start: (minutes: number) => void;
  end: () => void;
  isEnd: boolean;
  remainingTime: string;
}

export const useTimer = (): IUseTimer => {
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [currentIntervalNode, setCurrentIntervalNode] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const timeMinutesRef = useRef<number>(0);

  const timer = () => {
    const seconds = timeMinutesRef.current % 60;
    const minutes = (timeMinutesRef.current / 60) % 60;
    if (timeMinutesRef.current <= 0) {
      setIsEnd(true);
    } else {
      const strSeconds = Math.trunc(seconds);
      const strMinutes = Math.trunc(minutes);
      const remainingTimeStr = `${strMinutes}:${
        strSeconds.toString().length < 2 ? '0' + strSeconds : strSeconds
      }`;
      setRemainingTime(remainingTimeStr);
    }
    timeMinutesRef.current = --timeMinutesRef.current;
  };

  const start = (timeMinutes: number) => {
    isEnd && setIsEnd(false);
    timeMinutesRef.current = timeMinutes * 60;
    const intervalNode = setInterval(timer, 1000);
    setCurrentIntervalNode(intervalNode);
  };

  const end = () => {
    clearInterval(currentIntervalNode);
    setCurrentIntervalNode(undefined);
  };

  useEffect(() => {
    if (isEnd) end();
  }, [isEnd]);

  return {
    remainingTime,
    isEnd,
    end,
    start,
  };
};
