export const sliceIfLong = (text: string, maxLength: number = 20) =>
  text.length > maxLength ? text.slice(0, maxLength) : text;
