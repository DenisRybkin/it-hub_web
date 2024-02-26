import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { ISelectItem, SelectAdapter } from '@components/shared/select-adapter';
import { Input } from '@components/ui/input';
import { Order } from '@lib/api/models';
import { useControllableState, useDebounce } from '@lib/utils/hooks';
import { TFunction } from 'i18next';
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

const build_SORTING_BY_DATE = (
  t: TFunction<'translation', undefined>
): ISelectItem<Order>[] => [
  { id: 1, value: Order.ASC, label: t('ui:select.sort.old_ones_first') },
  { id: 2, value: Order.DESC, label: t('ui:select.sort.new_ones_first') },
];

interface ControlsPanelProps {
  sortByDate: Order;
  onChangeSortByDate: Dispatch<SetStateAction<Order>>;
  search: string | undefined;
  onChangeSearch: Dispatch<SetStateAction<string | undefined>>;
}

export const ControlsPanel = (props?: ControlsPanelProps) => {
  const { t } = useTranslation();
  const [order, setOrder] = useControllableState<Order>({
    value: props?.sortByDate,
    onChange: props?.onChangeSortByDate,
    defaultValue: Order.DESC,
  });
  const [search, setSearch] = useControllableState<string | undefined>({
    value: props?.search,
    onChange: props?.onChangeSearch,
    defaultValue: props?.search,
  });

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  return (
    <div className="flex flex-col gap-2">
      <CategoryCardList withSearchParams />
      <div className="flex items-center gap-2 justify-between mt-3">
        <Input
          leftIcon={<FiSearch />}
          variant="ghost"
          placeholder={t('ui:placeholder.enter')}
          type="text"
          className="flex-1"
          value={search}
          onChange={handleChangeSearch}
        />
        <SelectAdapter<Order>
          items={build_SORTING_BY_DATE(t)}
          onValueChange={setOrder}
          label={t('ui:subheader.organize')}
          value={order}
          placeholder={t('ui:placeholder.select')}
          triggerClassName="w-1/3"
        />
      </div>
    </div>
  );
};
