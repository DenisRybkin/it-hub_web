import { IProviderProps } from '@app/providers/i-provider-props';
import { LocationHistoryContext } from '@app/providers/location-history/location-history-context';
import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const LocationHistoryProvider = (props: IProviderProps) => {
  const { pathname } = useLocation();

  const [history, setHistory] = useState<string[]>([]);

  useLayoutEffect(() => {
    setHistory(prev => [...prev, pathname]);
  }, [pathname]);

  return (
    <LocationHistoryContext.Provider value={history}>
      {props.children}
    </LocationHistoryContext.Provider>
  );
};
