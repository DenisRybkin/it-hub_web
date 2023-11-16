import { ChangeEvent } from 'react';
import type { IHashtag } from './hashtags-constructor';
import { Input } from '@components/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';

interface IHashtagProps {
  hashtag: IHashtag;
  onChange: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

export const Hashtag = (props: IHashtagProps) => {
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    props.onChange(props.hashtag.id, event.target.value);

  const handleDelete = () => props.onDelete(props.hashtag.id);

  return (
    <div className="w-full flex items-center justify-between gap-2 md:gap-4">
      <Input
        id={props.hashtag.id.toString()}
        placeholder={t('ui:placeholder.hashtag')}
        value={props.hashtag.text}
        onChange={handleChange}
      />
      <Button variant="primary" onClick={handleDelete}>
        {t('ui:button.delete')}
      </Button>
    </div>
  );
};
