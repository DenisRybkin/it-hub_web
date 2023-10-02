import React, { useContext, useState } from 'react';
import { ArticleCard } from '@components/modules/article-card';
import { useTranslation } from 'react-i18next';
import { LocaleStorageKeys } from '@lib/constants';
import { AuthContext } from '@app/providers/auth';
import { CategoryList } from '@components/modules/category';

export const HomePage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <CategoryList
        selectedIds={selectedCategoryIds}
        onChangeSelects={setSelectedCategoryIds}
      />
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
