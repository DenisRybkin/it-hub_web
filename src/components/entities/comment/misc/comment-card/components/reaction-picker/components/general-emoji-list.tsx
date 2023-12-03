import { GeneralEmoji } from './general-emoji';
import { IReactionChip } from '../types';

interface IGeneralEmojiListProps {
  isLoading: boolean;
  onReact: (reaction: string) => void;
  items: IReactionChip[];
}

export const GeneralEmojiList = (props: IGeneralEmojiListProps) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      {props.items.map(item => (
        <GeneralEmoji
          key={item.emoji}
          item={item}
          onReact={props.onReact}
          isLoading={props.isLoading}
        />
      ))}
    </div>
  );
};
