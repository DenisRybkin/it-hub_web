import { ApiControllerRead } from '@lib/api/bases/api-controller-read';
import { BaseProcessedError } from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';

import { IApiControllerCrud } from '@/lib/api/interfaces';
import { LockerModel } from '@/lib/api/types';

export abstract class ApiControllerCRUD<
    T extends Object,
    TFilter extends Object,
    TCreate extends Object,
    TUpdate extends Object,
    TUpdatePartially extends Object
  >
  extends ApiControllerRead<T, TFilter, TCreate, TUpdate, TUpdatePartially>
  implements IApiControllerCrud<T, TFilter, TCreate, TUpdate, TUpdatePartially>
{
  protected constructor(
    client: AxiosInstance,
    locker: LockerModel,
    controllerName: string
  ) {
    super(client, locker, controllerName);
  }

  async create(
    model: TCreate,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T> {
    return await this.process<T>(
      this.post('', { data: model }),
      onSuccess,
      onError,
      exclusive
    );
  }

  async delete(
    id: number,
    onSuccess?: (result: boolean) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<boolean> {
    return await this.process<boolean>(
      this.remove<boolean>(id.toString()),
      onSuccess,
      onError,
      exclusive
    );
  }

  async update(
    id: number,
    model: TUpdate,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T> {
    return await this.process(
      this.put<T>(id.toString(), { data: model }),
      onSuccess,
      onError,
      exclusive
    );
  }

  async updatePartially(
    id: number,
    model: TUpdatePartially,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T> {
    return await this.process(
      this.patch<T>(id.toString(), { data: model }),
      onSuccess,
      onError,
      exclusive
    );
  }
}
