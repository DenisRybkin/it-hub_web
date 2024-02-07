import { AuthContext } from '@app/providers/auth';
import { Button } from '@components/ui/button';
import { TooltipAdapter } from '@components/ui/tooltip';
import { cn, number2short } from '@lib/utils/tools';
import * as React from 'react';
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

  const trigger = (
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

  return props.item.usersCount ? (
    <TooltipAdapter trigger={trigger}>
      <p>
        {props.item.nicknames
          .slice(0, 4)
          .map(
            (item, index) =>
              '@' +
              item +
              (index != props.item.nicknames.length - 1 ? ', ' : '')
          )}
      </p>
    </TooltipAdapter>
  ) : (
    trigger
  );
};
