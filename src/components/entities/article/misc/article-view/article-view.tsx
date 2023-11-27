import { Article } from '@lib/api/models';
import { ArticleViewHead } from '@components/entities/article/misc/article-view/components/article-view-head';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { useMemo } from 'react';
import { OutputData } from '@editorjs/editorjs';

interface ArticleView {
  readonly: boolean;
  article: Article;
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
    </article>
  );
};
