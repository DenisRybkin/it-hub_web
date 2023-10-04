import React, { useMemo } from 'react';
import { usePaging } from '@lib/utils/hooks/use-paging';
import { api } from '@lib/api/plugins';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area/horizontal-scroll-area';
import { CategoryItem } from '@components/modules/category/category-item';
import { Category } from '@lib/api/models';
import { useSearchParams } from 'react-router-dom';
import { searchParamToNumArray } from '@lib/utils/tools';

export const CATEGORIES_SEARCH_PARAMS = 'categories';

export interface ICategoriesListProps {
  selectedIds?: number[];
  onChangeSelects?: (value: number[]) => void;
  withSearchParams?: boolean;
}

export const CategoryList = (props: ICategoriesListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryPaging = usePaging(
    api.category,
    undefined,
    undefined,
    undefined,
    { pageSize: 20 }
  );

  const selectedIds = useMemo(
    () =>
      props.withSearchParams
        ? searchParamToNumArray(searchParams.get(CATEGORIES_SEARCH_PARAMS)) ??
          []
        : props.selectedIds ?? [],
    [props.withSearchParams, props.selectedIds, searchParams]
  );

  const handleClick = (category: Category) => {
    if (!props.onChangeSelects && !props.withSearchParams) return;

    const updatedCategoryIds = selectedIds.includes(category.id)
      ? selectedIds.filter(item => item != category.id)
      : [...selectedIds, category.id];
    if (props.onChangeSelects) props.onChangeSelects(updatedCategoryIds);
    if (props.withSearchParams) {
      !updatedCategoryIds.length
        ? searchParams.delete(CATEGORIES_SEARCH_PARAMS)
        : searchParams.set(
            CATEGORIES_SEARCH_PARAMS,
            updatedCategoryIds.toString()
          );
      setSearchParams(searchParams);
    }
  };

  if (!categoryPaging.isSuccess) return null;

  return (
    <HorizontalScrollArea
      className="mt-4"
      itemsLength={categoryPaging.items.length}
    >
      {categoryPaging.items.map(item => (
        <CategoryItem
          key={item.id}
          isSelected={selectedIds?.includes(item.id)}
          category={item}
          onClick={handleClick}
        />
        // <div key={item.id} className="h-12 min-w-[40px] bg-red" />
      ))}
    </HorizontalScrollArea>
  );
};
