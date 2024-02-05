import { ArticleCardList } from '@components/entities/article/misc/article-card-list';
import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { CATEGORY_SEARCH_PARAMS } from '@components/entities/category/misc/category-card-list/category-card-list';
import { toast } from '@components/ui/use-toast';
import { ArticleShortDto, ReadArticleFilterDto } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { useInfinityPaging } from '@lib/utils/hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const HomePage = () => {
  const { t } = useTranslation();

  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [searchParams] = useSearchParams();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { items, isFetching, info, loadNext, loadPage } = useInfinityPaging<
    ArticleShortDto,
    ReadArticleFilterDto
  >(
    api.articleShort,
    handleError,
    selectedCategoryId
      ? [
          {
            associatedModel: 'categories',
            key: 'categoryId',
            type: 'eq',
            value: selectedCategoryId,
          },
        ]
      : undefined,
    undefined
  );

  useEffect(() => {
    setSelectedCategoryId(
      Number(searchParams.get(CATEGORY_SEARCH_PARAMS)) ?? undefined
    );
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <CategoryCardList withSearchParams />
      <ArticleCardList
        items={items}
        loadNext={loadNext}
        isDone={info.isDone}
        isLoading={isFetching}
        refetchPage={loadPage}
      />
    </>
  );
};
