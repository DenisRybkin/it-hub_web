import { ArticleView } from '@components/entities/article/misc/article-view';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { TestRunner } from '@components/entities/test/misc/test-runner/test-runner';
import { QuestionDto } from '@components/entities/test/misc/common/types';

export const ArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleError = () => {
    toast({ title: t('toast:error.default'), variant: 'destructive' });
    navigate(-1);
  };

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [api.article.toString(), id],
    queryFn: () => api.article.getById(Number(id), undefined, handleError),
    enabled: !Number.isNaN(Number(id)),
  });

  return (
    <>
      {data && (
        <div className="flex flex-col gap-2">
          <ArticleView article={data} readonly />
          {data.test?.questions && (
            <TestRunner questions={data.test?.questions as QuestionDto[]} />
          )}
        </div>
      )}
    </>
  );
};
