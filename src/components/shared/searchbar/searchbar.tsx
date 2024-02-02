import { Input } from '@components/ui/input';
import { useDebounce } from '@lib/utils/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

interface ISearchbarProps {
  onChange?: (value: string) => void;
  onDebounceChange?: (value: string) => void;
  placeholder?: string;
}

export const Searchbar = (props: ISearchbarProps) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce<string>(search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.value);

  useEffect(() => props.onDebounceChange?.(debouncedSearch), [debouncedSearch]);

  return (
    <div className="searchbar">
      <FiSearch size={24} />
      <Input
        id="text"
        value={search}
        onChange={handleChange}
        placeholder={props.placeholder ?? t('ui:placeholder.search')}
        className="no-focus searchbar_input"
      />
    </div>
  );
};
