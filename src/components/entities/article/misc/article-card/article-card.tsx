import { Hashtag, User } from '@lib/api/models';
import {
  cn,
  getAvatar,
  getFallback,
  transform2PreviewMode,
} from '@lib/utils/tools';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  FiChevronDown,
  FiChevronUp,
  FiCornerUpLeft,
  FiHeart,
  FiMessageSquare,
} from 'react-icons/fi';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { ArticleCardHead } from '@components/entities/article/misc/article-card/article-card-head';
import { ArticleCardFooter } from '@components/entities/article/misc/article-card/article-card-footer';
import { useMemo, useState } from 'react';
import { OutputData } from '@editorjs/editorjs';

export interface IArticleCard {
  body: string;
  author: User;
  hashtags?: Hashtag[];
}

export const ArticleCard = (props: IArticleCard) => {
  const [deviceSize] = useDeviceDetermine();
  const minPreviewModeScale = deviceSize == 'sm' ? 2 : 3;
  const originalBody: OutputData = JSON.parse(props.body);
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

  console.log(previewModeScale, originalBody?.blocks?.length);
  return (
    <article
      className={cn('flex w-full flex-col rounded-xl bg-dark-2 p-3 md:p-7')}
    >
      <div className="flex flex-col items-start justify-between">
        <ArticleCardHead author={props.author} hashtags={props.hashtags} />
        <div className="flex w-full flex-1 flex-row gap-4 relative lg:[&>button]:hover:inline-flex">
          {body && <TextEditor defaultValue={body} value={body} readonly />}
          <Button
            className="hidden absolute -bottom-6 m-auto left-0 right-0 z-10"
            variant="ghost"
            size="icon-sm"
            onClick={previewModeIsMax ? handleLess : handleMore}
          >
            {previewModeIsMax ? (
              <FiChevronUp size={deviceSize == 'sm' ? 20 : 22} />
            ) : (
              <FiChevronDown size={deviceSize == 'sm' ? 20 : 22} />
            )}
          </Button>
        </div>
        <ArticleCardFooter
          previewModeIsMax={previewModeIsMax}
          onDecreasePreviewMode={handleLess}
          onIncreasePreviewMode={handleMore}
        />
      </div>
    </article>
  );
};
