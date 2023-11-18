export type PagingInfo = {
  isDone: boolean;
  totalItems?: number;
  totalPages?: number;
};

export interface IUsePaging<T> {
  info: PagingInfo;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  items: T[];
  loadNext: () => void;
  loadPage: (page: number) => void;
  remove: () => void;
  refetch: () => void;
}
