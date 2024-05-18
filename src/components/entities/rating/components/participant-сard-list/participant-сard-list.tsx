import {
  ArticleCard,
  ArticleCardSkeleton,
} from '@components/entities/article/misc/article-card';
import { ParticipantCard } from '@components/entities/rating/components/participant-сard/participant-card';
import { EmptyContent } from '@components/shared/empty-content';
import { VisibleTrigger } from '@components/shared/visible-trigger';
import { UserAchievement } from '@lib/api/models';
import React from 'react';

interface IProps {
  isLoading?: boolean;
  items?: UserAchievement[];
  loadNext: () => void;
  isDone: boolean;
  refetchPage: (id: number) => void;
}

export const ParticipantСardList = (props: IProps) => {
  return (
    <section className="mt-9 flex flex-col gap-5 md:gap-10">
      {props.isLoading && !props.items?.length ? (
        Array(10)
          .fill(null)
          .map((_, index) => <ArticleCardSkeleton key={index + 'skeleton'} />)
      ) : !props.items?.length ? (
        <EmptyContent />
      ) : (
        props.items.map((item, index) => (
          <ParticipantCard
            key={
              item.id.toString() +
              item.userId.toString() +
              item.categoryId.toString() +
              index.toString()
            }
            participant={item}
            rank={index + 1}
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
