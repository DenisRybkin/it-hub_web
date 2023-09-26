import * as React from 'react';

import { cn } from '@lib/utils/tools/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'cursor-pointer border-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:text-blue file:border-0 file:bg-transparent file:text-sm file:font-medium file:!text-primary-500 file:overflow-ellipsis placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-dark-1 dark:outline-none dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-primary-500',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
