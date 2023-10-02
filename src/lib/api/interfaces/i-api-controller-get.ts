import {
  PagingModel,
  PagingOptions,
  FilterOption,
  Autocomplete,
} from '@/lib/api/types';
import { AxiosError } from 'axios';
import { BaseProcessedError } from '@lib/api/models';

export type getOptions<T, TFilter> = {
  paging?: PagingOptions<T>;
  filter?: FilterOption<TFilter>[];
};

export interface IApiControllerGet<T, TFilter> {
  getAll(
    opts?: getOptions<T, TFilter>,
    onSuccess?: (model: PagingModel<T>) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<PagingModel<T>>;
  getById(
    id: number,
    onSuccess?: (model: T) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<T>;
  autocomplete(
    opts?: getOptions<T, TFilter>,
    onSuccess?: (models: PagingModel<Autocomplete>) => void,
    onError?: (error: BaseProcessedError) => void,
    exclusive?: boolean
  ): Promise<PagingModel<Autocomplete>>;

  toString(): string;
}
