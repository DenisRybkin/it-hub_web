import { BaseProcessedError } from '@lib/api/models';
import { PagingModel } from '@lib/api/types';

import {
  getOptions,
  IApiControllerRead,
} from '../../../../../../../maks-soft/zarechny-admin_web/src/lib/api/interfaces';

export const fetchItems = async <T, TFilter>(
  controller: IApiControllerRead<T, TFilter>,
  onSuccess?: (pagingModel: PagingModel<T>) => void,
  onError?: (error: BaseProcessedError) => void,
  params?: getOptions<T, TFilter>
) => await controller.getAll(params, onSuccess, onError);
