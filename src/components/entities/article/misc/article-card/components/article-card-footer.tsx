import React, { MouseEvent, useContext } from 'react';
import { Button } from '@components/ui/button';
import {
  FiChevronDown,
  FiChevronUp,
  FiCornerUpLeft,
  FiHeart,
  FiMessageSquare,
} from 'react-icons/fi';
import { cn, number2short } from '@lib/utils/tools';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { AuthContext } from '@app/providers/auth';
import { useMutation } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { commentsAnchor } from '@components/entities/comment/misc/comment-submit';

interface IArticleCardFooterProps {
  articleId: number;
  previewModeIsMax?: boolean;
  onIncreasePreviewMode?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDecreasePreviewMode?: (event: MouseEvent<HTMLButtonElement>) => void;
  likesCount: number;
  repostsCount: number;
  commentsCount: number;
  isLiked: boolean;
  isCommented: boolean;
  isReposted: boolean;
  onActionSuccess?: (articleId: number) => void;
}

export const ArticleCardFooter = (props: IArticleCardFooterProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [deviceSize] = useDeviceDetermine();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const toggleLikeMutation = useMutation({
    mutationKey: [api.article.toString(), 'like', props.articleId],
    mutationFn: async () =>
      await api.article.toggleLike(props.articleId, undefined, handleError),
    onError: handleError,
    onSuccess: () => props.onActionSuccess?.(props.articleId),
  });

  const toggleRepostMutation = useMutation({
    mutationKey: [api.article.toString(), 'repost', props.articleId],
    mutationFn: async () =>
      await api.article.toggleRepost(props.articleId, undefined, handleError),
    onError: handleError,
    onSuccess: () => props.onActionSuccess?.(props.articleId),
  });

  const handleOpenArticleComments = (event: MouseEvent<HTMLButtonElement>) =>
    void event.stopPropagation() ||
    navigate(
      RoutePaths[RouteKeys.ARTICLE] + `/${props.articleId}` + commentsAnchor
    );

  const handleToggleLike = (event: MouseEvent<HTMLButtonElement>) =>
    void event.stopPropagation() || toggleLikeMutation.mutate();
  const handleToggleRepost = (event: MouseEvent<HTMLButtonElement>) =>
    void event.stopPropagation() || toggleRepostMutation.mutate();

  return (
    <div className="flex gap-3 mt-2 w-full justify-around md:justify-start">
      <Button
        variant="ghost"
        onClick={event =>
          authContext.isAuth
            ? handleToggleLike(event)
            : authContext.openAuthDialog()
        }
        className={cn('rounded-full', !props.likesCount && '[&>div]:m-0')}
        data={{
          isLoading: toggleLikeMutation.isLoading,
          leftIcon: (
            <FiHeart
              stroke="#5C5C7B"
              className={cn(props.isLiked && 'stroke-red fill-red')}
              size={deviceSize == 'sm' ? 20 : 22}
            />
          ),
        }}
      >
        {!props.likesCount ? null : number2short(props.likesCount)}
      </Button>
      <Button
        variant="ghost"
        onClick={handleOpenArticleComments}
        className={cn('rounded-full', !props.commentsCount && '[&>div]:m-0')}
        data={{
          //isLoading: toggleLikeMutation.isLoading,
          leftIcon: (
            <FiMessageSquare
              stroke="#5C5C7B"
              className={cn(props.isCommented && 'stroke-primary-500')}
              size={deviceSize == 'sm' ? 20 : 22}
            />
          ),
        }}
      >
        {!props.commentsCount ? null : number2short(props.commentsCount)}
      </Button>
      <Button
        variant="ghost"
        onClick={event =>
          authContext.isAuth
            ? handleToggleRepost(event)
            : authContext.openAuthDialog()
        }
        className={cn('rounded-full', !props.repostsCount && '[&>div]:m-0')}
        data={{
          isLoading: toggleRepostMutation.isLoading,
          leftIcon: (
            <FiCornerUpLeft
              className={cn(props.isReposted && 'stroke-primary-500')}
              stroke="#5C5C7B"
              size={deviceSize == 'sm' ? 20 : 22}
            />
          ),
        }}
      >
        {!props.repostsCount ? null : number2short(props.repostsCount)}
      </Button>
      {deviceSize == 'sm' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={
            props.previewModeIsMax
              ? props.onDecreasePreviewMode
              : props.onIncreasePreviewMode
          }
        >
          {props.previewModeIsMax ? (
            <FiChevronUp stroke="#5C5C7B" size={24} />
          ) : (
            <FiChevronDown stroke="#5C5C7B" size={24} />
          )}
        </Button>
      )}
    </div>
  );
};
