import { Button } from '@components/ui/button';
import { StaticField } from '@lib/api/models';
import { cn } from '@lib/utils/tools';
import React from 'react';
import { FiX } from 'react-icons/fi';

type PreviewCardPropsBase = {
  staticField: StaticField;
  onClick?: (id: StaticField) => void;
  isSelected?: boolean;
  className?: string;
};

type PreviewCardPropsWithDeleting = {
  deleting: true;
  onDelete: (staticField: StaticField) => void;
};

type PreviewCardProps =
  | PreviewCardPropsBase
  | (PreviewCardPropsBase & PreviewCardPropsWithDeleting);

export const ImageCard = (props: PreviewCardProps) => {
  const handleClick = () => props.onClick?.(props.staticField);
  const handleDelete = () =>
    'deleting' in props && props.onDelete(props.staticField);

  return (
    <div
      onClick={handleClick}
      className={cn('w-[32%] relative', props.className)}
    >
      <img
        src={props.staticField.url}
        className={cn(
          'h-full object-cover rounded-lg transition-all',
          props.isSelected && 'border-2 border-primary-500'
        )}
        alt="preview"
      />
      {'deleting' in props && (
        <Button
          className="absolute -top-0 -right-0 z-10"
          variant="ghost"
          size="icon-sm"
          onClick={handleDelete}
        >
          <FiX className="text-red" size={25} color="red" />
        </Button>
      )}
    </div>
  );
};
