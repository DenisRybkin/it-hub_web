import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IUseCopyToClipboardProps {
  onError?: (error: unknown) => void;
  onSuccess?: (text: string) => void;
  params?: IUseCopyToClipboardPropsParams;
}

// TODO: add notifier

interface IUseCopyToClipboardPropsParams {
  preventDefaultErrorsNotifier?: boolean;
  preventDefaultSuccessNotifier?: boolean;
}

export const useClipboard = (
  props?: IUseCopyToClipboardProps
): [(text: string) => Promise<boolean>, string | null] => {
  //const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      !props?.params?.preventDefaultErrorsNotifier &&
        props?.onError &&
        props.onError(new Error('navigator.clipboard does not exist'));
      return false;
    }

    if (
      (
        await navigator.permissions.query({
          name: 'clipboard-read' as PermissionName,
        })
      )?.state == 'denied'
    ) {
      !props?.params?.preventDefaultErrorsNotifier &&
        props?.onError &&
        props.onError(new Error('forbidden'));
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      props?.onSuccess && props.onSuccess(text);
      return true;
    } catch (error: unknown) {
      props?.onError && props.onError?.(error);
      setCopiedText(null);
      return false;
    }
  };

  return [copy, copiedText];
};
