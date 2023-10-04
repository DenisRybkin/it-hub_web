import React, { Ref, useRef, useState } from 'react';
import { TextEditor } from '@components/modules/text-editor';
import type { ITextEditorForwardRef } from '@components/modules/text-editor';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { FiSave, FiShare } from 'react-icons/fi';
import { LocaleStorageKeys } from '@lib/constants';
import { checkBlocksLength } from '@lib/utils/validations/text-editor';
import { toast } from '@components/ui/use-toast';
import { CategoryList } from '@components/modules/category';
import { OutputData } from '@editorjs/editorjs';
import {
  HashtagsConstructor,
  IHashtagsConstructorForwardRef,
} from '@components/modules/hashtags-constructor';

export const WritePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const editorRef = useRef<ITextEditorForwardRef>();
  const hashtagsConstructorRef = useRef<IHashtagsConstructorForwardRef>();
  const { t } = useTranslation();

  const validationForPublish = (data?: OutputData) => {
    if (!data) throw new Error();
    if (!checkBlocksLength(data))
      throw new Error(t('toast:error.small_article'));
    if (!selectedCategoryIds.length)
      throw new Error('validation:error.no_category_selected');
  };

  const handleSaveAsDraft = async () => {
    try {
      const data = await editorRef.current?.onGetData();
      validationForPublish(data);
      localStorage.setItem(
        LocaleStorageKeys.DRAFT,
        JSON.stringify({
          categories: hashtagsConstructorRef.current?.getData(),
          body: await editorRef.current?.onGetData(),
        })
      );
      toast({
        variant: 'success',
        title: t('toast:info.draft_saved'),
      });
    } catch (e) {
      return toast({
        variant: 'destructive',
        title: (e as Error).message,
      });
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const data = await editorRef.current?.onGetData();
      validationForPublish(data);
    } catch (e) {
      return toast({
        variant: 'destructive',
        title: (e as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <h1 className="head-text text-left">
          {t('ui:title.creating_article')}
        </h1>
        <CategoryList
          selectedIds={selectedCategoryIds}
          onChangeSelects={setSelectedCategoryIds}
        />
        <TextEditor
          autofocus
          withHeading
          ref={editorRef as Ref<ITextEditorForwardRef>}
        />
        <HashtagsConstructor
          className="mt-2"
          ref={hashtagsConstructorRef as Ref<IHashtagsConstructorForwardRef>}
        />
        <div className="flex mt-2 items-start self-center gap-2">
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
