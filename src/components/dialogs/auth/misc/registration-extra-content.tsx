import React from 'react';
import { useTranslation } from 'react-i18next';
import { IExtraContentProps } from '@components/dialogs/auth/misc/index';

export const RegistrationExtraContent = (props: IExtraContentProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-neutral-400 text-center mt-4 font-light">
      <div className="flex flex-row justify-start items-center gap-2">
        <div>{t('text:already_have_account')}</div>
        <div
          onClick={props.onClick}
          className="text-primary-500 cursor-pointer hover:underline"
        >
          {t('ui:button.sign_in')}
        </div>
      </div>
    </div>
  );
};
