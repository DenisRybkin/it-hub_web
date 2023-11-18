import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils/tools/cn';
import { X } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-primary-500 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-primary-500 dark:focus:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80',
        secondary:
          'border-transparent bg-dark-2 text-slate-900 hover:bg-slate-100/80 dark:bg-dark-1 dark:text-slate-50 dark:hover:bg-primary-500/20',
        destructive:
          'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80',
        outline: 'text-slate-950 dark:text-slate-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export interface RemovingBadgeProps extends BadgeProps {
  onRemove?: () => void;
  textClassName?: string;
}

function RemovingBadge(props: RemovingBadgeProps) {
  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(1);
    event.stopPropagation();
    console.log(2);
    props.onRemove?.();
  };

  return (
    <Badge {...props}>
      <p className={props.textClassName}>{props.children}</p>
      <button
        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onKeyDown={e => e.key == 'Enter' && props.onRemove?.()}
        onMouseDown={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={handleRemove}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );
}

export { Badge, badgeVariants, RemovingBadge };
