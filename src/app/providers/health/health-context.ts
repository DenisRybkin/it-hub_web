import { createContext } from 'react';

interface IHealthContext {
  isTechnicalWork: boolean;
  setIsTechnicalWork: (value: boolean) => void;
  isCheckingHealth: boolean;
}

export const HealthContext = createContext<IHealthContext>({
  isTechnicalWork: import.meta.env.VITE_TECHNICAL_WORK == 'true',
  setIsTechnicalWork: () => {},
  isCheckingHealth: true,
});
