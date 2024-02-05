import { AvatarGroup } from '@components/ui/avatar';
import { Category } from '@lib/api/models';
import React from 'react';

interface ICategoryChipProps {
  categories: Category[];
}

export const CategoriesChip = (props: ICategoryChipProps) => {
  return (
    <div className="items-center justify-between gap-1 md:gap-2 border-2 border-dark-2">
      <AvatarGroup
        className="w-8 h-8 border-none"
        avatars={props.categories.map(item => ({
          src: item.avatar?.staticField?.url,
          fallback: item.name,
          tooltip: <p>{item.name}</p>,
        }))}
      />
    </div>
  );
};
