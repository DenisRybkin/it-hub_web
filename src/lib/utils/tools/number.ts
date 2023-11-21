enum Suffix {
  K = 'K',
  M = 'M',
  B = 'B',
  T = 'T',
  e = 'e',
}

const STEP_0 = 100;
const STEP_1 = 1000;

const getFixedNumber = (int: number, decimal: number, suffix: string) => {
  if (suffix == Suffix.K) {
    if (int == 1) return Math.min(decimal, 2);
    if (int == 2) return Math.min(decimal, 1);
    return 0;
  } else if (Object.values(Suffix).includes(suffix as Suffix))
    return Math.min(decimal, 2);
  return 2;
};

const smallNumberShorter = (value: number, fixed?: number): string => {
  if (value < STEP_1 && value >= STEP_0)
    return fixed && !Number.isInteger(+value)
      ? Number(value).toFixed(0).toString()
      : Number(value).toString();
  else {
    if (!Number.isInteger(+value)) {
      const [int] = value.toString().split('.');
      return Number(value).toFixed(3 - int.length);
    } else {
      return value.toFixed(3 - value.toString().length);
    }
  }
};

export const number2short = (value: number, fixed?: number): string => {
  if (value < STEP_1)
    return Number(smallNumberShorter(value, fixed)).toLocaleString();
  const schema = ['', ...Object.values(Suffix)];
  const index = Math.floor(Math.log10(value) / 3);
  const suffix = schema[index] == null ? Suffix.e + index * 3 : schema[index];
  const basis = value / Math.pow(10, 3 * index);
  if (Number.isInteger(basis)) return basis + suffix;
  else {
    const [int, decimal] = basis.toString().split('.');
    return (
      Number(
        basis.toFixed(
          getFixedNumber(int.length, decimal.length, suffix) ?? fixed ?? 2
        )
      )
        .toLocaleString()
        .replace(',', '.') + suffix
    );
  }
};
