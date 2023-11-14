import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@lib/utils/tools';

const loaderVariant = cva(
  'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-500 motion-reduce:animate-[spin_1.5s_linear_infinite]',
  {
    variants: {
      size: {
        md: 'h-10 w-10',
        sm: 'h-8 w-8',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface CircularLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string | undefined;
  containerClassName?: string;
  onClick?: () => void;
}

export const CircularLoader = (props: CircularLoaderProps) => {
  return (
    <div
      className={cn(
        'flex w-full h-full items-center justify-center',
        props.containerClassName
      )}
      onClick={props.onClick}
    >
      <div
        className={cn(
          loaderVariant({ size: props.size, className: props.className })
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

interface LinearLoaderProps {
  onClick?: () => void;
}

export const LinearLoader = (props: LinearLoaderProps) => {
  return (
    <div
      onClick={props.onClick}
      className="linear-loader relative overflow-hidden w-full h-1 flex bg-primary-500/30 dark:bg-primary-500/30"
    >
      <div className="bar absolute inset-0 w-full bg-primary-500 dark:bg-primary-500"></div>
      <div className="bar absolute inset-0 w-full bg-primary-500 dark:bg-primary-500"></div>
    </div>
  );
};
