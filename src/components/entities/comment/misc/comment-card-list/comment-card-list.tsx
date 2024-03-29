import { ReactionController } from '@components/entities/comment/misc/comment-card/components/reaction-picker/types';
import { VisibleTrigger } from '@components/shared/visible-trigger';
import { ArticleComment, ArticleCommentReaction } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { getLastDate } from '@lib/utils/tools/date';
import React from 'react';

import { CommentCard, CommentCardSkeleton } from '../comment-card';
import { BaseReactionsStrategy } from '../comment-card/components/reaction-picker/strategies/base-reaction-strategy';

type Strategy = 'article-comment';

interface ICommentCardListProps<T extends ArticleComment, R> {
  isLoading?: boolean;
  items?: T[];
  loadNext: () => void;
  isDone: boolean;
  refetchPage: (commentId: number) => void;
  strategy: Strategy;
}

//TODO: ADD EXTERNAL EXTENDS T
export const CommentCardList = <
  T extends ArticleComment,
  R extends ArticleCommentReaction
>(
  props: ICommentCardListProps<T, R>
) => {
  const getReactionStrategy = (commentId: number): BaseReactionsStrategy<R> => {
    switch (props.strategy) {
      case 'article-comment':
        return new BaseReactionsStrategy<R>(
          commentId,
          api.articleComment as ReactionController<R>,
          reaction => reaction.value,
          reaction => reaction.user?.nickname ?? '',
          reaction => reaction.userId
        );
    }
  };

  return (
    <section className="mt-2 flex flex-col gap-2 md:gap-5">
      {props.items == null && props.isLoading
        ? Array(10)
            .fill(null)
            .map((_, index) => <CommentCardSkeleton key={index} />)
        : (props.items ?? []).map(item => (
            <CommentCard<R>
              key={item.id}
              id={item.id}
              author={item.createdByUser!}
              text={item.text}
              reactionStrategy={getReactionStrategy(item.id)}
              reactions={(item.reactions ?? []) as R[]}
              refetchByCommentId={props.refetchPage}
              attachments={item.attachments?.map(item => item.staticField!)}
              createdAt={getLastDate(
                new Date(item.createdAt),
                new Date(item.updatedAt)
              )}
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
