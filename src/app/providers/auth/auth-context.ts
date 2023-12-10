import { createContext } from 'react';
import { LocalStorageKeys } from '@lib/constants';
import { Role, User } from '@lib/api/models';

interface IAuthContext {
  isAuth?: boolean;
  accessToken?: string;
  setAccessToken: (token?: string) => void;
  role?: Role;
  user?: User;
  setUser: (user?: User) => void;
  openAuthDialog: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  accessToken: localStorage.getItem(LocalStorageKeys.JWT) ?? undefined,
  setAccessToken: () => {},
  setUser: () => {},
  openAuthDialog: () => {},
});
