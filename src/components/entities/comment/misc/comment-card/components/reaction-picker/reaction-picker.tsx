import { AuthContext } from '@app/providers/auth';
import { IReactionChip } from '@components/entities/comment/misc/comment-card/components/reaction-picker/types';
import { EmojiPicker } from '@components/shared/emoji-picker';
import { Button } from '@components/ui/button';
import { PopoverContent } from '@components/ui/popover';
import { toast } from '@components/ui/use-toast';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSmile } from 'react-icons/fi';

import { ReactionCardList } from './components/reaction-card-list';
import { BaseReactionsStrategy } from './strategies/base-reaction-strategy';

interface IReactionPicker<T> {
  commentId: number;
  reactions: T[];
  strategy: BaseReactionsStrategy<T>;
  onSuccess?: (result: T | number, commentId: number) => void;
}

export const ReactionPicker = <T,>(props: IReactionPicker<T>) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);

  const handleSuccess = (result: T | number) =>
    props.onSuccess?.(result, props.commentId);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const handleToggleReaction = async (reaction: string) => {
    if (!authContext.isAuth) return authContext.openAuthDialog();
    setIsLoading(true);
    await props.strategy.toggleReaction(reaction, handleSuccess, handleError);
    setIsLoading(false);
  };

  const reactionChips: IReactionChip[] = props.strategy.groupReactionChips(
    props.reactions,
    authContext.user?.id
  );

  return (
    <div className="flex items-center gap-2">
      <ReactionCardList
        isLoading={isLoading}
        items={reactionChips}
        onReact={handleToggleReaction}
      />
      <Popover open={isOpenEmojiPicker} onOpenChange={setIsOpenEmojiPicker}>
        <PopoverTrigger>
          <Button disabled={isLoading} variant="ghost" size="icon">
            <FiSmile size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <EmojiPicker
            onEmojiClick={handleToggleReaction}
            onClose={() => setIsOpenEmojiPicker(false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
