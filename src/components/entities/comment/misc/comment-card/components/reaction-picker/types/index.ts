import { BaseProcessedError } from '@lib/api/models';

export type Reaction = { value: string };

export interface ReactionController<T> {
  toggleReaction: (
    commentId: number,
    model: Reaction,
    onSuccess?: (model: T | number) => void,
    onError?: (error: BaseProcessedError) => void
  ) => Promise<T | number>;
}

export interface IReactionChip {
  emoji: string;
  usersCount: number;
  nicknames: string[];
  isAuthReacted: boolean;
}
