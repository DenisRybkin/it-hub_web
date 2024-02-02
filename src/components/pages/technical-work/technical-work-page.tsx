import React from 'react';
import { useBackground } from '@lib/utils/hooks';
import { useTranslation } from 'react-i18next';
import Logo from '@assets/images/logo-dark-theme.svg';

export const TechnicalWorkPage = () => {
  useBackground('/technical-work.png', 'cover');
  const { t } = useTranslation();

  return (
    <div className="h-screen overflow-hidden relative w-full flex justify-center items-center">
      <div className="h-full flex flex-col justify-center items-center w-5/6 lg:w-1/2 text-center gap-3">
        <img src={Logo} alt="Logo" />
        <h1 className="text-heading2-bold">{t('ui:title.technical_works')}</h1>
        <p>{t('ui:subheader.technical_works')}</p>
        <b>{t('ui:subheader.technical_works_sorry')}</b>
      </div>
    </div>
  );
};
