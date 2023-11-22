import type { IApiControllerRead } from '@lib/api/interfaces';
import { BaseProcessedError } from '@lib/api/models';
import { FilterOption, PagingModel, PagingOptions } from '@lib/api/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { filters2QueryKey } from '@lib/utils/tools';
import { QueryFunctionContext } from '@tanstack/query-core';
import type { IUsePaging, PagingInfo } from '@lib/utils/hooks/paging/common';
import { fetchItems } from '@lib/utils/hooks/paging/common';

export const useInfinityPaging = <T extends { id: number }, TFilter>(
  controller: IApiControllerRead<T, TFilter>,
  onError?: (error: BaseProcessedError) => void,
  filterOptions?: FilterOption<TFilter>[],
  pagingOptions?: Partial<PagingOptions<T>>,
  enabled: boolean = true
): IUsePaging<T> => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  if (!pagingOptions) pagingOptions = { pageSize: 10 };
  const queryFilterKey = filters2QueryKey(filterOptions);

  const getNextPageParam = (lastPage: PagingModel<T>) => {
    const isDone = lastPage.items.length < (pagingOptions?.pageSize ?? 10);
    return isDone ? undefined : lastPage.pagingOptions.page + 1;
  };
  const queryFn = (params: QueryFunctionContext<string[], number>) =>
    fetchItems(controller, undefined, handleError, {
      paging: { ...pagingOptions, page: params.pageParam ?? 1 },
      filter: filterOptions,
    });

  const {
    isError,
    isFetching,
    isLoading,
    isFetchingNextPage,
    isRefetching,
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

  const loadNext = () => fetchNextPage();
  const loadPage = (updatedItemId: number) =>
    refetch<PagingModel<T>>({
      refetchPage: (page, index) =>
        page.items.some(item => item.id == updatedItemId),
    });

  const getInfo = (): Required<PagingInfo> => {
    const lastLoadedData = data?.pages.at(-1);
    return {
      isDone: (lastLoadedData?.items.length ?? 0) < pagingOptions!.pageSize!,
      totalPages: lastLoadedData?.totalPages ?? 0,
      totalItems: lastLoadedData?.totalItems ?? 0,
    };
  };

  return {
    info: getInfo(),
    isLoading,
    isFetching: isFetching || isFetchingNextPage || isRefetching,
    isError,
    isSuccess,
    items: (data?.pages ?? []).flatMap(item => item.items),
    remove,
    loadPage,
    loadNext,
    refetch,
  };
};
