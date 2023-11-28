import React from 'react';
import { ArticleShortDto } from '@lib/api/models';
import {
  ArticleCard,
  ArticleCardSkeleton,
} from '@components/entities/article/misc/article-card';
import { VisibleTrigger } from '@components/shared/visible-trigger';

interface IArticleCardListProps {
  isLoading?: boolean;
  items?: ArticleShortDto[];
  loadNext: () => void;
  isDone: boolean;
  refetchPage: (articleId: number) => void;
}

export const ArticleCardList = (props: IArticleCardListProps) => {
  return (
    <section className="mt-9 flex flex-col gap-5 md:gap-10">
      {props.items == null || props.isLoading
        ? Array(10)
            .fill(null)
            .map((_, index) => <ArticleCardSkeleton key={index} />)
        : props.items?.map(item => (
            <ArticleCard
              key={item.id}
              id={item.id}
              author={item.createdByUser!}
              body={item.body}
              likesCount={item.likesCount}
              repostsCount={item.repostsCount}
              commentsCount={item.commentsCount}
              isReposted={item.isReposted}
              isCommented={item.isCommented}
              isLiked={item.isLiked}
              hashtags={item.hashtags?.map(item => item.hashtag!)}
              onActionSuccess={props.refetchPage}
              createdAt={item.createdAt}
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
