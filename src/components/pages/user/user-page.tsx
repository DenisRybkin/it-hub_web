import { AuthContext } from '@app/providers/auth';
import { ArticleCardList } from '@components/entities/article/misc/article-card-list';
import { FileUploader } from '@components/entities/static-field/misc/file-uploader';
import {
  UserView,
  UserViewSkeleton,
} from '@components/entities/user/misc/user-view';
import { EmptyContent } from '@components/shared/empty-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import { QueryKeys } from '@lib/constants';
import { useInfinityPaging } from '@lib/utils/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

type TabKeyType = 'articles' | 'reposts';

export const UserPage = () => {
  const { id: param } = useParams<'id'>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [tabKey, setTabKey] = useState<TabKeyType>('articles');

  const userId = Number(param);
  const isInvalidId = Number.isNaN(userId);

  const handleRedirectBack = () => navigate(-1);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const userInfo = useQuery({
    queryKey: [api.user.toString(), QueryKeys.USER_INFO, userId],
    queryFn: () => api.user.getInfo(userId, undefined, handleError),
    enabled: !isInvalidId,
  });

  const userReposts = useInfinityPaging(
    api.articleShort,
    handleError,
    [
      {
        key: 'userId',
        associatedModel: 'reposts',
        type: 'eq',
        value: userId,
      },
    ],
    undefined,
    !isInvalidId && tabKey == 'reposts'
  );

  const userArticles = useInfinityPaging(
    api.articleShort,
    handleError,
    [{ key: 'createdByUserId', type: 'eq', value: userId }],
    undefined,
    !isInvalidId && tabKey == 'articles'
  );

  useLayoutEffect(() => {
    if (isInvalidId) handleRedirectBack();
  }, [isInvalidId]);

  if (userInfo.isError) return <EmptyContent />;

  return (
    <>
      {userInfo.isLoading ? (
        <UserViewSkeleton />
      ) : (
        <UserView
          info={userInfo.data}
          countArticles={userArticles.items.length}
        />
      )}
      <Tabs
        value={tabKey}
        onValueChange={key => setTabKey(key as TabKeyType)}
        className="w-full mt-5"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">{t('ui:tab.articles')}</TabsTrigger>
          <TabsTrigger value="reposts">{t('ui:tab.reposts')}</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticleCardList
            loadNext={userArticles.loadNext}
            isDone={userArticles.info.isDone}
            refetchPage={userArticles.loadPage}
            isLoading={userArticles.isLoading}
            items={userArticles.items}
          />
        </TabsContent>
        <TabsContent value="reposts">
          <ArticleCardList
            loadNext={userReposts.loadNext}
            isDone={userReposts.info.isDone}
            refetchPage={userReposts.loadPage}
            isLoading={userReposts.isLoading}
            items={userReposts.items}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};
