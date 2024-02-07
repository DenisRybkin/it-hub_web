import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useControllableState } from '@lib/utils/hooks';
import { Dispatch, SetStateAction } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface ICounterProps {
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
  defaultValue?: number;
  max?: number;
  min?: number;
  inputClassName?: string;
}

export const Counter = (props: ICounterProps) => {
  const [value, setValue] = useControllableState<number>({
    value: props.value,
    defaultValue: props.defaultValue ?? 0,
    onChange: props.onChange,
  });

  const handleIncrement = () =>
    setValue(prev => (prev >= (props.max ?? Infinity) ? prev : prev + 1));
  const handleDecrement = () =>
    setValue(prev => (prev <= (props.min ?? 0) ? prev : prev - 1));

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (Number.isNaN(+event.target.value)) return;
  //   const newValue = +event.target.value;
  //   setValue(prev =>
  //     prev >= (props.max ?? Infinity) || prev <= (props.min ?? 0)
  //       ? prev
  //       : newValue
  //   );
  // };

  return (
    <div className="flex gap-10 items-center">
      <Button
        size="icon-sm"
        variant="outline"
        onClick={handleDecrement}
        disabled={props.disabled || value <= (props.min ?? 0)}
      >
        <FiMinus />
      </Button>

      <p className="text-[4.5rem] font-bold">{value}</p>
      <Button
        size="icon-sm"
        variant="outline"
        onClick={handleIncrement}
        disabled={props.disabled || value >= (props.max ?? Infinity)}
      >
        <FiPlus />
      </Button>
    </div>
  );
};
