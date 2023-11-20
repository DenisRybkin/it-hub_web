import { useEffect, useMemo } from 'react';
import { api } from '@lib/api/plugins';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area/horizontal-scroll-area';
import { CategoryItem } from '@components/entities/category/category-list/category-item';
import { Category } from '@lib/api/models';
import { useSearchParams } from 'react-router-dom';
import { searchParamToNumArray } from '@lib/utils/tools';
import { useInfinityPaging } from '@lib/utils/hooks';
import { CategoryItemSkeleton } from '@components/entities/category/category-list/category-item-skeleton';

export const CATEGORIES_SEARCH_PARAMS = 'categories';

export interface ICategoriesListProps {
  selectedIds?: number[];
  onChangeSelects?: (value: number[]) => void;
  withSearchParams?: boolean;
}

export const CategoryList = (props: ICategoriesListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, isFetching, isSuccess } = useInfinityPaging(
    api.category,
    undefined,
    undefined,
    { pageSize: -1 }
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

  if (!isFetching && !isSuccess) return null;

  return (
    <HorizontalScrollArea
      containerClassName="mt-4"
      listClassName="gap-2"
      itemsLength={items.length}
    >
      {isFetching
        ? Array(10)
            .fill(null)
            .map((_, index) => <CategoryItemSkeleton key={index} />)
        : items.map(item => (
            <CategoryItem
              key={item.id}
              isSelected={selectedIds?.includes(item.id)}
              category={item}
              onClick={handleClick}
            />
          ))}
    </HorizontalScrollArea>
  );
};
