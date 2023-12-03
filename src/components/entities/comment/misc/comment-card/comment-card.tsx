import { User } from '@lib/api/models';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getAvatar, getFallback, humanizeDate } from '@lib/utils/tools';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { FiSmile } from 'react-icons/fi';
import { ReactionPicker } from '@components/entities/comment/misc/comment-card/components/reaction-picker/reaction-picker';
import { BaseReactionsStrategy } from '@components/entities/comment/misc/comment-card/components/reaction-picker/strategies/base-reaction-strategy';

interface ICommentCardProps<R> {
  id: number;
  author: User;
  createdAt: string;
  text: string;
  reactions: R[];
  reactionStrategy: BaseReactionsStrategy<R>;
  onReactionSuccess?: (result: R | number, commentId: number) => void;
}

export const CommentCard = <R,>(props: ICommentCardProps<R>) => {
  const navigate = useNavigate();

  const handleRedirectToAuthorPage = () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${props.author.id}`);

  return (
    <div className="flex flex-col gap-2 w-full rounded-xl bg-dark-2 p-3 md:p-5">
      {/*HEAD*/}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-2">
          <Avatar onClick={handleRedirectToAuthorPage}>
            <AvatarImage src={getAvatar(props.author)} />
            <AvatarFallback>{getFallback(props.author)}</AvatarFallback>
          </Avatar>
          <div className="w-fit flex flex-col">
            <h4 className="cursor-pointer text-body-semibold text-light-1">
              {props.author.name}
            </h4>
            <span className="text-small-regular text-gray-1">
              @{props.author.nickname}
            </span>
            <time
              dateTime={props.createdAt}
              className="text-small-regular text-gray-1"
            >
              {humanizeDate(new Date(props.createdAt), {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
        <ReactionPicker<R>
          commentId={props.id}
          onSuccess={props.onReactionSuccess}
          reactions={props.reactions}
          strategy={props.reactionStrategy}
        />
      </div>

      {/*BODY*/}
      <p>{props.text}</p>
    </div>
  );
};
