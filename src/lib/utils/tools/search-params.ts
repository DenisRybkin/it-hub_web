export const searchParamToNumArray = (param?: string | null): number[] | null =>
  param ? param.split(',').map(Number) : null;
