import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useRef,
} from 'react';
import { bytes2mb, sliceIfLong } from '@lib/utils/tools';
import { toast } from '@components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { api } from '@lib/api/plugins';
import { BaseProcessedError, StaticField } from '@lib/api/models';
import { useControllableState } from '@lib/utils/hooks';

interface IFileUploaderButtonProps {
  children: ReactNode;
  accept?: string;
  maxSizeMb?: number;
  formDataName?: string;
  onSuccess?: (model: StaticField) => void;
  onError?: (error: BaseProcessedError) => void;
  isUploading?: boolean;
  setIsUploading?: Dispatch<SetStateAction<boolean>>;
}

export const FileUploader = (props: IFileUploaderButtonProps) => {
  const [isUploading, setIsUploading] = useControllableState({
    defaultValue: false,
    value: props.isUploading,
    onChange: props.setIsUploading,
  });
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleError = () =>
    toast({
      title: t('toast:error.default'),
      variant: 'destructive',
    });

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file, file.name);
    await api.staticField.upload(
      formData,
      props.onSuccess,
      props.onError ?? handleError
    );
    setIsUploading(false);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const firstFile = event.target.files[0];
    if (props.maxSizeMb && bytes2mb(firstFile.size) > props.maxSizeMb)
      return toast({
        title: t('toast:error.max_file_size', {
          size: props.maxSizeMb,
          name: sliceIfLong(firstFile.name),
        }),
        variant: 'destructive',
      });
    uploadFile(firstFile);
    event.target.value = '';
  };

  const handleTriggerUpload = () => fileInputRef.current?.click();

  return (
    <div onClick={handleTriggerUpload}>
      <input
        className="hidden"
        type="file"
        multiple
        disabled={isUploading}
        onChange={handleUpload}
        accept={props.accept}
        ref={fileInputRef}
      />
      {props.children}
    </div>
  );
};
