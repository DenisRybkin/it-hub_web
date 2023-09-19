import { IProviderProps } from '@app/providers/i-provider-props';
import { ThemeContext } from '@app/providers/theme/theme-context';
import { useTheme } from '@app/providers/theme/useTheme';
import { useEffect } from 'react';

export const ThemeProvider = (props: IProviderProps) => {
  const { theme, setReverseTheme, setTheme } = useTheme();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        return document.documentElement.classList.add('dark');
      case 'light':
        return document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setReverseTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
