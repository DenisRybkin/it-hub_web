import { useMemo } from 'react';

export const declension = (count: number, titles: string[]): string => {
  if (!count) return titles[2];

  const cases: number[] = [2, 0, 1, 1, 1, 2];
  const absoluteValueOfNumber: number = Math.abs(count);

  return titles[
    absoluteValueOfNumber % 100 > 4 && absoluteValueOfNumber % 100 < 20
      ? 2
      : cases[absoluteValueOfNumber % 10 < 5 ? absoluteValueOfNumber % 10 : 5]
  ];
};

export const useDeclension = (count: number, titles: string[]): string =>
  useMemo(() => declension(count, titles), [count, titles.length]);
