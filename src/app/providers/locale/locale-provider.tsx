import React, { useEffect, useLayoutEffect } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { EnResources } from '@locales/en';
import { RuResources } from '@locales/ru';
import { LocaleKeys, LocaleStorageKeys } from '@lib/constants';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const LocaleProvider = (props: IProviderProps) => {
  const resources = {
    ru: RuResources,
    en: EnResources,
  };

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: false,
      lng: localStorage.getItem(LocaleStorageKeys.LOCALE) ?? LocaleKeys.EN,
      supportedLngs: [LocaleKeys.RU, LocaleKeys.EN],
      interpolation: {
        escapeValue: false,
      },
      cleanCode: true,
      lowerCaseLng: true,
      nonExplicitSupportedLngs: true,
      resources,
    });

  useLayoutEffect(() => {
    !localStorage.getItem(LocaleStorageKeys.LOCALE) &&
      localStorage.setItem(
        LocaleStorageKeys.LOCALE,
        navigator.language ?? LocaleKeys.EN
      );
  }, []);

  return <>{props.children}</>;
};
