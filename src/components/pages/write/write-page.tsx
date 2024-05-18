import { RoutePaths } from '@app/router';
import type { ITextEditorForwardRef } from '@components/entities/article/misc/text-editor';
import { TextEditor } from '@components/entities/article/misc/text-editor';
import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import {
  HashtagsEditor,
  IHashtagsEditorForwardRef,
} from '@components/entities/hashtag/misc/hashtags-editor';
import { SelectPreviewDialog } from '@components/entities/static-field/dialogs/select-preview';
import {
  ITestConstructorForwardRef,
  TestConstructor,
} from '@components/entities/test/misc/test-constructor/test-constructor';
import { CoverImage } from '@components/shared/cover-image';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import { OutputData } from '@editorjs/editorjs';
import {
  Article,
  Category,
  CreateComplexArticleDto,
  StaticField,
} from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { LocalStorageKeys, RouteKeys } from '@lib/constants';
import { checkBlocksLength } from '@lib/utils/validations';
import React, { Ref, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiImage, FiSave, FiShare, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const WritePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
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

  const getTopic = async () => {
    const topic = (await editorRef.current?.getData())?.blocks[0].data.text;
    return topic ?? '';
  };

  const getAndValidateDto = async (): Promise<
    CreateComplexArticleDto | undefined
  > => {
    try {
      const body = await editorRef.current?.getData();
      const questions = testConstructorRef.current?.getAndValidateData();
      const previewId = preview?.id;
      const categoryIds = selectedCategories.map(item => item.id);
      const hashtags = hashtagsEditorRef.current?.data;
      validation(body, categoryIds);
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
      LocalStorageKeys.DRAFT,
      JSON.stringify({
        //categories: hashtagsConstructorRef.current?.getData(),
        body: await editorRef.current?.getData(),
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
        <CategoryCardList
          selectedCategories={selectedCategories}
          onChangeSelectedCategories={setSelectedCategories}
        />
        <TextEditor
          autofocus
          withHeading
          ref={editorRef as Ref<ITextEditorForwardRef>}
        />
        <h1 className="head-text text-left">{t('ui:title.testing')}</h1>
        <TestConstructor
          getTopic={getTopic}
          ref={testConstructorRef as Ref<ITestConstructorForwardRef>}
        />
        <h1 className="head-text text-left">{t('ui:title.hashtags')}</h1>
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
