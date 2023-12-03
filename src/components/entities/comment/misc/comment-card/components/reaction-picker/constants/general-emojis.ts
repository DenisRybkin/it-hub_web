import { Reaction } from '../types';

export enum GeneralEmojisKeys {
  laughter = '😂',
  heart = '❤',
  fire = '🔥',
  thumbUp = '👍',
}

export const generalEmojis: Reaction[] = [
  {
    value: GeneralEmojisKeys.laughter,
  },
  {
    value: GeneralEmojisKeys.heart,
  },
  {
    value: GeneralEmojisKeys.fire,
  },
  {
    value: GeneralEmojisKeys.thumbUp,
  },
];
