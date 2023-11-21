import { cn } from '@lib/utils/tools/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-100 dark:bg-primary-500/20',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
