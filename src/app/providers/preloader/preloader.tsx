import React, { useContext, useState } from 'react';
import { ThemeContext } from '@app/providers/theme';
import Logo from '@assets/icons/favicon.svg';
import { useTranslation } from 'react-i18next';

export const Preloader = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="animation-all w-full h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-dark-2 z-50">
      <h2 className="mb-36 text-heading2-semibold md:text-heading1-semibold">
        {t('text:loading_data')}
      </h2>
      <div className="w-2/5 h-2/5 md:w-1/5 md:h-1/5 animate-bounce">
        <img src={Logo} alt="logo" />
      </div>
      <span className="mt-0 md:mt-40">{t('text:please_wait')}</span>
    </div>
  );
};
