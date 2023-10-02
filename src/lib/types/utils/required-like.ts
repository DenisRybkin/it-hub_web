export type RequiredLike<T, K extends keyof T> = Omit<T, K> &
  Record<K, Partial<T[K]>>;
