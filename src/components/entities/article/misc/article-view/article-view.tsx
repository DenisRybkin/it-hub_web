import { Article, ArticleShortDto } from '@lib/api/models';
import { ArticleViewHead } from '@components/entities/article/misc/article-view/components/article-view-head';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { useMemo } from 'react';
import { OutputData } from '@editorjs/editorjs';
import { ArticleViewFooter } from '@components/entities/article/misc/article-view/components/article-view-footer';

interface ArticleView {
  readonly: boolean;
  article: Article;
  articleShort: ArticleShortDto;
  refetch: () => void;
}

export const ArticleView = (props: ArticleView) => {
  const body: OutputData = useMemo(
    () => JSON.parse(props.article.body),
    [props.article.id]
  );

  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-3 md:p-7">
      <div className="flex flex-col items-start mb-2">
        <ArticleViewHead
          author={props.article.createdByUser!}
          hashtags={props.article.hashtags?.map(item => item.hashtag!)}
          createdAt={props.article.createdAt as string}
          categories={props.article.categories?.map(item => item.category!)}
        />
      </div>
      <TextEditor defaultValue={body} value={body} readonly />
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
};
