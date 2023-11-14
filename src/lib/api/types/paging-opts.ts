export type PagingOptions<T> = {
  page: number;
  pageSize: number;
  order: 'asc' | 'desc';
  orderBy: keyof T;
};
