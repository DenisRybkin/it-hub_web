import { StaticField } from '@lib/api/models';
import { Scan } from 'lucide-react';
import { Button } from '@components/ui/button';
import { FileUploaderButton } from '@components/entities/static-field/misc/file-uploader-button';
import { useState } from 'react';
import { CircularLoader } from '@components/ui/loader';

interface IPreviewProps {
  preview?: StaticField;
  onUploadPreview: (staticField: StaticField) => void;
}

export const Preview = (props: IPreviewProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center justify-center h-56">
      {props.preview ? (
        <img
          src={props.preview.url}
          className="w-[80%] h-full rounded-lg"
          alt="selected preview"
        />
      ) : (
        <FileUploaderButton
          accept="image/*"
          maxSizeMb={4}
          formDataName="image"
          setIsUploading={setIsLoading}
          onSuccess={props.onUploadPreview}
        >
          {isLoading ? (
            <CircularLoader />
          ) : (
            <Button size="icon" variant="ghost" className="w-auto h-auto p-2.5">
              <Scan size={50} />
            </Button>
          )}
        </FileUploaderButton>
      )}
    </div>
  );
};
