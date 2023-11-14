import { FilterOption } from '@lib/api/types';

export const filters2QueryKey = <TFilter>(filters?: FilterOption<TFilter>[]) =>
  filters
    ? filters
        .map(item => `${item.key as string}.${item.type}=${item.value}`)
        .join('&')
    : '';
