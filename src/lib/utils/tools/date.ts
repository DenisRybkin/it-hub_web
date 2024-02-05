import { LocaleKeys, LocalStorageKeys } from '@lib/constants';

type DateUnit = { time: number; type: Intl.RelativeTimeFormatUnit };

const getLocale = () =>
  localStorage.getItem(LocalStorageKeys.LOCALE) || LocaleKeys.EN;

const units: Array<DateUnit> = [
  { type: 'year', time: 24 * 60 * 60 * 1000 * 365 },
  { type: 'month', time: (24 * 60 * 60 * 1000 * 365) / 12 },
  { type: 'week', time: 24 * 60 * 60 * 1000 * 7 },
  { type: 'day', time: 24 * 60 * 60 * 1000 },
  { type: 'hour', time: 60 * 60 * 1000 },
  { type: 'minute', time: 60 * 1000 },
];

const rtf = new Intl.RelativeTimeFormat(getLocale(), { numeric: 'auto' });

const formattingByUnit = (unit: DateUnit, date: Date) => {
  const now = new Date().getTime();
  const dateTime = date.getTime();
  const timeDifference = now - dateTime;
  const isDateUnitAgo = timeDifference > unit.time;
  if (isDateUnitAgo)
    return rtf.format(-Math.floor(timeDifference / unit.time), unit.type);
  return undefined;
};

export const humanizeDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  lang = getLocale()
) => {
  for (const unit of units) {
    const result = formattingByUnit(unit, date);
    if (result) return result;
  }
  return date.toLocaleString(lang, options);
};

export const getLastDate = (first: Date, second: Date) =>
  first > second ? first : second;
