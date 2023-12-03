import {
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StaticField } from '@lib/api/models';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';
import { FiImage, FiSmile } from 'react-icons/fi';
import { FileUploader } from '@components/entities/static-field/misc/file-uploader';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { PopoverContent } from '@components/ui/popover';
import { EmojiPicker } from '@components/shared/emoji-picker';
import { HorizontalScrollArea } from '@components/shared/horizontal-scroll-area';
import { ImageCard } from '@components/entities/static-field/misc/image-card';
import { useLocation } from 'react-router-dom';

export type SubmitCommentDto = {
  text: string;
  staticFieldIds?: number[];
};

interface ICommentSubmitProps<T> {
  isLoading?: boolean;
  onSubmit: (dto: SubmitCommentDto) => void;
}

export const commentsAnchor = '#comments';

export const CommentSubmit = <T,>(props: ICommentSubmitProps<T>) => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const messageInputRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [staticFields, setStaticFields] = useState<StaticField[]>([]);
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false);
  const handleDeleteStaticField = (staticField: StaticField) =>
    setStaticFields(prev => prev.filter(item => item.id != staticField.id));

  const handleReset = () => {
    if (messageInputRef.current?.innerText != null)
      messageInputRef.current.innerText = '';
    setStaticFields([]);
  };

  const handleSubmit = async () => {
    await props.onSubmit({
      text,
      staticFieldIds: staticFields.map(item => item.id),
    });
    handleReset();
  };

  const handleChange = (event: unknown) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setText(event.target.innerText);

  const handleAddEmoji = (emoji: string) => {
    setText(prev => (prev ? prev + emoji : emoji));
    if (messageInputRef.current?.innerText != null)
      messageInputRef.current.innerText += emoji;
  };

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = event => {
    if (!text.trim().length && event.code == 'Enter')
      return event.preventDefault();
    if (
      !event.ctrlKey &&
      !event.shiftKey &&
      event.code == 'Enter' &&
      text.trim().length
    ) {
      event.preventDefault();
      if (!isLoading) handleSubmit();
    }
  };

  const handlePaste: ClipboardEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain');
    if (text && messageInputRef.current) {
      document.execCommand('insertText', false, text);
      const fullText = messageInputRef.current?.innerText;
      fullText && setText(fullText);
    }
  };

  const scrollTo = () =>
    messageInputRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (hash == commentsAnchor) setTimeout(scrollTo);
  }, [hash]);

  return (
    <div className="relative w-full flex flex-col item-center bg-dark-2 rounded-lg">
      <div
        ref={messageInputRef}
        suppressContentEditableWarning
        contentEditable
        onInput={handleChange}
        aria-multiline="true"
        role="textbox"
        onPaste={handlePaste}
        onKeyDown={keyDownHandler}
        data-placeholder={t('ui:placeholder.comment')}
        className="overflow-y-auto bg-dark-2 resize-none h-24 min-h-full
        font-light pt-2 px-4 pb-6 w-full rounded-lg focus-visible:ring-2 focus-visible:ring-slate-950
        focus-visible:ring-offset-2 dark:outline-none dark:ring-offset-slate-950 dark:focus-visible:ring-primary-500"
      />
      {!!staticFields.length && (
        <HorizontalScrollArea
          containerClassName="mb-14 mt-4 px-2"
          itemsLength={staticFields.length}
          listClassName="gap-2 w-full"
        >
          {staticFields.map(staticField => (
            <ImageCard
              key={staticField.id}
              deleting
              staticField={staticField}
              className="w-28"
              onDelete={handleDeleteStaticField}
            />
          ))}
        </HorizontalScrollArea>
      )}
      <div className="absolute bottom-1 w-full flex flex-col px-2 pb-2 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FileUploader
              accept="image/*"
              maxSizeMb={4}
              formDataName="image"
              setIsUploading={setIsLoading}
              isUploading={isLoading}
              onSuccess={staticField =>
                setStaticFields(prev => [...prev, staticField])
              }
            >
              <Button
                disabled={isLoading || props.isLoading}
                variant="ghost"
                size="icon-sm"
              >
                <FiImage />
              </Button>
            </FileUploader>
            <Popover
              onOpenChange={setIsOpenEmojiPicker}
              open={isOpenEmojiPicker}
            >
              <PopoverTrigger>
                <Button
                  disabled={isLoading || props.isLoading}
                  variant="ghost"
                  size="icon-sm"
                >
                  <FiSmile />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-0">
                <EmojiPicker
                  onEmojiClick={handleAddEmoji}
                  onClose={() => setIsOpenEmojiPicker(false)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            disabled={!text.trim().length && !staticFields.length}
            onClick={handleSubmit}
            variant="primary"
            size="sm"
            data={{ isLoading: isLoading || props.isLoading }}
          >
            {t('ui:button.send')}
          </Button>
        </div>
      </div>
    </div>
  );
};
