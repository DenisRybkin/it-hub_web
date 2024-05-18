import { Button } from '@components/ui/button';
import { FormLabel } from '@components/ui/form';
import React from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface ICounterHookFormProps<F extends FieldValues>
  extends UseControllerProps<F> {
  min?: number;
  max?: number;
}

export const CounterHookForm = <F extends FieldValues>(
  props: ICounterHookFormProps<F>
) => {
  const { t } = useTranslation();
  const { field, fieldState } = useController<F>(props);

  const handleDecrement = () =>
    field.onChange(
      (field.value as number) <= (props.min ?? 0)
        ? field.value
        : (field.value as number) - 1
    );
  const handleIncrement = () => {
    console.log(
      (field.value as number) >= (props.max ?? Infinity)
        ? field.value
        : (field.value as number) + 1
    );
    field.onChange(
      (field.value as number) >= (props.max ?? Infinity)
        ? field.value
        : (field.value as number) + 1
    );
  };

  return (
    <div className="flex flex-col">
      <FormLabel>{t('ui:label.count_questions')}</FormLabel>
      <div className="flex gap-10 items-center justify-between">
        <Button
          size="icon-sm"
          variant="outline"
          type="button"
          onClick={handleDecrement}
          disabled={
            props.disabled || (field.value as number) <= (props.min ?? 0)
          }
        >
          <FiMinus />
        </Button>

        {fieldState.error?.message ? (
          <p className="text-red">{fieldState.error?.message}</p>
        ) : (
          <p className="text-[4.5rem] font-bold">{field.value as number}</p>
        )}
        <Button
          size="icon-sm"
          variant="outline"
          type="button"
          onClick={handleIncrement}
          disabled={
            props.disabled || (field.value as number) >= (props.max ?? Infinity)
          }
        >
          <FiPlus />
        </Button>
      </div>
    </div>
  );
};
