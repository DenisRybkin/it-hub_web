import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@lib/utils/tools/cn';
import { number2short } from '@lib/utils/tools';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface IAvatarGroupProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  avatars: { src?: string; fallback?: string }[];
  max?: number;
  onMore?: () => void;
}

const AvatarGroup = ({
  max = 4,
  avatars,
  onMore,
  ...props
}: IAvatarGroupProps) => {
  return (
    <div
      className={cn('flex -space-x-2', onMore && 'cursor-pointer')}
      onClick={avatars.length > max ? onMore : undefined}
    >
      {avatars.slice(0, max).map(avatar => (
        <Avatar
          {...props}
          className={cn(props.className, 'border border-gray-1')}
        >
          <AvatarImage src={avatar.src} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
      {avatars.length > max && (
        <span
          className={cn(
            onMore && 'cursor-pointer',
            'inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border border-gray-1 dark:bg-gray-600 dark:border-gray-1'
          )}
        >
          <span className="font-medium text-gray-500 leading-none dark:text-gray-400">
            +{number2short(avatars.length - max)}
          </span>
        </span>
      )}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
