import type { ISelectItem } from '@components/shared/select-adapter';
import { SelectAdapter } from '@components/shared/select-adapter';
import { LocaleKeys, LocalStorageKeys } from '@lib/constants';
import { useTranslation } from 'react-i18next';

const LOCALES: ISelectItem<LocaleKeys>[] = [
  { id: 1, value: LocaleKeys.EN, label: 'English' },
  { id: 2, value: LocaleKeys.RU, label: 'Русский' },
];

export const LocaleSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLocale = (locale: LocaleKeys) =>
    void localStorage.setItem(LocalStorageKeys.LOCALE, locale) ||
    i18n.changeLanguage(locale);

  return (
    <SelectAdapter<LocaleKeys>
      onValueChange={handleChangeLocale}
      label={t('ui:subheader.languages')}
      items={LOCALES}
      value={i18n.language}
      placeholder={t('ui:placeholder.select')}
      triggerClassName="md:w-[180px] w-[120px]"
    />
  );
};
