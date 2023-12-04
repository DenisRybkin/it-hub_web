import {
  ArticleView,
  ArticleViewSkeleton,
} from '@components/entities/article/misc/article-view';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { TestRunner } from '@components/entities/test/misc/test-runner/test-runner';
import { QuestionDto } from '@components/entities/test/misc/common/types';
import React, { useContext } from 'react';
import { AuthContext } from '@app/providers/auth';
import { CommentSubmit } from '@components/entities/comment/misc/comment-submit';
import type { SubmitCommentDto } from '@components/entities/comment/misc/comment-submit';
import { CommentCardList } from '@components/entities/comment/misc/comment-card-list';
import { useDeclension, useInfinityPaging } from '@lib/utils/hooks';
import {
  ArticleComment,
  ArticleCommentReaction,
  ReadArticleCommentFilterDto,
} from '@lib/api/models';

export const ArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidId = !Number.isNaN(Number(id));

  const errorHandler = (withRedirect?: boolean) => () => {
    toast({ title: t('toast:error.default'), variant: 'destructive' });
    withRedirect && navigate(-1);
  };

  const { data } = useQuery({
    queryKey: [api.article.toString(), id],
    queryFn: () =>
      api.article.getById(Number(id), undefined, errorHandler(true)),
    enabled: isValidId,
  });

  const { data: shortData, refetch } = useQuery({
    queryKey: [api.articleShort.toString(), id],
    queryFn: () => api.articleShort.getById(Number(id)),
    enabled: isValidId,
  });

  const commentsPaging = useInfinityPaging<
    ArticleComment,
    ReadArticleCommentFilterDto
  >(
    api.articleComment,
    errorHandler(false),
    [{ type: 'eq', key: 'articleId', value: Number(id) }],
    undefined,
    isValidId
  );

  const { mutate: mutateComment, isLoading: isCommentLoading } = useMutation({
    mutationFn: (dto: SubmitCommentDto) => {
      return api.articleComment.createComplex(
        { ...dto, articleId: +id! },
        commentsPaging.refetch,
        errorHandler(false)
      );
    },
  });

  return (
    <div className="flex flex-col gap-2 md:gap-5">
      {data && shortData ? (
        <>
          <h1 className="head-text text-left">
            {t('ui:title.article', { id })}
          </h1>
          <ArticleView
            article={data}
            refetch={refetch}
            articleShort={shortData}
            readonly
          />
        </>
      ) : (
        <ArticleViewSkeleton />
      )}
      {data?.test?.questions && (
        <>
          <h1 className="head-text text-left">{t('ui:title.testing')}</h1>
          <TestRunner
            articleId={data.id}
            questions={data.test?.questions as QuestionDto[]}
            isPassed={
              !authContext.isAuth ||
              data.test.usersWhoPassed?.some(
                item => item.userId == authContext.user?.id
              )
            }
          />
        </>
      )}
      <div className="flex flex-col gap-2 md:gap-5">
        <h1 className="head-text text-left">
          {commentsPaging.info.totalItems}&nbsp;
          {useDeclension(commentsPaging.items.length, [
            t('ui:title.comment'),
            t('ui:title.comment_0d'),
            t('ui:title.comment_1d'),
          ])}
        </h1>
        <CommentSubmit
          isLoading={isCommentLoading}
          onSubmit={
            (async dto => await mutateComment(dto)) as (
              dto: SubmitCommentDto
            ) => Promise<void>
          }
        />
        <CommentCardList<ArticleComment, ArticleCommentReaction>
          loadNext={commentsPaging.loadNext}
          isDone={commentsPaging.info.isDone}
          refetchPage={commentsPaging.loadPage}
          isLoading={commentsPaging.isFetching}
          items={commentsPaging.items}
          strategy="article-comment"
        />
      </div>
    </div>
  );
};
