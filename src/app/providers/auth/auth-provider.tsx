import { useContext, useEffect, useMemo, useState } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { api } from '@lib/api/plugins';
import { User } from '@lib/api/models';
import { PreloaderContext } from '@app/providers/preloader';
import { AuthContext } from '@app/providers/auth/auth-context';
import { LocalStorageKeys, QueryKeys } from '@lib/constants';
import { useQuery } from '@tanstack/react-query';
import { AuthDialog } from '@components/entities/auth/dialogs';
import { HealthContext } from '@app/providers/health';

export const AuthProvider = (props: IProviderProps) => {
  const preloader = useContext(PreloaderContext);
  const health = useContext(HealthContext);

  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem(LocalStorageKeys.JWT) ?? undefined
  );
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState<boolean>(false);

  const handleSuccess = (user: User) => setUser(user);

  const handleError = () => {
    localStorage.removeItem(LocalStorageKeys.JWT);
    handleSetAccessToken(undefined);
  };

  const { isFetching, isSuccess } = useQuery({
    queryKey: [QueryKeys.GET_ME],
    queryFn: async () => await api.user.getMe(handleSuccess, handleError),
    enabled: !user && !!accessToken,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isAuth = useMemo(
    () =>
      !!(accessToken ?? localStorage.getItem(LocalStorageKeys.JWT)) && !!user,
    [accessToken, user]
  );

  const role = useMemo(() => user?.role, [user]);
  const handleSetAccessToken = (token?: string) => {
    setAccessToken(token);
    if (!token) localStorage.removeItem(LocalStorageKeys.JWT);
  };

  const handleOpenAuthDialog = () => setIsOpenAuthDialog(true);

  useEffect(() => {
    !health.isCheckingHealth &&
      !health.isTechnicalWork &&
      preloader.setVisible(isFetching);
  }, [isFetching, health.isTechnicalWork, health.isCheckingHealth]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth,
          setUser,
          user,
          accessToken,
          role,
          setAccessToken: handleSetAccessToken,
          openAuthDialog: handleOpenAuthDialog,
        }}
      >
        <AuthDialog
          isOpen={isOpenAuthDialog}
          onOpenChange={setIsOpenAuthDialog}
        />
        {props.children}
      </AuthContext.Provider>
    </>
  );
};
