import React from 'react';
import { Article } from '@lib/api/models';
import { ArticleCard } from '@components/entities/article/misc/article-card';
import { VisibleTrigger } from '@components/shared/visible-trigger';

interface IArticleListProps {
  isLoading?: boolean;
  items?: Article[];
  loadNext: () => void;
  isDone: boolean;
}

export const ArticleList = (props: IArticleListProps) => {
  return (
    <section className="mt-9 flex flex-col gap-5 md:gap-10">
      {props.items?.map(item => (
        <ArticleCard
          key={item.id}
          author={item.createdByUser!}
          body={item.body}
          hashtags={item.hashtags?.map(item => item.hashtag!)}
        />
      ))}
      <VisibleTrigger
        onVisible={props.loadNext}
        hidden={props.isDone}
        disabled={props.isLoading}
      />
    </section>
  );
};
