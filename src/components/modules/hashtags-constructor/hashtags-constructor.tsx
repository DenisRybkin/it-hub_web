import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { cn, IdGenerator } from '@lib/utils/tools';
import { Hashtag } from '@components/modules/hashtags-constructor/hashtag';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';

export interface IHashtag {
  id: number;
  text: string;
}

export interface IHashtagsConstructorForwardRef {
  getData: () => Omit<IHashtag, 'id'>[];
}

interface IHashtagsConstructorProps {
  className?: string;
}

const idGenerator = new IdGenerator(0);

const removeIds = (data: IHashtag[]): Omit<IHashtag, 'id'>[] =>
  data.map(item => ({ text: item.text }));

export const HashtagsConstructor = forwardRef<
  IHashtagsConstructorForwardRef,
  IHashtagsConstructorProps
>((props, ref) => {
  const { t } = useTranslation();
  const [hashtags, setHashtags] = useState<IHashtag[]>([]);

  const handleAddHashtag = () =>
    setHashtags(prev => [...prev, { id: idGenerator.getId, text: '' }]);

  const handleDeleteHashtag = (id: number) =>
    setHashtags(prev => prev.filter(item => item.id != id));

  const handleChangeHashtag = (id: number, text: string) =>
    setHashtags(prev =>
      prev.map(item => (item.id == id ? { id, text } : item))
    );

  useImperativeHandle<
    IHashtagsConstructorForwardRef,
    IHashtagsConstructorForwardRef
  >(ref, () => ({ getData: () => removeIds(hashtags) }), [hashtags]);

  return (
    <div className={cn('w-full flex flex-col gap-2', props.className)}>
      {hashtags.map(item => (
        <Hashtag
          key={item.id}
          hashtag={item}
          onChange={handleChangeHashtag}
          onDelete={handleDeleteHashtag}
        />
      ))}
      <Button
        className="w-fit self-center"
        variant="primary"
        onClick={handleAddHashtag}
      >
        {t('ui:button.add_hashtag')}
      </Button>
    </div>
  );
});
