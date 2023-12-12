import {
  Dispatch,
  Ref,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IArticleViewForwardRef } from '@components/entities/article/misc/article-view';
import {
  ArticleView,
  ArticleViewSkeleton,
} from '@components/entities/article/misc/article-view';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { TestRunner } from '@components/entities/test/misc/test-runner/test-runner';
import { QuestionDto } from '@components/entities/test/misc/common/types';
import { AuthContext } from '@app/providers/auth';
import type { SubmitCommentDto } from '@components/entities/comment/misc/comment-submit';
import { CommentSubmit } from '@components/entities/comment/misc/comment-submit';
import { CommentCardList } from '@components/entities/comment/misc/comment-card-list';
import { useDeclension, useInfinityPaging } from '@lib/utils/hooks';
import {
  Article,
  ArticleComment,
  ArticleCommentReaction,
  ArticleTestUser,
  Category,
  Hashtag,
  ReadArticleCommentFilterDto,
  ReadArticleTestUserFilterDto,
  StaticField,
} from '@lib/api/models';
import { SelectPreviewDialog } from '@components/entities/static-field/dialogs/select-preview';
import { ITestConstructorForwardRef } from '@components/entities/test/misc/test-constructor/test-constructor';
import { ArticleControlBar } from '@components/entities/article/misc/article-control-bar';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';

export type UpdateDto = {
  body: string;
  categories?: Category[];
  preview?: StaticField;
  hashtags?: Hashtag[];
};

const article2UpdateDto = (model: Article): UpdateDto => ({
  body: model.body,
  preview: model.preview?.staticField,
  categories: model.categories?.map(item => item.category!),
  hashtags: model.hashtags?.map(item => item.hashtag!),
});

export const ArticlePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidId = !Number.isNaN(Number(id));

  const articleViewRef = useRef<IArticleViewForwardRef>();
  const testConstructorRef = useRef<ITestConstructorForwardRef>();

  const [updateDto, setUpdateDto] = useState<UpdateDto | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpenSelectPreviewDialog, setIsOpenSelectPreviewDialog] =
    useState<boolean>(false);

  const handleOnEditMode = () => setIsEditMode(true);
  const handleOffEditMode = () => setIsEditMode(false);
  const handleOpenSelectPreviewDialog = () =>
    setIsOpenSelectPreviewDialog(true);

  const errorHandler = (withRedirect?: boolean) => () => {
    toast({ title: t('toast:error.default'), variant: 'destructive' });
    withRedirect && navigate(-1);
  };

  const handleUpdate = async () =>
    updateDto &&
    mutateArticle({
      ...updateDto,
      body: JSON.stringify(await articleViewRef.current?.getBody()),
    });

  const resetPreview = () =>
    setUpdateDto(prev => (prev ? { ...prev, preview: undefined } : undefined));

  const handleChangePreview = (preview?: StaticField) =>
    setUpdateDto(prev =>
      prev ? { ...prev, preview: preview } : { body: data?.body ?? '', preview }
    );
  const handleChangeHashtags = (hashtags?: Hashtag[]) =>
    setUpdateDto(prev =>
      prev
        ? { ...prev, hashtags: hashtags ?? [] }
        : { body: data?.body ?? '', hashtags }
    );
  const handleChangeCategories = (categories: Category[]) =>
    setUpdateDto(prev =>
      prev ? { ...prev, categories } : { body: data?.body ?? '', categories }
    );

  const { data, refetch: refetchData } = useQuery({
    queryKey: [api.article.toString(), id],
    queryFn: () =>
      api.article.getById(
        Number(id),
        model => setUpdateDto(article2UpdateDto(model)),
        errorHandler(true)
      ),
    enabled: isValidId,
  });

  const { data: shortData, refetch: refetchShortData } = useQuery({
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

  const { mutate: mutateDeleteArticle, isLoading: isDeleting } = useMutation({
    mutationKey: [api.articleShort.toString()],
    mutationFn: () =>
      api.article.delete(Number(id), () =>
        navigate(RoutePaths[RouteKeys.HOME])
      ),
  });

  const { isLoading: isUpdating, mutate: mutateArticle } = useMutation({
    mutationKey: [api.article.toString(), id],
    mutationFn: (dto: UpdateDto) =>
      api.article.updateComplex(
        Number(id),
        {
          body: dto.body,
          hashtagIds: dto.hashtags?.map(item => item.id),
          categoryIds: dto.categories?.map(item => item.id) ?? [],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          previewId: dto.preview?.id ?? null,
        },
        () => void setIsEditMode(false) || refetchData(),
        errorHandler(false)
      ),
  });

  const { mutate: mutateComment, isLoading: isCommentLoading } = useMutation({
    mutationFn: (dto: SubmitCommentDto) =>
      api.articleComment.createComplex(
        { ...dto, articleId: +id! },
        commentsPaging.refetch,
        errorHandler(false)
      ),
  });

  return (
    <>
      {isEditMode && (
        <SelectPreviewDialog
          onChangePreview={
            handleChangePreview as Dispatch<
              SetStateAction<StaticField | undefined>
            >
          }
          preview={data?.preview?.staticField}
          isOpen={isOpenSelectPreviewDialog}
          onOpenChange={setIsOpenSelectPreviewDialog}
        />
      )}
      <div className="flex flex-col gap-2 md:gap-5">
        {data && shortData ? (
          <>
            <ArticleControlBar
              data={data}
              isUpdating={isUpdating}
              isEditMode={isEditMode}
              updateDto={updateDto}
              onOffEditMode={handleOffEditMode}
              onOpenSelectPreviewDialog={handleOpenSelectPreviewDialog}
              onResetPreview={resetPreview}
              onTurnOnEditMode={handleOnEditMode}
              onUpdate={handleUpdate}
              onDeleteArticle={mutateDeleteArticle}
              isDeleting={isDeleting}
            />
            <ArticleView
              article={data}
              ref={articleViewRef as Ref<IArticleViewForwardRef>}
              refetch={refetchShortData}
              articleShort={shortData}
              readonly={!isEditMode}
              updateDto={updateDto}
              onChangeHashtags={handleChangeHashtags}
              onChangeSelectedCategories={handleChangeCategories}
            />
          </>
        ) : (
          <ArticleViewSkeleton />
        )}
        {data?.test?.questions && (
          <>
            <h1 className="head-text text-left">{t('ui:title.testing')}</h1>
            <TestRunner<ArticleTestUser, ReadArticleTestUserFilterDto>
              articleId={data.id}
              questions={data.test?.questions as QuestionDto[]}
              usersWhoPassed={data.test.usersWhoPassed?.map(item => item.user!)}
              controllerFilter={[
                { key: 'testId', type: 'eq', value: data.test.id },
              ]}
              model2user={testUser => testUser.user!}
              usersWhoPassedController={api.articleTestUser}
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
    </>
  );
};
