import { AxiosError } from 'axios';
import { BaseProcessedError } from '@lib/api/models';
import { IApiControllerGet } from '@lib/api/interfaces/i-api-controller-get';

export interface IApiControllerCrud<
  T,
  TFilter,
  TCreate,
  TUpdate,
  TUpdatePartially
> extends IApiControllerGet<T, TFilter> {
  create(
    model: TCreate,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T>;
  update(
    id: number,
    model: TUpdate,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T>;
  updatePartially(
    id: number,
    model: TUpdatePartially,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T>;
  delete(
    id: number,
    onSuccess?: (result: boolean) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<boolean>;
}
