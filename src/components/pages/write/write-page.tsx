import React, { Ref, useRef, useState } from 'react';
import type { ITextEditorForwardRef } from '@components/entities/article/misc/text-editor';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { FiImage, FiSave, FiShare, FiX } from 'react-icons/fi';
import { LocaleStorageKeys, RouteKeys } from '@lib/constants';
import { checkBlocksLength } from '@lib/utils/validations/text-editor';
import { toast } from '@components/ui/use-toast';
import { CategoryList } from '@components/entities/category/category-list';
import { OutputData } from '@editorjs/editorjs';
import {
  ITestConstructorForwardRef,
  TestConstructor,
} from '@components/entities/article/misc/test-constructor/test-constructor';
import { CoverImage } from '@components/shared/cover-image';
import { SelectPreviewDialog } from '@components/entities/static-field/dialogs/select-preview';
import { Article, CreateComplexArticleDto, StaticField } from '@lib/api/models';
import {
  HashtagsEditor,
  IHashtagsEditorForwardRef,
} from '@components/entities/article/misc/hashtags-editor';
import { api } from '@lib/api/plugins';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';

export const WritePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isOpenSelectPreviewDialog, setIsOpenSelectPreviewDialog] =
    useState<boolean>(false);
  const [preview, setPreview] = useState<StaticField | undefined>(undefined);
  const editorRef = useRef<ITextEditorForwardRef>();
  const testConstructorRef = useRef<ITestConstructorForwardRef>();
  const hashtagsEditorRef = useRef<IHashtagsEditorForwardRef>();

  const handleOpenSelectPreviewDialog = () =>
    setIsOpenSelectPreviewDialog(true);

  const resetPreview = () => setPreview(undefined);

  const handleError = () =>
    toast({
      title: t('toast:error.default'),
      variant: 'destructive',
    });

  const handleSuccess = (model: Article) => {
    toast({
      title: t('toast:success.article_created'),
      variant: 'success',
    });
    navigate(RoutePaths[RouteKeys.ARTICLE] + `/${model.id}`);
  };

  const validation = (body?: OutputData, selectedCategoryIds?: number[]) => {
    if (!body || !checkBlocksLength(body))
      throw new Error(t('toast:error.small_article'));
    if (!selectedCategoryIds?.length)
      throw new Error(t('validation:error.no_category_selected'));
  };

  const getAndValidateDto = async (): Promise<
    CreateComplexArticleDto | undefined
  > => {
    try {
      const body = await editorRef.current?.onGetData();
      const questions = testConstructorRef.current?.getAndValidateData();
      const previewId = preview?.id;
      const categoryIds = selectedCategoryIds;
      const hashtags = hashtagsEditorRef.current?.data;
      validation(body, selectedCategoryIds);
      return {
        body: JSON.stringify(body),
        categoryIds,
        previewId,
        hashtagIds: hashtags?.map(item => item.id),
        questions,
      };
    } catch (e) {
      toast({
        variant: 'destructive',
        title: (e as Error).message,
      });
      return undefined;
    }
  };

  const handleSaveAsDraft = async () => {
    const dto = await getAndValidateDto();
    if (!dto) return;
    localStorage.setItem(
      LocaleStorageKeys.DRAFT,
      JSON.stringify({
        //categories: hashtagsConstructorRef.current?.getData(),
        body: await editorRef.current?.onGetData(),
      })
    );
    toast({
      variant: 'success',
      title: t('toast:info.draft_saved'),
    });
  };

  const handlePublish = async () => {
    setIsLoading(true);
    const dto = await getAndValidateDto();
    if (!dto) return setIsLoading(false);

    await api.article.createComplex(dto, handleSuccess, handleError);
    setIsLoading(false);
  };

  return (
    <>
      <SelectPreviewDialog
        onChangePreview={setPreview}
        preview={preview}
        isOpen={isOpenSelectPreviewDialog}
        onOpenChange={setIsOpenSelectPreviewDialog}
      />
      <div className="flex flex-col w-full gap-4">
        <CoverImage
          image={preview}
          bottomPanel={
            <div className="flex items-center gap-x-2">
              <Button
                onClick={handleOpenSelectPreviewDialog}
                variant="ghost"
                data={{ leftIcon: <FiImage /> }}
              >
                {t('ui:button.change_cover')}
              </Button>
              <Button
                onClick={resetPreview}
                variant="ghost"
                data={{ leftIcon: <FiX /> }}
              >
                {t('ui:button.remove')}
              </Button>
            </div>
          }
        />
        <div className="flex justify-between items-center">
          <h1 className="head-text text-left">
            {t('ui:title.creating_article')}
          </h1>
          {!preview && (
            <Button
              onClick={handleOpenSelectPreviewDialog}
              variant="primary"
              data={{ leftIcon: <FiImage /> }}
            >
              {t('ui:button.add_cover')}
            </Button>
          )}
        </div>
        <CategoryList
          selectedIds={selectedCategoryIds}
          onChangeSelects={setSelectedCategoryIds}
        />
        <TextEditor
          autofocus
          withHeading
          ref={editorRef as Ref<ITextEditorForwardRef>}
        />
        <TestConstructor
          ref={testConstructorRef as Ref<ITestConstructorForwardRef>}
        />
        <HashtagsEditor
          className="mt-2"
          ref={hashtagsEditorRef as Ref<IHashtagsEditorForwardRef>}
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
