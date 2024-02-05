import {
  ArticleCard,
  ArticleCardSkeleton,
} from '@components/entities/article/misc/article-card';
import { EmptyContent } from '@components/shared/empty-content';
import { VisibleTrigger } from '@components/shared/visible-trigger';
import { ArticleShortDto } from '@lib/api/models';
import React from 'react';

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
      {props.isLoading ? (
        Array(10)
          .fill(null)
          .map((_, index) => <ArticleCardSkeleton key={index} />)
      ) : !props.items?.length ? (
        <EmptyContent />
      ) : (
        props.items.map(item => (
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
            categories={item.categories}
          />
        ))
      )}
      <VisibleTrigger
        onVisible={props.loadNext}
        hidden={props.isDone}
        disabled={props.isLoading}
      />
    </section>
  );
};
