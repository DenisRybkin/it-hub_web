import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { SymbolIcon } from '@radix-ui/react-icons';
import { cn } from '@lib/utils/tools/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-slate-50 hover:bg-primary-500/90 dark:bg-primary-500 dark:text-slate-50 dark:hover:bg-primary-500/90',
        default:
          'bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-dark-3 dark:text-slate-50 dark:hover:bg-dark-4',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-dark-2 hover:text-primary-500 dark:hover:bg-primary-500/10 dark:hover:text-slate-50',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
      },
      size: {
        default: 'h-10 px-3 py-2 md:px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  data?: {
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    if (props?.data?.isLoading) props.disabled = true;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <>
          {props?.data?.isLoading && (
            <SymbolIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {props?.data?.leftIcon && !props?.data?.isLoading && (
            <div className="mr-2">{props.data.leftIcon}</div>
          )}
          {props.children}
          {props?.data?.rightIcon && !props?.data?.isLoading && (
            <div className="ml-2">{props.data.rightIcon}</div>
          )}
        </>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
