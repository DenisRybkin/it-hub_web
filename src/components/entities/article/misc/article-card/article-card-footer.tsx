import React from 'react';
import { Button } from '@components/ui/button';
import {
  FiChevronDown,
  FiChevronUp,
  FiCornerUpLeft,
  FiHeart,
  FiMessageSquare,
} from 'react-icons/fi';
import { cn } from '@lib/utils/tools';
import { useDeviceDetermine } from '@lib/utils/hooks';

interface IArticleCardFooterProps {
  previewModeIsMax?: boolean;
  onIncreasePreviewMode?: () => void;
  onDecreasePreviewMode?: () => void;
}

export const ArticleCardFooter = (props: IArticleCardFooterProps) => {
  const [deviceSize] = useDeviceDetermine();
  const isLiked = true;

  return (
    <div className="flex gap-3 mt-2 w-full justify-around md:justify-start">
      <Button variant="ghost" size="icon">
        <FiHeart
          className={cn(isLiked && 'stroke-red fill-red')}
          size={deviceSize == 'sm' ? 20 : 22}
        />
      </Button>
      <Button variant="ghost" size="icon">
        <FiMessageSquare stroke="#5C5C7B" size={deviceSize == 'sm' ? 20 : 22} />
      </Button>
      {deviceSize == 'sm' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={
            props.previewModeIsMax
              ? props.onDecreasePreviewMode
              : props.onIncreasePreviewMode
          }
        >
          {props.previewModeIsMax ? (
            <FiChevronUp stroke="#5C5C7B" size={deviceSize == 'sm' ? 20 : 22} />
          ) : (
            <FiChevronDown stroke="#5C5C7B" size={24} />
          )}
        </Button>
      )}
      <Button variant="ghost" size="icon">
        <FiCornerUpLeft stroke="#5C5C7B" size={deviceSize == 'sm' ? 20 : 22} />
      </Button>
    </div>
  );
};
