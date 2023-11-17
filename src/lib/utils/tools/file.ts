export const bytes2mb = (size: number): number =>
  Number(((size ?? 0) / (1024 * 1024)).toFixed(2));
