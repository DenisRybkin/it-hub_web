import React, { useContext, useEffect, useState } from 'react';
import { ArticleCard } from '@components/entities/article/misc/article-card';
import { useTranslation } from 'react-i18next';
import { LocaleStorageKeys } from '@lib/constants';
import { AuthContext } from '@app/providers/auth';
import { CategoryList } from '@components/shared/category';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES_SEARCH_PARAMS } from '@components/shared/category/category-list';
import { searchParamToNumArray } from '@lib/utils/tools';

export const HomePage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSelectedCategoryIds(
      searchParamToNumArray(searchParams.get(CATEGORIES_SEARCH_PARAMS)) ?? []
    );
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <CategoryList withSearchParams />
      <section className="mt-9 flex flex-col gap-5 md:gap-10">
        {authContext.user && (
          <>
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT + '2')}
            />
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT + '2')}
            />
            <ArticleCard
              author={authContext.user}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
          </>
        )}
      </section>
    </>
  );
};
