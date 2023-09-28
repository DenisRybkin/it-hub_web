import React from 'react';
import { useTranslation } from 'react-i18next';
import { IExtraContentProps } from '@components/dialogs/auth/misc/index';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { FiAlertCircle } from 'react-icons/fi';

export const LoginExtraContent = (props: IExtraContentProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4">
      {props.isWrongCredentials && (
        <Alert className="mb-4" variant="destructive">
          <FiAlertCircle className="h-4 w-4" />
          <AlertTitle>{t('text:error')}</AlertTitle>
          <AlertDescription>
            {t('text:wrong_email_or_password')}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-row justify-start items-center gap-2 text-neutral-400 text-center font-light">
        <div className="text-left">{t('text:first_time_using')}</div>
        <div
          onClick={props.onClick}
          className="text-primary-500 cursor-pointer hover:underline"
        >
          {t('text:create_account')}
        </div>
      </div>
    </div>
  );
};
