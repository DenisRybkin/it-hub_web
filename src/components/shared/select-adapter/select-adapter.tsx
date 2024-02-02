import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import React from 'react';

export interface ISelectItem<T> {
  id: number;
  value: T;
  label: string;
}

interface ISelectAdapterProps<T extends string>
  extends Omit<SelectProps, 'onValueChange'> {
  onValueChange: (value: T) => void;
  items: ISelectItem<T>[];
  label?: string;
  placeholder?: string;
  triggerClassName?: string;
}

export const SelectAdapter = <T extends string>({
  items,
  placeholder,
  triggerClassName,
  label,
  ...rest
}: ISelectAdapterProps<T>) => {
  return (
    <Select {...rest}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items?.map(item => (
            <SelectItem key={item.id} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
