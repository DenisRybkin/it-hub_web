import {
  getOptions,
  IApiControllerRead,
} from '@lib/api/interfaces/i-api-controller-read';
import { BaseProcessedError } from '@lib/api/models';
import { AxiosInstance } from 'axios';

import { ApiControllerBase } from '@/lib/api/bases/api-controller-base';
import { Autocomplete, LockerModel, PagingModel } from '@/lib/api/types';

export abstract class ApiControllerRead<
    T,
    TFilter,
    TCreate = null,
    TUpdate = null,
    TUpdatePartially = null
  >
  extends ApiControllerBase<TCreate, TUpdate, TUpdatePartially>
  implements IApiControllerRead<T, TFilter>
{
  protected constructor(
    client: AxiosInstance,
    locker: LockerModel,
    controllerName: string
  ) {
    super(client, locker, controllerName);
  }

  public async getById(
    id: number,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T> {
    return await this.process<T>(
      this.get(id.toString()),
      onSuccess,
      onError,
      exclusive
    );
  }

  public async getAll(
    opts?: getOptions<T, TFilter>,
    onSuccess?: (models: PagingModel<T>) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<PagingModel<T>> {
    return await this.process<PagingModel<T>>(
      this.get('', { params: this.transformParamsOptions(opts) }),
      onSuccess,
      onError,
      exclusive
    );
  }

  async autocomplete(
    opts?: getOptions<T, TFilter>,
    onSuccess?: (models: PagingModel<Autocomplete>) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<PagingModel<Autocomplete>> {
    return await this.process<PagingModel<Autocomplete>>(
      this.get('autocomplete', { params: this.transformParamsOptions(opts) }),
      onSuccess,
      onError,
      exclusive
    );
  }

  private transformParamsOptions(opts?: getOptions<T, TFilter>) {
    return (opts?.filter ?? []).reduce(
      (acc, item) =>
        Object.assign(acc, {
          [`${item.key as string}.${item.type}${
            item.associatedModel ? `.${item.associatedModel}` : ''
          }`]: item.value,
        }),
      opts?.paging ?? {}
    );
  }
}
