import { cn } from '@lib/utils/tools/cn';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import * as React from 'react';

const Tabs = Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      'overflow-hidden flex h-12 items-center justify-center rounded-lg bg-slate-100 p-1.5 text-slate-500 dark:bg-dark-2 dark:text-slate-400',
      className
    )}
    {...props}
  />
));
TabsList.displayName = List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 px-0 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-primary-500 dark:focus-visible:ring-primary-500/70 dark:data-[state=active]:bg-primary-500 dark:data-[state=active]:text-slate-50 dark:[&>img]:brightness-300',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
