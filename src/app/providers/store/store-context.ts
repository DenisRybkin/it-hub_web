import { createContext } from 'react';
import { RootStore, rootStore } from '@lib/store/root-store';

export const StoreContext = createContext<RootStore>(rootStore);
