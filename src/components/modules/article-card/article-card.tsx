import { User } from '@lib/api/models';
import {
  cn,
  getAvatar,
  getFallback,
  transform2PreviewMode,
} from '@lib/utils/tools';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { FiCornerUpLeft, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { TextEditor } from '@components/modules/text-editor';
import { useDeviceDetermine } from '@lib/utils/hooks';

export interface IArticleCard {
  title: string;
  body: string;
  author: User;
  previewMode?: boolean;
}

export const ArticleCard = (props: IArticleCard) => {
  const [deviceSize] = useDeviceDetermine();

  const isLiked = true;

  return (
    <article
      className={cn('flex w-full flex-col rounded-xl bg-dark-2 p-3 md:p-7')}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Avatar>
              <AvatarImage src={getAvatar(props.author)} />
              <AvatarFallback>{getFallback(props.author)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex w-full flex-col overflow-hidden">
            <div className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {props.author.name}
              </h4>
            </div>
            <TextEditor
              value={transform2PreviewMode(JSON.parse(props.body))}
              readonly
            />
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Button variant="ghost" size="icon">
                  <FiHeart
                    className={cn(isLiked && 'stroke-red fill-red')}
                    size={deviceSize == 'sm' ? 20 : 22}
                  />
                </Button>
                <Button variant="ghost" size="icon">
                  <FiMessageSquare
                    stroke="#5C5C7B"
                    size={deviceSize == 'sm' ? 20 : 22}
                  />
                </Button>
                <Button variant="ghost" size="icon">
                  <FiCornerUpLeft
                    stroke="#5C5C7B"
                    size={deviceSize == 'sm' ? 20 : 22}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
