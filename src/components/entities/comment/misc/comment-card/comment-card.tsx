import { RoutePaths } from '@app/router';
import { ControlMenu } from '@components/entities/comment/misc/comment-card/components/control-menu';
import { ReactionPicker } from '@components/entities/comment/misc/comment-card/components/reaction-picker';
import { BaseReactionsStrategy } from '@components/entities/comment/misc/comment-card/components/reaction-picker/strategies/base-reaction-strategy';
import { ImageCard } from '@components/entities/static-field/misc/image-card';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { StaticField, User } from '@lib/api/models';
import { RouteKeys } from '@lib/constants';
import { getAvatar, getFallback, humanizeDate } from '@lib/utils/tools';
import Linkify from 'linkify-react';
import { useNavigate } from 'react-router-dom';

interface ICommentCardProps<R> {
  id: number;
  author: User;
  createdAt: Date;
  text: string;
  reactions: R[];
  attachments?: StaticField[];
  reactionStrategy: BaseReactionsStrategy<R>;
  refetchByCommentId?: (commentId: number) => void;
}

export const CommentCard = <R,>(props: ICommentCardProps<R>) => {
  const navigate = useNavigate();

  const handleRedirectToAuthorPage = () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${props.author.id}`);

  const handleReactionSuccess = (reaction: R | number, commentId: number) =>
    props.refetchByCommentId?.(props.id);

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
              dateTime={props.createdAt.toString()}
              className="text-small-regular text-gray-1"
            >
              {humanizeDate(props.createdAt, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <ReactionPicker<R>
            commentId={props.id}
            onSuccess={handleReactionSuccess}
            reactions={props.reactions}
            strategy={props.reactionStrategy}
          />
          <ControlMenu
            commentId={props.id}
            onSuccess={props.refetchByCommentId}
            author={props.author}
          />
        </div>
      </div>

      {/*BODY*/}
      <div className="[&>p]:break-words whitespace-pre-wrap">
        <Linkify as="p">{props.text}</Linkify>
      </div>
      {!!props.attachments?.length && (
        <HorizontalScrollArea
          containerClassName="mt-2"
          itemsLength={props.attachments.length}
        >
          {props.attachments.map(item => (
            <ImageCard key={item.id} staticField={item} className="w-28" />
          ))}
        </HorizontalScrollArea>
      )}
    </div>
  );
};
