import { createContext } from 'react';
import { ThemeType } from '@lib/types';

export interface IThemeContext {
  theme: ThemeType;
  setTheme: (mode: ThemeType) => void;
  setReverseTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  setTheme: () => {},
  setReverseTheme: () => {},
});
