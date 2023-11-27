import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@app/providers/auth';
import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES_SEARCH_PARAMS } from '@components/entities/category/misc/category-card-list/category-card-list';
import { searchParamToNumArray } from '@lib/utils/tools';
import { ArticleCardList } from '@components/entities/article/misc/article-card-list';
import { useInfinityPaging } from '@lib/utils/hooks';
import { ArticleShortDto, ReadArticleFilterDto } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';

export const HomePage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchParams] = useSearchParams();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { items, isFetching, info, loadNext, loadPage } = useInfinityPaging<
    ArticleShortDto,
    ReadArticleFilterDto
  >(api.articleShort, handleError, undefined, undefined);

  useEffect(() => {
    setSelectedCategoryIds(
      searchParamToNumArray(searchParams.get(CATEGORIES_SEARCH_PARAMS)) ?? []
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
