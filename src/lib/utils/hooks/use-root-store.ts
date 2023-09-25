import { RootStore } from '@lib/store';
import { useContext } from 'react';
import { StoreContext } from '@app/providers/store';

export const useRootStore = (keyStore: keyof RootStore) => {
  const context = useContext(StoreContext);
  if (!context)
    throw new Error("useRootStore must be used within it's context provider");
  return context[keyStore];
};
