import { createContext } from 'react';

interface IMetaContext {
  title: string;
  setTitle: (title: string) => void;
}

export const MetaContext = createContext<IMetaContext>({
  title: import.meta.env.VITE_APP_TITLE,
  setTitle: () => {},
});
