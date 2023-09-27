import { createContext } from 'react';
import { LocaleStorageKeys } from '@lib/constants';
import { Role, User } from '@lib/api/models';

interface IAuthContext {
  isAuth?: boolean;
  accessToken?: string;
  setAccessToken: (token?: string) => void;
  role?: Role;
  user?: User;
  setUser: (user?: User) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  accessToken: localStorage.getItem(LocaleStorageKeys.JWT) ?? undefined,
  setAccessToken: () => {},
  setUser: () => {},
});
