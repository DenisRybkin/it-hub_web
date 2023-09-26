import type { IBaseDialogProps } from '@components/dialogs/base';
import { DialogAdapter } from '@components/dialogs/base';
import { LoginForm, RegistrationForm } from '@components/forms/auth';

import Logo from '../../../assets/icons/favicon.svg';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { LoginSchema } from '@lib/utils/validations/login-schema';
import {
  LoginExtraContent,
  RegistrationExtraContent,
} from '@components/dialogs/auth/misc';
import { RegistrationSchema } from '@lib/utils/validations/registration-schema';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import { BaseProcessedError, LoginResponseType } from '@lib/api/models';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { LocaleStorageKeys } from '@lib/constants';

type AuthStrategyType = 'login' | 'registration';

interface IAuthDialogProps extends IBaseDialogProps {
  strategy?: AuthStrategyType;
}

export const AuthDialog = observer((props: IAuthDialogProps) => {
  const { t } = useTranslation();

  const authStore = useRootStore('authStore');

  const [authStrategy, setAuthStrategy] = useState<AuthStrategyType>(
    props.strategy ?? 'login'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWrongCredentials, setIsWrongCredentials] = useState<boolean>(false);

  const handleLoginSuccess = (response: LoginResponseType) => {
    authStore.setUser(response.user);
    authStore.setAccessToken(response.access);
    localStorage.setItem(LocaleStorageKeys.JWT, response.access);
    toast({
      variant: 'success',
      title: t('toast:success.auth_success'),
    });
    handleOpenChange(false);
  };

  const handleRegistrationSuccess = (response: LoginResponseType) => {
    authStore.setUser(response.user);
    authStore.setAccessToken(response.access);
    localStorage.setItem(LocaleStorageKeys.JWT, response.access);
    toast({
      variant: 'success',
      title: t('toast:success.registration_success'),
    });
    handleOpenChange(false);
  };

  const handleAuthError = (error: BaseProcessedError) => {
    if (error.statusCode == 401 && authStrategy == 'login')
      setIsWrongCredentials(true);
    else
      toast({
        variant: 'destructive',
        title: t('toast:error.default'),
      });
  };

  const handleLogin = async (dto: z.infer<typeof LoginSchema>) => {
    setIsWrongCredentials(false);
    setIsLoading(true);
    await api.auth.login(dto, handleLoginSuccess, handleAuthError);
    setIsLoading(false);
  };

  const handleRegistration = async (
    dto: z.infer<typeof RegistrationSchema>
  ) => {
    setIsLoading(true);
    await api.auth.registration(
      dto,
      handleRegistrationSuccess,
      handleAuthError
    );
    setIsLoading(false);
  };

  const handleSetAuthStrategy = (strategy: AuthStrategyType) => () =>
    setAuthStrategy(strategy);

  const dialogTitle = useMemo(() => {
    switch (authStrategy) {
      case 'login':
        return t('ui:title.sign_in');
      case 'registration':
        return t('ui:title.sign_up');
    }
  }, [authStrategy]);

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (open) setIsLoading(false);
    props.onOpenChange(open);
  };

  return (
    <DialogAdapter
      isOpen={props.isOpen}
      onOpenChange={handleOpenChange}
      title={dialogTitle}
    >
      <div className="flex w-full justify-center mt-5">
        <img src={Logo} alt="logo" className="w-28" />
      </div>
      {authStrategy == 'login' && (
        <>
          <LoginForm
            extraFromContent={
              <LoginExtraContent
                isWrongCredentials={isWrongCredentials}
                onClick={handleSetAuthStrategy('registration')}
              />
            }
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
        </>
      )}
      {authStrategy == 'registration' && (
        <RegistrationForm
          extraFromContent={
            <RegistrationExtraContent
              onClick={handleSetAuthStrategy('login')}
            />
          }
          isLoading={isLoading}
          onSubmit={handleRegistration}
        />
      )}
    </DialogAdapter>
  );
});
