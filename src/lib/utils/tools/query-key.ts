import { Order } from '@lib/api/models';
import { FilterOption, PagingOptions } from '@lib/api/types';

export const filters2QueryKey = <T, TFilter>(
  filters?: FilterOption<TFilter>[],
  orderOpts?: Partial<Pick<PagingOptions<T>, 'order' | 'orderBy'>>
) =>
  filters
    ? filters
        .map(item => `${item.key as string}.${item.type}=${item.value}`)
        .join('&')
    : '' +
      (orderOpts
        ? `${orderOpts.order ?? Order.DESC}_${
            (orderOpts.orderBy as string) ?? 'createdAt'
          }`
        : '');
