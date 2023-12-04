import { ReactionCard } from './reaction-card';
import { IReactionChip } from '../types';

interface IGeneralEmojiListProps {
  isLoading: boolean;
  onReact: (reaction: string) => void;
  items: IReactionChip[];
}

export const ReactionCardList = (props: IGeneralEmojiListProps) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      {props.items.map(item => (
        <ReactionCard
          key={item.emoji}
          item={item}
          onReact={props.onReact}
          isLoading={props.isLoading}
        />
      ))}
    </div>
  );
};
