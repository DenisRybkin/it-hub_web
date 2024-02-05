export enum QueryNamingConventionConstants {
  Equal = 'eq', // for strings & number // example ?name.eq=John
  NotEqual = 'ne', // for strings & numbers // example ?name.ne=John
  Like = 'like', // for strings // example ?name.like=John
  NotLike = 'nlike', // for strings // example?name.nLike=John
  GreaterThan = 'gt', // for numbers // example?age.gt=18
  GreaterThanOrEqual = 'gte', // for numbers // example?age.gte=18
  LessThan = 'lt', // for numbers // example?age.lt=40
  LessThanOrEqual = 'lte', // for numbers // example?age.lte=40
}

export type QueryNamingConvention =
  | 'eq'
  | 'ne'
  | 'like'
  | 'nlike'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'or';
