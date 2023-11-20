import React from 'react';
import { Hashtag, User } from '@lib/api/models';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getAvatar, getFallback } from '@lib/utils/tools';
import { Badge } from '@components/ui/badge';

interface IArticleCardHeadProps {
  author: User;
  hashtags?: Hashtag[];
}

export const ArticleCardHead = (props: IArticleCardHeadProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 mb-2">
        <Avatar>
          <AvatarImage src={getAvatar(props.author)} />
          <AvatarFallback>{getFallback(props.author)}</AvatarFallback>
        </Avatar>
        <div className="w-fit">
          <h4 className="cursor-pointer text-body-semibold text-light-1">
            {props.author.name}
          </h4>
          <span className="text-small-regular text-gray-1">
            @{props.author.nickname}
          </span>
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
