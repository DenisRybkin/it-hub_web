import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalStorageKeys } from '@lib/constants';

const currentYear = new Date().getFullYear();
type FormatDateOptions = Intl.DateTimeFormatOptions & {
  showYearWhenIsCurrent?: boolean;
  doNotUsePredefinedOptions?: boolean;
};

export function useDateHelpers() {
  const { t } = useTranslation();

  const locale = useMemo(
    () => localStorage.getItem(LocalStorageKeys.LOCALE) ?? 'en',
    [t]
  );

  const postProcessFormatDateOptions = (
    date: Date,
    options: FormatDateOptions
  ): FormatDateOptions => {
    options.year =
      options.showYearWhenIsCurrent == false &&
      date.getFullYear() == currentYear
        ? undefined
        : 'numeric';
    return options;
  };

  const postProcessFormatDateString = (dateString: string): string => {
    let str = dateString;

    if (['ru'].includes(locale)) {
      str = str.replace(',', '');
    }

    return str;
  };

  const getDefaultFormatDateOptions = (): FormatDateOptions =>
    ({
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      showYearWhenIsCurrent: false,
    } as FormatDateOptions);

  function formatDate(
    date: Date,
    options: FormatDateOptions | null = null
  ): string {
    const defaultOptions = options?.doNotUsePredefinedOptions
      ? { showYearWhenIsCurrent: false }
      : getDefaultFormatDateOptions();
    options = postProcessFormatDateOptions(
      date,
      options == null ? defaultOptions : { ...defaultOptions, ...options }
    );
    return postProcessFormatDateString(
      date.toLocaleDateString(locale, options)
    );
  }

  function formatDateString(
    dateString: string,
    options: FormatDateOptions | null = null
  ): string {
    return formatDate(
      new Date(dateString),
      options ?? getDefaultFormatDateOptions()
    );
  }

  return {
    formatDate,
    formatDateString,
  };
}
