import { cn } from '@lib/utils/tools/cn';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
  'cursor-pointer border-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm  file:text-blue file:border-0 file:bg-transparent file:text-sm file:font-medium file:!text-primary-500 file:overflow-ellipsis placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-dark-1 dark:placeholder:text-slate-400 ',
  {
    variants: {
      variant: {
        default:
          'ring-offset-white focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:outline-none dark:ring-offset-slate-950 dark:focus-visible:ring-primary-500',
        ghost: 'dark:focus-visible:ring-0 shadow-none ring-offset-0',
      },
      size: {
        default: 'px-3 py-2',
        sm: 'py-1 px-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, leftIcon, ...props }, ref) => {
    const input = (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );

    return leftIcon && variant && variant != 'default' ? (
      <div className="flex items-center gap-1">
        {leftIcon}
        {input}
      </div>
    ) : (
      input
    );
  }
);
Input.displayName = 'Input';

// eslint-disable-next-line react-refresh/only-export-components
export { Input, inputVariants };
