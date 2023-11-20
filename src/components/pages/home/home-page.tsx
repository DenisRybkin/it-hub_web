import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@app/providers/auth';
import { CategoryList } from '@components/entities/category/category-list';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES_SEARCH_PARAMS } from '@components/entities/category/category-list/category-list';
import { searchParamToNumArray } from '@lib/utils/tools';
import { ArticleList } from '@components/entities/article/misc/article-list';
import { useInfinityPaging } from '@lib/utils/hooks';
import { Article, ReadArticleFilterDto } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';

export const HomePage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchParams] = useSearchParams();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { items, isFetching, info, loadNext } = useInfinityPaging<
    Article,
    ReadArticleFilterDto
  >(api.article, handleError, undefined, undefined);

  useEffect(() => {
    setSelectedCategoryIds(
      searchParamToNumArray(searchParams.get(CATEGORIES_SEARCH_PARAMS)) ?? []
    );
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <CategoryList withSearchParams />
      <ArticleList
        items={items}
        loadNext={loadNext}
        isDone={info.isDone}
        isLoading={isFetching}
      />
    </>
  );
};
