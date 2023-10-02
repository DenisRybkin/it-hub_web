import React from 'react';
import { usePaging } from '@lib/utils/hooks/use-paging';
import { api } from '@lib/api/plugins';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area/horizontal-scroll-area';
import { CategoryItem } from '@components/modules/category/category-item';
import { Category } from '@lib/api/models';

export interface ICategoriesListProps {
  selectedIds: number[];
  onChangeSelects: (value: number[]) => void;
}

export const CategoryList = (props: ICategoriesListProps) => {
  const categoryPaging = usePaging(
    api.category,
    undefined,
    undefined,
    undefined,
    { pageSize: 20 }
  );

  if (!categoryPaging.isSuccess) return null;

  const handleClick = (category: Category) => {
    props.selectedIds.includes(category.id)
      ? props.onChangeSelects(
          props.selectedIds.filter(item => item != category.id)
        )
      : props.onChangeSelects([...props.selectedIds, category.id]);
  };

  return (
    <HorizontalScrollArea
      className="mt-4"
      itemsLength={categoryPaging.items.length}
    >
      {categoryPaging.items.map(item => (
        <CategoryItem
          key={item.id}
          isSelected={props.selectedIds.includes(item.id)}
          category={item}
          onClick={handleClick}
        />
        // <div key={item.id} className="h-12 min-w-[40px] bg-red" />
      ))}
    </HorizontalScrollArea>
  );
};
