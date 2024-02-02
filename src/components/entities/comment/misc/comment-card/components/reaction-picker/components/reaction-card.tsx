import { AuthContext } from '@app/providers/auth';
import { Button } from '@components/ui/button';
import { cn, number2short } from '@lib/utils/tools';
import { useContext } from 'react';

import { IReactionChip } from '../types';

interface IReactionCardProps {
  isLoading: boolean;
  item: IReactionChip;
  onReact: (reaction: string) => void;
}

export const ReactionCard = (props: IReactionCardProps) => {
  const authContext = useContext(AuthContext);
  const handleClick = () =>
    authContext.isAuth
      ? props.onReact(props.item.emoji)
      : authContext.openAuthDialog();

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
