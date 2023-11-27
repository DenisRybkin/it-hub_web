import { MouseEvent } from 'react';
import { Hashtag, User } from '@lib/api/models';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getAvatar, getFallback, humanizeDate } from '@lib/utils/tools';
import { Badge } from '@components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';

interface IArticleCardHeadProps {
  author: User;
  hashtags?: Hashtag[];
  createdAt: string;
}

export const ArticleCardHead = (props: IArticleCardHeadProps) => {
  const navigate = useNavigate();

  const handleRedirectToAuthorPage = (
    event: MouseEvent<HTMLSpanElement>
  ): void =>
    void event.stopPropagation() ||
    navigate(RoutePaths[RouteKeys.USER] + `/${props.author.id}`);

  return (
    <div className="flex items-center justify-between w-full">
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
      <div className="flex flex-wrap justify-end gap-2">
        {props.hashtags?.map(hashtag => (
          <Badge
            variant="secondary"
            className="inline-block truncate max-w-[200px] py-0 md:py-0.5"
            key={hashtag.id}
          >
            {hashtag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
