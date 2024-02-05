import { QueryNamingConvention } from './';

export type FilterOption<T> = {
  type: QueryNamingConvention;
  key: keyof T;
  value: number | string | boolean | number[] | string[];
  associatedModel?: string;
};
