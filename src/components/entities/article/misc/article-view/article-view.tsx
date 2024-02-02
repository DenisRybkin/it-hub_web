import { ArticleViewFooter } from '@components/entities/article/misc/article-view/components/article-view-footer';
import { ArticleViewHead } from '@components/entities/article/misc/article-view/components/article-view-head';
import {
  ITextEditorForwardRef,
  TextEditor,
} from '@components/entities/article/misc/text-editor';
import type { UpdateDto } from '@components/pages/article';
import { OutputData } from '@editorjs/editorjs';
import { Article, ArticleShortDto, Category, Hashtag } from '@lib/api/models';
import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react';

interface IArticleViewProps {
  readonly: boolean;
  article: Article;
  articleShort: ArticleShortDto;
  refetch: () => void;
  onChangeHashtags: (value?: Hashtag[]) => void;
  onChangeSelectedCategories: (value: Category[]) => void;
  updateDto?: UpdateDto;
}

export interface IArticleViewForwardRef {
  getBody: () => Promise<OutputData | undefined>;
}

export const ArticleView = forwardRef<
  IArticleViewForwardRef,
  IArticleViewProps
>((props, ref) => {
  const editorRef = useRef<ITextEditorForwardRef>();

  const body: OutputData = useMemo(
    () => JSON.parse(props.article.body),
    [props.article.id, props.readonly]
  );

  useImperativeHandle(ref, () => ({ getBody: editorRef.current!.getData! }));

  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-3 md:p-7">
      <div className="flex flex-col items-start mb-2">
        <ArticleViewHead
          readonly={props.readonly}
          author={props.article.createdByUser!}
          hashtags={props.article.hashtags?.map(item => item.hashtag!)}
          createdAt={props.article.createdAt as string}
          categories={props.article.categories?.map(item => item.category!)}
          onChangeHashtags={props.onChangeHashtags}
          onChangeSelectedCategories={props.onChangeSelectedCategories}
          updateDto={props.updateDto}
        />
      </div>
      <TextEditor
        defaultValue={body}
        value={body}
        readonly={props.readonly}
        ref={editorRef as Ref<ITextEditorForwardRef>}
      />
      <ArticleViewFooter
        articleId={props.article.id}
        isLiked={props.articleShort.isLiked}
        isReposted={props.articleShort.isReposted}
        likesCount={props.articleShort.likesCount}
        repostsCount={props.articleShort.repostsCount}
        onActionSuccess={props.refetch}
      />
    </article>
  );
});
