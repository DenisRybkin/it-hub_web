import { Button } from '@components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@lib/utils/tools';

interface IHorizontalScrollAreaProps {
  children: React.ReactNode;
  gap?: number;
  itemsLength?: number;
  className?: string;
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
      element.scrollWidth! - (element.clientWidth! + element.scrollLeft) <= 15
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
  const scrollToRight = () => {
    handleScrollTo('right');
  };

  useEffect(() => {
    scrollWrapperRef?.current &&
      scrollWrapperRef?.current.addEventListener('scroll', scrollHandler);
    return () => {
      scrollWrapperRef?.current?.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollWrapperRef?.current]);

  useEffect(() => {
    setLeftScrollIsDisabled(handleCheckOffsetLeft());
    const hasScroll = checkElementHasScroll();
    setRightScrollIsDisabled(!hasScroll);
  }, [props.itemsLength]);

  return (
    <div className={cn('w-full relative', props.className)}>
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
          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
          variant="ghost"
          size="icon"
          onClick={scrollToRight}
        >
          <FiChevronRight size={24} />
        </Button>
      )}
      <div
        ref={scrollWrapperRef}
        className={`custom-scrollbar max-w-[340px] md:max-w-none flex justify-start overflow-auto gap-${
          props.gap ?? 2
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};
