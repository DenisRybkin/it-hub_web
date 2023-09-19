import { QueryNamingConvention } from './index';

export type FilterOption<T> = {
  type: QueryNamingConvention;
  key: keyof T;
  value: number | string | boolean;
};
