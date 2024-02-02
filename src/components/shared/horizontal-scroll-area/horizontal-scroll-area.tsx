import { Button } from '@components/ui/button';
import { cn } from '@lib/utils/tools';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface IHorizontalScrollAreaProps {
  children: React.ReactNode;
  itemsLength?: number;
  containerClassName?: string;
  listClassName?: string;
  hiddeNavigate?: boolean;
}

export const HorizontalScrollArea = (props: IHorizontalScrollAreaProps) => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const [leftScrollIsDisabled, setLeftScrollIsDisabled] =
    useState<boolean>(false);
  const [rightScrollIsDisabled, setRightScrollIsDisabled] =
    useState<boolean>(false);

  const checkElementHasScroll = (): boolean => {
    const element = scrollWrapperRef?.current;
    if (!element) return false;
    return element.clientWidth < element.scrollWidth;
  };

  const handleCheckOffsetLeft = () =>
    scrollWrapperRef?.current?.scrollLeft == 0;

  const handleCheckOffsetRight = () => {
    const element = scrollWrapperRef?.current;
    if (!element) return false;
    return (
      element.scrollWidth! - (element.clientWidth! + element.scrollLeft) <=
        15 || !checkElementHasScroll()
    );
  };

  const scrollHandler = () => {
    setLeftScrollIsDisabled(handleCheckOffsetLeft());
    setRightScrollIsDisabled(handleCheckOffsetRight());
  };

  const handleScrollTo = (direction: 'left' | 'right') => {
    const element = scrollWrapperRef?.current;
    if (element == null) return;
    const elWidth = element?.clientWidth;
    element?.scrollBy({
      left: direction === 'left' ? -elWidth : elWidth,
      behavior: 'smooth',
    });
  };

  const scrollToLeft = () => handleScrollTo('left');
  const scrollToRight = () => handleScrollTo('right');

  useEffect(() => {
    scrollHandler();
    scrollWrapperRef.current &&
      scrollWrapperRef.current.addEventListener('scroll', scrollHandler);
    return () => {
      scrollWrapperRef.current &&
        scrollWrapperRef.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollWrapperRef?.current, props.itemsLength]);

  return (
    <div className={cn('w-full relative', props.containerClassName)}>
      {!props.hiddeNavigate && (
        <>
          {!leftScrollIsDisabled && (
            <Button
              className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"
              variant="ghost"
              size="icon"
              onClick={scrollToLeft}
            >
              <FiChevronLeft size={24} />
            </Button>
          )}
          {!rightScrollIsDisabled && (
            <Button
              className={cn(
                'absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2',
                rightScrollIsDisabled && 'hidden'
              )}
              variant="ghost"
              size="icon"
              onClick={scrollToRight}
            >
              <FiChevronRight size={24} />
            </Button>
          )}
        </>
      )}
      <div
        ref={scrollWrapperRef}
        className={cn(
          'custom-scrollbar md:max-w-none flex justify-start overflow-auto',
          props.listClassName
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
