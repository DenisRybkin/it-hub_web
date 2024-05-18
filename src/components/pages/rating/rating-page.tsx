import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { CATEGORY_SEARCH_PARAMS } from '@components/entities/category/misc/category-card-list/category-card-list';
import { ParticipantСardList } from '@components/entities/rating/components/participant-сard-list';
import { toast } from '@components/ui/use-toast';
import { ReadRatingFilterDto } from '@lib/api/models/ReadRatingFilterDto';
import { UserAchievement } from '@lib/api/models/UserAchievement';
import { api } from '@lib/api/plugins';
import { useInfinityPaging } from '@lib/utils/hooks';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const RatingPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(Number(searchParams.get(CATEGORY_SEARCH_PARAMS)) ?? undefined);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { items, isFetching, info, loadNext, loadPage } = useInfinityPaging<
    UserAchievement,
    ReadRatingFilterDto
  >(
    api.rating,
    handleError,
    selectedCategoryId
      ? [{ key: 'categoryId', type: 'eq', value: selectedCategoryId }]
      : undefined
  );

  useLayoutEffect(() => {
    setSelectedCategoryId(
      Number(searchParams.get(CATEGORY_SEARCH_PARAMS)) ?? undefined
    );
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.rating')}</h1>
      <CategoryCardList withSearchParams />
      <ParticipantСardList
        items={items}
        loadNext={loadNext}
        isDone={info.isDone}
        isLoading={isFetching}
        refetchPage={loadPage}
      />
    </>
  );
};
