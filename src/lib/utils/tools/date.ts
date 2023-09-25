import { LocaleKeys, LocaleStorageKeys } from '@lib/constants';

const getLocale = () =>
  localStorage.getItem(LocaleStorageKeys.LOCALE) || LocaleKeys.EN;

export function humanizeDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  lang = getLocale()
) {
  return date.toLocaleString(lang, options);
}
