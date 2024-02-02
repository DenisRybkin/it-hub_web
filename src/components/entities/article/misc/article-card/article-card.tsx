import { RoutePaths } from '@app/router';
import { ArticleCardFooter } from '@components/entities/article/misc/article-card/components/article-card-footer';
import { ArticleCardHead } from '@components/entities/article/misc/article-card/components/article-card-head';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { Button } from '@components/ui/button';
import { OutputData } from '@editorjs/editorjs';
import { Hashtag, User } from '@lib/api/models';
import { RouteKeys } from '@lib/constants';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { transform2PreviewMode } from '@lib/utils/tools';
import { MouseEvent } from 'react';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export interface IArticleCard {
  id: number;
  body: string;
  author: User;
  hashtags?: Hashtag[];
  likesCount: number;
  repostsCount: number;
  commentsCount: number;
  isLiked: boolean;
  isCommented: boolean;
  isReposted: boolean;
  createdAt: string;
  onActionSuccess?: (articleId: number) => void;
}

export const ArticleCard = (props: IArticleCard) => {
  const navigate = useNavigate();

  const [deviceSize] = useDeviceDetermine();
  const minPreviewModeScale = deviceSize == 'sm' ? 2 : 3;
  const originalBody: OutputData = useMemo(
    () => JSON.parse(props.body),
    [props.id]
  );
  const [previewModeScale, setPreviewModeScale] = useState(minPreviewModeScale);
  const previewModeIsMax = previewModeScale >= originalBody?.blocks?.length;

  const body: OutputData | null = useMemo(
    () => transform2PreviewMode(originalBody, previewModeScale),
    [previewModeScale, props.body]
  );

  const handleMore = () =>
    setPreviewModeScale(prev => (previewModeIsMax ? prev : prev + 1));

  const handleLess = () =>
    setPreviewModeScale(prev =>
      prev <= minPreviewModeScale ? prev : minPreviewModeScale
    );

  const handleOpenArticle = () =>
    navigate(RoutePaths[RouteKeys.ARTICLE] + `/${props.id}`);

  return (
    <article
      onClick={handleOpenArticle}
      className="flex w-full flex-col rounded-xl bg-dark-2 p-3 md:p-7"
    >
      <div className="flex flex-col items-start justify-between">
        <ArticleCardHead
          author={props.author}
          hashtags={props.hashtags}
          createdAt={props.createdAt}
        />
        <div className="flex w-full flex-1 flex-row gap-4 relative lg:[&>button]:hover:inline-flex">
          {body && <TextEditor defaultValue={body} value={body} readonly />}
          <Button
            className="hidden absolute -bottom-6 m-auto left-0 right-0 z-10"
            variant="ghost"
            size="icon-sm"
            onClick={event => {
              event.stopPropagation();
              previewModeIsMax ? handleLess() : handleMore();
            }}
          >
            {previewModeIsMax ? (
              <FiChevronUp size={deviceSize == 'sm' ? 20 : 22} />
            ) : (
              <FiChevronDown size={deviceSize == 'sm' ? 20 : 22} />
            )}
          </Button>
        </div>
        <ArticleCardFooter
          articleId={props.id}
          likesCount={props.likesCount}
          repostsCount={props.repostsCount}
          commentsCount={props.commentsCount}
          isLiked={props.isLiked}
          isCommented={props.isCommented}
          isReposted={props.isReposted}
          previewModeIsMax={previewModeIsMax}
          onDecreasePreviewMode={handleLess}
          onIncreasePreviewMode={handleMore}
          onActionSuccess={props.onActionSuccess}
        />
      </div>
    </article>
  );
};
