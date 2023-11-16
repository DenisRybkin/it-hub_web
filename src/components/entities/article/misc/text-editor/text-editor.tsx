import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { EditorInstance } from '@components/entities/article/misc/text-editor/instance';
import { plugins } from '@components/entities/article/misc/text-editor/plugins';
import { useTranslation } from 'react-i18next';
import { OutputData } from '@editorjs/editorjs';
import { EditorCore } from '@react-editor-js/core/src/editor-core';
import { cn } from '@lib/utils/tools';
import { withHeadingTemplate } from '@components/entities/article/misc/text-editor/templates';

interface ITextEditorProps {
  readonly?: boolean;
  value?: OutputData;
  withHeading?: boolean;
  autofocus?: boolean;
}

export interface ITextEditorForwardRef {
  onGetData: () => Promise<OutputData | undefined>;
  isLoading: boolean;
}

export const TextEditor = forwardRef<ITextEditorForwardRef, ITextEditorProps>(
  (props, ref) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const editorCore = React.useRef<EditorCore | null>(null);

    const handleInitialize = React.useCallback(
      (instance: EditorCore) => {
        if (editorCore.current) editorCore.current = instance;
        if (props.withHeading)
          instance.render({
            time: new Date().getTime(),
            version: '1.0',
            blocks: [withHeadingTemplate],
          });
      },
      [props.withHeading]
    );

    const handleSave = React.useCallback(async () => {
      setIsLoading(true);
      const savedData = await editorCore?.current?.save();
      setIsLoading(false);
      return savedData;
    }, []);

    const getDefaultValue = React.useCallback(() => {
      if (props.withHeading)
        return {
          time: new Date().getTime(),
          version: '1.0',
          blocks: [withHeadingTemplate],
        };
      return props.value;
    }, [props.withHeading]);

    useImperativeHandle<ITextEditorForwardRef, ITextEditorForwardRef>(
      ref,
      () => ({
        onGetData: handleSave,
        isLoading,
      })
    );

    return (
      <div className={cn(props.readonly && 'text-editor-readonly')}>
        <EditorInstance
          onInitialize={handleInitialize}
          readOnly={props.readonly}
          autofocus={props.autofocus}
          defaultValue={getDefaultValue()}
          placeholder={t('ui:placeholder.enter_something')}
          tools={plugins}
        />
      </div>
    );
  }
);
