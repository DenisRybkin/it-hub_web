import React, { Ref, useRef, useState } from 'react';
import { TextEditor } from '@components/modules/text-editor';
import type { ITextEditorForwardRef } from '@components/modules/text-editor';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { FiSave, FiShare } from 'react-icons/fi';
import { LocaleStorageKeys } from '@lib/constants';
import { checkBlocksLength } from '@lib/utils/validations/text-editor';
import { toast } from '@components/ui/use-toast';

export const WritePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<ITextEditorForwardRef>();
  const { t } = useTranslation();

  const handleSaveAsDraft = async () => {
    const data = await ref.current?.onGetData();
    if (!data)
      toast({
        variant: 'destructive',
        title: t('toast:error.default'),
      });
    localStorage.setItem(
      LocaleStorageKeys.DRAFT,
      JSON.stringify(await ref.current?.onGetData())
    );
    toast({
      variant: 'success',
      title: t('toast:info.draft_saved'),
    });
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const data = await ref.current?.onGetData();
      if (!data) return;
      if (!checkBlocksLength(data))
        toast({
          variant: 'destructive',
          title: t('toast:error.small_article'),
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <TextEditor
          autofocus
          withHeading
          ref={ref as Ref<ITextEditorForwardRef>}
        />
        <div className="flex items-start self-center gap-2">
          <Button
            onClick={handleSaveAsDraft}
            variant="primary"
            data={{ leftIcon: <FiSave /> }}
          >
            {t('ui:button.save_draft')}
          </Button>
          <Button
            onClick={handlePublish}
            variant="primary"
            data={{ leftIcon: <FiShare />, isLoading: isLoading }}
          >
            {t('ui:button.publish')}
          </Button>
        </div>
      </div>
    </>
  );
};
