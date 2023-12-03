import { Button } from '@components/ui/button';
import { IReactionChip } from '../types';
import { cn, number2short } from '@lib/utils/tools';

interface IGeneralEmojiProps {
  isLoading: boolean;
  item: IReactionChip;
  onReact: (reaction: string) => void;
}

export const GeneralEmoji = (props: IGeneralEmojiProps) => {
  const handleClick = () => props.onReact(props.item.emoji);

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className={cn(
        'rounded-full px-2 md:px-3',
        !props.item.usersCount && '[&>div]:m-0'
      )}
      data={{ leftIcon: props.item.emoji, isLoading: props.isLoading }}
    >
      {props.item.usersCount ? (
        <span className={cn(props.item.isAuthReacted && 'text-primary-500')}>
          {number2short(props.item.usersCount)}
        </span>
      ) : null}
    </Button>
  );
};
