import { Dispatch, SetStateAction, useState } from 'react';
import { DialogAdapter, IBaseDialogProps } from '@components/shared/dialog';
import { useTranslation } from 'react-i18next';
import { useControllableState } from '@lib/utils/hooks';
import { toast } from '@components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { QueryKeys } from '@lib/constants';
import { CircularLoader } from '@components/ui/loader';
import { ImageCard } from '@components/entities/static-field/misc/image-card';
import { Button } from '@components/ui/button';
import { StaticField } from '@lib/api/models';
import { Preview } from '@components/entities/static-field/dialogs/select-preview/components/preview';

interface ISelectPreviewDialogProps extends IBaseDialogProps {
  preview?: StaticField;
  onChangePreview: Dispatch<SetStateAction<StaticField | undefined>>;
}

export const SelectPreviewDialog = (props: ISelectPreviewDialogProps) => {
  const { t } = useTranslation();

  const [preview, setPreview] = useControllableState<StaticField | undefined>({
    defaultValue: undefined,
    value: props.preview,
  });
  const [uploadedPreviews, setUploadedPreviews] = useState<StaticField[]>([]);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const {
    isFetching,
    isLoading,
    data: previews,
  } = useQuery({
    queryKey: [QueryKeys.PREVIEWS],
    queryFn: async () =>
      await api.staticField.getPreviews(undefined, handleError),
    select: data => data.items,
    enabled: props.isOpen,
  });

  const handleSelect = (value: StaticField) =>
    setPreview(value?.id == preview?.id ? undefined : value);

  const handleClose = () => props.onOpenChange(false);
  const isEdited = !props.preview
    ? !!preview?.id
    : preview?.id != props.preview?.id;

  const handleUploadPreview = (preview: StaticField) =>
    void handleSelect(preview) ||
    setUploadedPreviews(prev => [...prev, preview]);

  const handleSave = () => void props.onChangePreview(preview) || handleClose();

  return (
    <DialogAdapter
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={t('ui:title.select_cover')}
      footer={
        <>
          <Button onClick={handleClose}>{t('ui:button.cancel')}</Button>
          <Button disabled={!isEdited} onClick={handleSave} variant="primary">
            {t('ui:button.save')}
          </Button>
        </>
      }
    >
      {isFetching || isLoading ? (
        <CircularLoader size="lg" containerClassName="h-52" />
      ) : (
        <div className="flex flex-col gap-y-3 items-center">
          <Preview preview={preview} onUploadPreview={handleUploadPreview} />
          <div className="flex flex-wrap justify-between gap-1 md:gap-2">
            {[...(previews ?? []), ...uploadedPreviews].map(item => (
              <ImageCard
                key={item.id}
                staticField={item}
                onClick={handleSelect}
                isSelected={preview?.id == item.id}
              />
            ))}
          </div>
        </div>
      )}
    </DialogAdapter>
  );
};
