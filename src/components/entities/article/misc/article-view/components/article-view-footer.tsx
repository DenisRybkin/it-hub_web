import React, { MouseEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@app/providers/auth';
import { toast } from '@components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { cn, number2short } from '@lib/utils/tools';
import { FiCornerUpLeft, FiHeart } from 'react-icons/fi';
import { Button } from '@components/ui/button';
import { useDeviceDetermine } from '@lib/utils/hooks';

interface IArticleViewFooterProps {
  articleId: number;
  isLiked: boolean;
  isReposted: boolean;
  likesCount: number;
  repostsCount: number;
  onActionSuccess?: (articleId: number) => void;
}

export const ArticleViewFooter = (props: IArticleViewFooterProps) => {
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

  const handleToggleLike = () => toggleLikeMutation.mutate();
  const handleToggleRepost = () => toggleRepostMutation.mutate();

  return (
    <div className="flex gap-3 mt-2 w-full justify-start">
      <Button
        variant="ghost"
        onClick={
          authContext.isAuth ? handleToggleLike : authContext.openAuthDialog
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
        onClick={
          authContext.isAuth ? handleToggleRepost : authContext.openAuthDialog
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
    </div>
  );
};
