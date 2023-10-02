import type { getOptions, IApiControllerGet } from '@lib/api/interfaces';
import { BaseProcessedError } from '@lib/api/models';
import { FilterOption, PagingModel, PagingOptions } from '@lib/api/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { filters2QueryKey } from '@lib/utils/tools';

type PagingInfo = {
  isDone: boolean;
  totalItems?: number;
};

interface IUsePaging<T> {
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

const fetchItems = async <T, TFilter>(
  controller: IApiControllerGet<T, TFilter>,
  onSuccess?: (pagingModel: PagingModel<T>) => void,
  onError?: (error: BaseProcessedError) => void,
  params?: getOptions<T, TFilter>
) => await controller.getAll(params, onSuccess, onError);

export const usePaging = <T, TFilter>(
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

  const { isError, isFetching, isLoading, isSuccess, data, remove, refetch } =
    useQuery({
      queryKey: [controller.toString(), page, filters2QueryKey(filterOptions)],
      queryFn: async () =>
        await fetchItems(controller, handleSuccess, handleError, {
          paging: { ...pagingOptions, page },
          filter: filterOptions,
        }),
      select: data => data.items,
      keepPreviousData: true,
      enabled,
    });

  const handleError = () =>
    toast({
      variant: 'destructive',
      title: t('toast:error.default'),
    });

  const handleSuccess = (pagingModel: PagingModel<T>) =>
    setInfo({
      totalItems: pagingModel.totalItems,
      isDone: pagingModel.items.length < (pagingOptions?.pageSize ?? 10),
    });

  const loadNext = () => setPage(prev => prev + 1);
  const loadPage = (page: number) => setPage(page);

  return {
    info,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    items: data ?? [],
    remove,
    loadPage,
    loadNext,
    refetch,
  };
};
