import { useContext, useEffect, useMemo, useState } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { api } from '@lib/api/plugins';
import { User } from '@lib/api/models';
import { PreloaderContext } from '@app/providers/preloader';
import { AuthContext } from '@app/providers/auth/auth-context';
import { LocaleStorageKeys } from '@lib/constants';

export const AuthProvider = (props: IProviderProps) => {
  const preloader = useContext(PreloaderContext);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem(LocaleStorageKeys.JWT) ?? undefined
  );

  const isAuth = useMemo(
    () =>
      !!(accessToken ?? localStorage.getItem(LocaleStorageKeys.JWT)) && !!user,
    [accessToken, user]
  );

  const role = useMemo(() => user?.role, [user]);
  const handleSetAccessToken = (token?: string) => {
    setAccessToken(token);
    if (!token) localStorage.removeItem(LocaleStorageKeys.JWT);
  };

  const handleSuccess = (user: User) => setUser(user);
  const handleError = () => handleSetAccessToken(undefined);

  const handleFetchCurrentUser = async () => {
    preloader.setVisible(true);
    await api.user.getMe(handleSuccess, handleError);
    preloader.setVisible(false);
  };

  useEffect(() => {
    if (!user && accessToken) handleFetchCurrentUser();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setUser,
        user,
        accessToken,
        role,
        setAccessToken: handleSetAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
