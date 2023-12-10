import { useMemo } from 'react';
import { api } from '@lib/api/plugins';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area';
import { CategoryCard } from '@components/entities/category/misc/category-card';
import { Category } from '@lib/api/models';
import { useSearchParams } from 'react-router-dom';
import { searchParamToNumArray } from '@lib/utils/tools';
import { useInfinityPaging } from '@lib/utils/hooks';
import { CategoryCardSkeleton } from '@components/entities/category/misc/category-card';

export const CATEGORIES_SEARCH_PARAMS = 'categories';

export interface ICategoriesListProps {
  readonly?: boolean;
  selectedCategories?: Category[];
  onChangeSelectedCategories?: (value: Category[]) => void;
  withSearchParams?: boolean;
}

export const CategoryCardList = (props: ICategoriesListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, isFetching, isSuccess } = useInfinityPaging(
    api.category,
    undefined,
    undefined,
    { pageSize: -1 }
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const selected: Category[] = useMemo(
    () =>
      props.withSearchParams
        ? searchParamToNumArray(searchParams.get(CATEGORIES_SEARCH_PARAMS))
            ?.map(selectedId => items.find(item => item.id == selectedId))
            .filter(Boolean) ?? []
        : props.selectedCategories ?? [],
    [props.withSearchParams, props.selectedCategories, searchParams]
  );

  const handleClick = (category: Category) => {
    if (!props.onChangeSelectedCategories && !props.withSearchParams) return;
    const updatedCategories = selected.some(item => item.id == category.id)
      ? selected.filter(item => item.id != category.id)
      : [...selected, category];

    if (props.onChangeSelectedCategories)
      props.onChangeSelectedCategories(updatedCategories);
    if (props.withSearchParams) {
      !updatedCategories.length
        ? searchParams.delete(CATEGORIES_SEARCH_PARAMS)
        : searchParams.set(
            CATEGORIES_SEARCH_PARAMS,
            updatedCategories.map(item => item.id).toString()
          );
      setSearchParams(searchParams);
    }
  };

  if (!isFetching && !isSuccess) return null;

  return (
    <HorizontalScrollArea
      containerClassName="mt-4"
      listClassName="gap-2"
      itemsLength={(props.readonly ? selected : items).length}
    >
      {isFetching
        ? Array(10)
            .fill(null)
            .map((_, index) => <CategoryCardSkeleton key={index} />)
        : (props.readonly ? selected : items).map(item => (
            <CategoryCard
              key={item.id}
              isSelected={selected.some(selected => selected.id == item.id)}
              category={item}
              onClick={handleClick}
            />
          ))}
    </HorizontalScrollArea>
  );
};
