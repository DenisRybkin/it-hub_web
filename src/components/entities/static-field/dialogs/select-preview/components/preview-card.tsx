import React from 'react';
import { StaticField } from '@lib/api/models';
import { cn } from '@lib/utils/tools';

interface IPreviewCardProps {
  staticField: StaticField;
  onClick: (id: StaticField) => void;
  isSelected: boolean;
}

export const PreviewCard = (props: IPreviewCardProps) => {
  const handleClick = () => props.onClick(props.staticField);

  return (
    <div onClick={handleClick} className="w-[32%]">
      <img
        src={props.staticField.url}
        className={cn(
          'h-full object-cover rounded-lg transition-all',
          props.isSelected && 'border-2 border-primary-500'
        )}
        alt="preview"
      />
    </div>
  );
};
