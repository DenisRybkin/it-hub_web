import { IThemeContext } from '@app/providers/theme/theme-context';
import { ThemeType } from '@lib/types';
import { useEffect, useState } from 'react';

export const useTheme = (): IThemeContext => {
  const matchMediaLightScheme = matchMedia('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useState<ThemeType>(
    matchMediaLightScheme.matches ? 'dark' : 'light'
  );

  const setReverseTheme = () =>
    setTheme(prev => (prev == 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    function eventHandler(event: MediaQueryListEvent) {
      setTheme(event.matches ? 'dark' : 'light');
    }

    matchMediaLightScheme.addEventListener('change', eventHandler);
    return () => {
      matchMediaLightScheme.removeEventListener('change', eventHandler);
    };
  }, []);

  if (theme == null) throw new Error("Color scheme can't be unset.");

  return {
    theme,
    setTheme,
    setReverseTheme,
  };
};
