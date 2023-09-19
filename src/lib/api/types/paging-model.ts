import type { PagingOptions } from './index';

export type PagingModel<T> = {
  pagingOptions: PagingOptions<T>;
  totalItems: number;
  totalPages: number;
  items: T[];
};
