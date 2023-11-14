import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Button } from '@components/ui/button';
import { PiCaretUpDown } from 'react-icons/pi';
import { cn } from '@lib/utils/tools';
import { Check } from 'lucide-react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';
import { CircularLoader } from '@components/ui/loader';
import { RemovingBadge } from '@components/ui/badge';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area/horizontal-scroll-area';
import { useControllableState } from '@lib/utils/hooks';

interface ComboboxContextValue {
  isSelected: (value: unknown) => boolean;
  onSelect: (value: unknown) => void;
}

export const ComboboxContext = createContext<ComboboxContextValue>({
  isSelected: () => false,
  onSelect: () => {},
});

interface ComboboxCommonProps<TValue> {
  children: React.ReactNode;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  inputPlaceholder?: string;
  search?: string;
  onSearchChange?: Dispatch<SetStateAction<string>>;
  emptyState?: string | ((input: string) => JSX.Element);
  isLoading?: boolean;
  getDisplayNameByValue: (value: TValue) => string;
}

type ComboboxFilterProps =
  | {
      shouldFilter?: true;
      filterFn?: React.ComponentProps<typeof Command>['filter'];
    }
  | {
      shouldFilter: false;
      filterFn?: never;
    };

type ComboboxValueProps<TValue> =
  | {
      multiple?: false;
      value?: TValue | null;
      defaultValue?: TValue | null;
      onValueChange?: Dispatch<SetStateAction<TValue | null>>;
    }
  | {
      multiple: true;
      value?: TValue[] | null;
      defaultValue?: TValue[] | null;
      onValueChange?: Dispatch<SetStateAction<TValue[] | null>>;
    };

export type ComboboxProps<TValue> = ComboboxCommonProps<TValue> &
  ComboboxValueProps<TValue> &
  ComboboxFilterProps;

export const Combobox = <TValue,>({
  children,
  placeholder = 'Select an option',
  value: valueProp,
  defaultValue,
  onValueChange,
  multiple = false,
  shouldFilter = true,
  filterFn,
  open: openProp,
  onOpenChange,
  inputPlaceholder = 'Search...',
  search: searchProp,
  onSearchChange: onSearchChangeProp,
  emptyState = 'Nothing found.',
  isLoading,
  getDisplayNameByValue,
}: ComboboxProps<TValue>) => {
  const [search, setSearch] = useControllableState<string>({
    defaultValue: '',
    value: searchProp,
    onChange: onSearchChangeProp,
  });
  const [open, setOpen] = useControllableState<boolean>({
    defaultValue: false,
    value: openProp,
    onChange: value => {
      if (!value) setSearch('');
      onOpenChange?.(value);
    },
  });

  const [value, setValue] = useControllableState<(TValue | TValue[]) | null>({
    defaultValue: defaultValue ?? null,
    value: valueProp,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: onValueChange,
  });

  const isSelected = (selectedValue: unknown) => {
    if (Array.isArray(value)) return value.includes(selectedValue as TValue);
    return value == selectedValue;
  };

  const handleSelect = (selectedValue: unknown) => {
    let newValue: TValue | TValue[] | null = selectedValue as TValue;

    if (multiple)
      if (Array.isArray(value))
        if (value.includes(newValue)) {
          const newArr = value.filter(val => val != selectedValue);
          newValue = newArr.length ? newArr : null;
        } else newValue = [...value, newValue];
      else newValue = [newValue];
    else if (value == selectedValue) newValue = null;

    setValue(newValue);
    if (!multiple) setOpen(false);
  };

  const renderValue = (): string | ReactNode => {
    if (!value || !Array.isArray(value)) return <p>{placeholder}</p>;
    if (Array.isArray(value))
      return (
        <div className="flex flex-wrap overflow-hidden rounded-md gap-1">
          {value.map(item => (
            <RemovingBadge
              variant="secondary"
              textClassName="truncate max-w-[200px]"
              key={item as unknown as number | string}
              onRemove={() => handleSelect(item)}
            >
              {getDisplayNameByValue(item)}
            </RemovingBadge>
          ))}
        </div>
      );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-full justify-between text-left font-normal',
            multiple && 'h-auto'
          )}
          variant="outline"
          data={{
            rightIcon: (
              <PiCaretUpDown className="-mr-1.5 h-5 w-5 text-tertiary-400" />
            ),
          }}
          role="combobox"
          aria-expanded={open}
        >
          {renderValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popover-trigger-width)] p-2"
        align="start"
      >
        <Command filter={filterFn} shouldFilter={shouldFilter}>
          <CommandInput
            placeholder={inputPlaceholder}
            autoFocus
            value={search}
            onValueChange={setSearch}
          />
          {
            <CommandList className="max-h-60 pt-2">
              <CommandEmpty>
                {isLoading ? (
                  <CircularLoader containerClassName="h-28" />
                ) : typeof emptyState == 'string' ? (
                  emptyState
                ) : (
                  emptyState(search ?? '')
                )}
              </CommandEmpty>
              <ComboboxContext.Provider
                value={{ isSelected, onSelect: handleSelect }}
              >
                {children}
              </ComboboxContext.Provider>
            </CommandList>
          }
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface ComboboxItemOptions<TValue> {
  value: TValue;
}

export interface ComboboxItemProps<TValue>
  extends ComboboxItemOptions<TValue>,
    Omit<
      React.ComponentProps<typeof CommandItem>,
      keyof ComboboxItemOptions<TValue> | 'onSelect' | 'role'
    > {
  onSelect?(value: TValue): void;
}

export const ComboboxItem = <TValue,>({
  children,
  className,
  value,
  onSelect,
}: ComboboxItemProps<TValue>) => {
  const context = useContext(ComboboxContext);
  const isSelected = context.isSelected(value);

  const handleSelect = () => {
    context.onSelect(value);
    onSelect?.(value);
  };

  return (
    <CommandItem
      className={cn(
        'pl-8 mt-2',
        isSelected &&
          'bg-primary-500 aria-selected:bg-primary-500 dark:aria-selected:bg-primary-500 dark:bg-primary-500',
        className
      )}
      role="option"
      onSelect={handleSelect}
    >
      {isSelected && <Check className="absolute left-2 h-4 w-4" />}
      {children}
    </CommandItem>
  );
};
