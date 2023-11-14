import React, { LegacyRef, useEffect, useRef } from 'react';
import { useViewportObserver } from '@lib/utils/hooks';
import { cn } from '@lib/utils/tools';
import { LinearLoader } from '@components/ui/loader';

export interface IVisibleTriggerProps {
  options?: IntersectionObserverInit;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  onClick?: () => void;
  onVisible: () => void;
}

export const VisibleTrigger = (props: IVisibleTriggerProps) => {
  const triggerRef = useRef<Element | undefined>();
  const { isVisible } = useViewportObserver(triggerRef, props.options);

  useEffect(() => {
    isVisible && !props.disabled && props.onVisible();
  }, [isVisible, props.disabled]);

  return (
    <div
      className={cn('w-full ', props.hidden && 'hidden', props.className)}
      ref={triggerRef as LegacyRef<HTMLDivElement>}
    >
      <LinearLoader onClick={props.onClick} />
    </div>
  );
};
