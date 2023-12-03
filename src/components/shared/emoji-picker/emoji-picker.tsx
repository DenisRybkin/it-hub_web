import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { LocaleKeys, LocaleStorageKeys } from '@lib/constants';

interface EmojiPickerProps {
  onClose?: () => void;
  onEmojiClick: (emoji: string) => void;
}

export const EmojiPicker = (props: EmojiPickerProps) => {
  return (
    <Picker
      theme="dark"
      color="red"
      locale={localStorage.getItem(LocaleStorageKeys.LOCALE) || LocaleKeys.EN}
      data={data}
      emojiSize="20"
      emojiButtonColors={['#877EFF']}
      previewPosition="none"
      onEmojiSelect={(e: { native: string }) => {
        props.onEmojiClick(e.native);
        props.onClose?.();
      }}
    />
  );
};
