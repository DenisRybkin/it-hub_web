import { useContext, useEffect, useMemo, useState } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { api } from '@lib/api/plugins';
import { User } from '@lib/api/models';
import { PreloaderContext } from '@app/providers/preloader';
import { AuthContext } from '@app/providers/auth/auth-context';
import { LocaleStorageKeys, QueryKeys } from '@lib/constants';
import { useQuery } from '@tanstack/react-query';

export const AuthProvider = (props: IProviderProps) => {
  const preloader = useContext(PreloaderContext);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem(LocaleStorageKeys.JWT) ?? undefined
  );

  const handleSuccess = (user: User) => setUser(user);

  const handleError = () => {
    localStorage.removeItem(LocaleStorageKeys.JWT);
    handleSetAccessToken(undefined);
  };

  const { isLoading, isFetching } = useQuery({
    queryKey: [QueryKeys.GET_ME],
    queryFn: async () => await api.user.getMe(handleSuccess, handleError),
    enabled: !user && !!accessToken,
    onSuccess: handleSuccess,
    onError: handleError,
  });

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

  useEffect(() => {
    preloader.setVisible(isFetching);
  }, [isFetching]);

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
