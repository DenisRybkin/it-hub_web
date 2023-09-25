import React, { useContext, useEffect } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { api } from '@lib/api/plugins';
import { User } from '@lib/api/models';
import { PreloaderContext } from '@app/providers/preloader';

export const AuthProvider = observer((props: IProviderProps) => {
  const authStore = useRootStore('authStore');
  const preloader = useContext(PreloaderContext);

  const handleSuccess = (user: User) => authStore.setUser(user);

  const handleError = () => authStore.setAccessToken(null);

  const handleFetchCurrentUser = async () => {
    preloader.setVisible(true);
    await api.user.getMe(handleSuccess, handleError);
    preloader.setVisible(false);
  };

  useEffect(() => {
    if (!authStore.getUser && authStore.hasAccess) handleFetchCurrentUser();
  }, [authStore.hasAccess]);

  return <>{props.children}</>;
});
