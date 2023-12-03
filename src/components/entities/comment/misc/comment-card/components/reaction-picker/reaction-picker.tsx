import React, { useContext, useState } from 'react';
import { BaseReactionsStrategy } from './strategies/base-reaction-strategy';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '@components/ui/button';
import { FiSmile } from 'react-icons/fi';
import { PopoverContent } from '@components/ui/popover';
import { EmojiPicker } from '@components/shared/emoji-picker';
import { GeneralEmojiList } from './components/general-emoji-list';
import { IReactionChip } from '@components/entities/comment/misc/comment-card/components/reaction-picker/types';
import { AuthContext } from '@app/providers/auth';

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
      <GeneralEmojiList
        isLoading={isLoading}
        items={reactionChips}
        onReact={handleToggleReaction}
      />
      <Popover open={isOpenEmojiPicker} onOpenChange={setIsOpenEmojiPicker}>
        <PopoverTrigger>
          <Button disabled={isLoading} variant="ghost" size="icon-sm">
            <FiSmile />
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
