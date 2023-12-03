import { ReactionController, IReactionChip } from '../types';
import { BaseProcessedError } from '@lib/api/models';
import { GeneralEmojisKeys } from '../constants/general-emojis';

const initialReactionChips: IReactionChip[] = [
  {
    emoji: GeneralEmojisKeys.fire,
    usersCount: 0,
    isAuthReacted: false,
    nicknames: [],
  },
  {
    emoji: GeneralEmojisKeys.heart,
    usersCount: 0,
    isAuthReacted: false,
    nicknames: [],
  },
  {
    emoji: GeneralEmojisKeys.thumbUp,
    usersCount: 0,
    isAuthReacted: false,
    nicknames: [],
  },
  {
    emoji: GeneralEmojisKeys.laughter,
    usersCount: 0,
    isAuthReacted: false,
    nicknames: [],
  },
];

export class BaseReactionsStrategy<T> {
  constructor(
    private readonly commentId: number,
    private readonly controller: ReactionController<T>,
    private readonly getReactionValue: (reaction: T) => string,
    private readonly getNickname: (reaction: T) => string,
    private readonly getUserId: (reaction: T) => number
  ) {}

  public groupReactionChips(array: T[], authUserId?: number): IReactionChip[] {
    return array.reduce((acc, value) => {
      if (acc.some(item => item.emoji == this.getReactionValue(value)))
        return acc.map(item => {
          if (item.emoji == this.getReactionValue(value))
            return {
              emoji: item.emoji,
              usersCount: item.usersCount + 1,
              isAuthReacted: this.getUserId(value) == authUserId,
              nicknames: [...item.nicknames, this.getNickname(value)],
            };
          return item;
        });
      else
        acc = [
          ...acc,
          {
            emoji: this.getReactionValue(value),
            usersCount: 1,
            isAuthReacted: this.getUserId(value) == authUserId,
            nicknames: [this.getNickname(value)],
          },
        ];
      return acc;
    }, initialReactionChips);
  }

  public async toggleReaction(
    reaction: string,
    onSuccess?: (model: T | number) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<T | number> {
    return await this.controller.toggleReaction(
      this.commentId,
      {
        value: reaction,
      },
      onSuccess,
      onError
    );
  }
}
