import { Category } from '@lib/api/models';
import { cn } from '@lib/utils/tools';
import React from 'react';

interface ICategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  isSelected?: boolean;
}

export const CategoryCard = (props: ICategoryCardProps) => {
  const handleClick = () => props.onClick?.(props.category);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'cursor-pointer transition-all rounded-lg bg-dark-2 p-3 md:p-6 flex flex-col items-center justify-between gap-1 md:gap-2 border-2 border-dark-2 hover:border-primary-500 min-w-[150px]',
        props.isSelected && 'border-primary-500'
      )}
    >
      <img
        src={props.category.avatar?.staticField?.url}
        className="rounded-lg w-20 md:w-36"
        alt="category avatar"
      />
      <h3>{props.category.name}</h3>
      <p className="text-small-regular text-gray-1 truncate w-28">
        {props.category.description}
      </p>
    </div>
  );
};
