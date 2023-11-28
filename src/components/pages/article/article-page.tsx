import {
  ArticleView,
  ArticleViewSkeleton,
} from '@components/entities/article/misc/article-view';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { TestRunner } from '@components/entities/test/misc/test-runner/test-runner';
import { QuestionDto } from '@components/entities/test/misc/common/types';
import { useContext } from 'react';
import { AuthContext } from '@app/providers/auth';

export const ArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidId = !Number.isNaN(Number(id));

  const handleError = () => {
    toast({ title: t('toast:error.default'), variant: 'destructive' });
    navigate(-1);
  };

  const { data } = useQuery({
    queryKey: [api.article.toString(), id],
    queryFn: () => api.article.getById(Number(id), undefined, handleError),
    enabled: isValidId,
  });

  const { data: shortData, refetch } = useQuery({
    queryKey: [api.articleShort.toString(), id],
    queryFn: () => api.articleShort.getById(Number(id)),
    enabled: isValidId,
  });

  return (
    <div className="flex flex-col gap-2">
      {data && shortData ? (
        <ArticleView
          article={data}
          refetch={refetch}
          articleShort={shortData}
          readonly
        />
      ) : (
        <ArticleViewSkeleton />
      )}
      {data?.test?.questions && (
        <TestRunner
          articleId={data.id}
          questions={data.test?.questions as QuestionDto[]}
          inPassed={
            !authContext.isAuth ||
            data.test.usersWhoPassed?.some(
              item => item.userId == authContext.user?.id
            )
          }
        />
      )}
    </div>
  );
};
