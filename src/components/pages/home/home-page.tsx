import React from 'react';
import { ArticleCard } from '@components/modules/article-card';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { useTranslation } from 'react-i18next';
import { LocaleStorageKeys } from '@lib/constants';

export const HomePage = observer(() => {
  const { t } = useTranslation();
  const authStore = useRootStore('authStore');

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <section className="mt-9 flex flex-col gap-5 md:gap-10">
        {authStore.getUser && (
          <>
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT + '2')}
            />
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT + '2')}
            />
            <ArticleCard
              author={authStore.getUser}
              title="Заголовок"
              body={localStorage.getItem(LocaleStorageKeys.DRAFT)}
            />
          </>
        )}
      </section>
    </>
  );
});
