import { getOptions, IApiControllerRead } from '@lib/api/interfaces';
import { PagingModel } from '@lib/api/types';
import { BaseProcessedError } from '@lib/api/models';

export const fetchItems = async <T, TFilter>(
  controller: IApiControllerRead<T, TFilter>,
  onSuccess?: (pagingModel: PagingModel<T>) => void,
  onError?: (error: BaseProcessedError) => void,
  params?: getOptions<T, TFilter>
) => await controller.getAll(params, onSuccess, onError);
