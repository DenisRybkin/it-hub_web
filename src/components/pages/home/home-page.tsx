import { ArticleCardList } from '@components/entities/article/misc/article-card-list';
import { CATEGORY_SEARCH_PARAMS } from '@components/entities/category/misc/category-card-list/category-card-list';
import { ControlsPanel } from '@components/pages/home/misc/controls-panel';
import { toast } from '@components/ui/use-toast';
import { ArticleShortDto, Order, ReadArticleFilterDto } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import type { FilterOption } from '@lib/api/types';
import { useDebounce, useInfinityPaging } from '@lib/utils/hooks';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const HomePage = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(Number(searchParams.get(CATEGORY_SEARCH_PARAMS)) ?? undefined);
  const [sort, setSort] = useState<Order>(Order.DESC);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const searchDebounce = useDebounce<string | undefined>(search, 500);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const filterOpts = useMemo(() => {
    const result: FilterOption<ReadArticleFilterDto>[] = [];
    if (selectedCategoryId)
      result.push({
        associatedModel: 'categories',
        key: 'categoryId',
        type: 'eq',
        value: selectedCategoryId,
      });
    if (searchDebounce != null)
      result.push({
        key: 'body',
        type: 'like',
        value: searchDebounce,
      });
    return result.length > 0 ? result : undefined;
  }, [selectedCategoryId, searchDebounce]);

  const { items, isFetching, info, loadNext, loadPage } = useInfinityPaging<
    ArticleShortDto,
    ReadArticleFilterDto
  >(api.articleShort, handleError, filterOpts, {
    order: sort,
  });

  useLayoutEffect(() => {
    setSelectedCategoryId(
      Number(searchParams.get(CATEGORY_SEARCH_PARAMS)) ?? undefined
    );
  }, [searchParams]);

  return (
    <>
      <h1 className="head-text text-left">{t('ui:title.home')}</h1>
      <ControlsPanel
        sortByDate={sort}
        onChangeSortByDate={setSort}
        search={search}
        onChangeSearch={setSearch}
      />
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
