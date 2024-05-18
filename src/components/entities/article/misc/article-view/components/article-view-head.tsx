import { RoutePaths } from '@app/router';
import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import {
  HashtagsEditor,
  IHashtagsEditorForwardRef,
} from '@components/entities/hashtag/misc/hashtags-editor';
import type { UpdateDto } from '@components/pages/article';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Category, Hashtag, User } from '@lib/api/models';
import { RouteKeys } from '@lib/constants';
import { getAvatar, getFallback, humanizeDate } from '@lib/utils/tools';
import React, { Dispatch, forwardRef, Ref, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface IArticleViewHeadProps {
  readonly: boolean;
  createdAt: Date;
  author: User;
  hashtags?: Hashtag[];
  categories?: Category[];
  onChangeHashtags: (value?: Hashtag[]) => void;
  onChangeSelectedCategories: (value: Category[]) => void;
  updateDto?: UpdateDto;
}

export const ArticleViewHead = forwardRef<
  IHashtagsEditorForwardRef,
  IArticleViewHeadProps
>((props, ref) => {
  const navigate = useNavigate();

  const handleRedirectToAuthorPage = () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${props.author.id}`);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 mb-2">
          <Avatar
            className="cursor-pointer"
            onClick={handleRedirectToAuthorPage}
          >
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
        {props.readonly && (
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
        )}
      </div>
      {!props.readonly && (
        <HashtagsEditor
          className="mt-2"
          value={props.updateDto?.hashtags ?? []}
          onChange={
            props.onChangeHashtags as Dispatch<
              SetStateAction<Hashtag[] | undefined>
            >
          }
          ref={ref as Ref<IHashtagsEditorForwardRef>}
        />
      )}
      <CategoryCardList
        selectedCategories={
          props.readonly ? props.categories : props.updateDto?.categories
        }
        onChangeSelectedCategories={props.onChangeSelectedCategories}
        readonly={props.readonly}
      />
    </>
  );
});
