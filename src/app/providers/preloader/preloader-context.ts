import { createContext } from 'react';

interface IPreloaderContext {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}

export const PreloaderContext = createContext<IPreloaderContext>({
  isVisible: false,
  setVisible: () => {},
});
