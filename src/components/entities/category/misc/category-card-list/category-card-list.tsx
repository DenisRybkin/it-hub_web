import {
  CategoryCard,
  CategoryCardSkeleton,
} from '@components/entities/category/misc/category-card';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area';
import { Category, UserAchievement } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { useInfinityPaging } from '@lib/utils/hooks';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const CATEGORY_SEARCH_PARAMS = 'categoryId';

export interface ICategoriesListProps {
  readonly?: boolean;
  selectedCategories?: Category[];
  onChangeSelectedCategories?: (value: Category[]) => void;
  withSearchParams?: boolean;
  userAchievements?: UserAchievement[];
}

export const CategoryCardList = (props: ICategoriesListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, isFetching, isSuccess } = useInfinityPaging(
    api.category,
    undefined,
    undefined,
    { pageSize: -1 }
  );

  const selected: Category | undefined = useMemo(
    () =>
      props.withSearchParams
        ? Number.isNaN(Number(searchParams.get(CATEGORY_SEARCH_PARAMS)))
          ? undefined
          : items.find(
              item =>
                item.id == Number(searchParams.get(CATEGORY_SEARCH_PARAMS))
            )
        : undefined,
    [props.withSearchParams, props.selectedCategories, searchParams]
  );

  const handleClick = (category: Category) => {
    if (!props.onChangeSelectedCategories && !props.withSearchParams) return;

    if (props.onChangeSelectedCategories) {
      const updatedCategories = props.selectedCategories?.some(
        item => category.id == item.id
      )
        ? props.selectedCategories?.filter(item => item.id != category.id)
        : [...(props.selectedCategories ?? []), category];
      props.onChangeSelectedCategories(updatedCategories);
    }
    if (props.withSearchParams) {
      const updatedCategory =
        selected?.id == category.id ? undefined : category;
      !updatedCategory
        ? searchParams.delete(CATEGORY_SEARCH_PARAMS)
        : searchParams.set(
            CATEGORY_SEARCH_PARAMS,
            updatedCategory.id.toString()
          );
      setSearchParams(searchParams);
    }
  };

  if (!isFetching && !isSuccess) return null;

  return (
    <HorizontalScrollArea
      containerClassName="mt-4"
      listClassName="gap-2"
      itemsLength={
        ((props.readonly ? props.selectedCategories : items) ?? []).length
      }
    >
      {isFetching
        ? Array(10)
            .fill(null)
            .map((_, index) => <CategoryCardSkeleton key={index} />)
        : ((props.readonly ? props.selectedCategories : items) ?? []).map(
            item => (
              <CategoryCard
                key={item.id}
                isSelected={
                  selected?.id
                    ? selected.id == item.id
                    : props.selectedCategories?.some(
                        category => item.id == category.id
                      )
                }
                userAchievement={props.userAchievements?.find(
                  achievement => achievement.categoryId == item.id
                )}
                category={item}
                onClick={handleClick}
              />
            )
          )}
    </HorizontalScrollArea>
  );
};
