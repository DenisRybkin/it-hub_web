import type { IApiControllerGet } from '@lib/api/interfaces';
import { BaseProcessedError } from '@lib/api/models';
import { FilterOption, PagingModel, PagingOptions } from '@lib/api/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { filters2QueryKey } from '@lib/utils/tools';
import { QueryFunctionContext } from '@tanstack/query-core/src/types';
import type { IUsePaging, PagingInfo } from '@lib/utils/hooks/paging/common';
import { fetchItems } from '@lib/utils/hooks/paging/common';

export const useScrollPaging = <T, TFilter>(
  controller: IApiControllerGet<T, TFilter>,
  onSuccess?: (model: PagingModel<T>) => void,
  onError?: (error: BaseProcessedError) => void,
  filterOptions?: FilterOption<TFilter>[],
  pagingOptions?: Partial<PagingOptions<T>>,
  enabled: boolean = true
): IUsePaging<T> => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState<PagingInfo>({
    totalItems: 0,
    isDone: false,
  });

  if (!pagingOptions) pagingOptions = { pageSize: 10 };
  const queryFilterKey = filters2QueryKey(filterOptions);

  const getNextPageParam = (lastPage: PagingModel<T>) => {
    const isDone = lastPage.items.length < (pagingOptions?.pageSize ?? 10);
    return isDone ? undefined : lastPage.pagingOptions.page + 1;
  };
  const queryFn = (params: QueryFunctionContext<string[], number>) =>
    fetchItems(controller, handleSuccess, handleError, {
      paging: { ...pagingOptions, page: params.pageParam ?? 1 },
      filter: filterOptions,
    });

  const {
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    remove,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [controller.toString(), page.toString(), queryFilterKey],
    queryFn,
    getNextPageParam,
    keepPreviousData: true,
    refetchOnReconnect: true,
    enabled,
  });

  const handleError = (error: BaseProcessedError) => {
    toast({
      variant: 'destructive',
      title: t('toast:error.default'),
    });
    onError?.(error);
  };

  const handleSuccess = (pagingModel: PagingModel<T>) =>
    setInfo({
      totalItems: pagingModel.totalItems,
      isDone: pagingModel.items.length < (pagingOptions?.pageSize ?? 10),
    });

  const loadNext = () => fetchNextPage();
  const loadPage = (page: number) => setPage(page);

  return {
    info,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    items: (data?.pages ?? []).flatMap(item => item.items),
    remove,
    loadPage,
    loadNext,
    refetch,
  };
};
