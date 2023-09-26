// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageTool from '@editorjs/image';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import i18next from 'i18next';
import { LocaleStorageKeys } from '@lib/constants';

export const imagePlugin: ToolConstructable | ToolSettings = {
  class: ImageTool,
  config: {
    endpoints: {
      byFile: import.meta.env.VITE_API_BASE_URL + 'api/static-field/editor-js',
    },
    field: 'image',
    types: 'image/*',
    additionalRequestHeaders: {
      authorization: `Bearer ${localStorage.getItem(LocaleStorageKeys.JWT)}`,
    },
    // uploader: {
    //   async uploadByFile(file: FormData) {
    //     console.log(1111, file);
    //     const response = await api.staticField.upload(file, null, error => {
    //       toast({
    //         variant: 'destructive',
    //         title: i18next.t(
    //           error.response?.data?.message ?? 'toast:error.default'
    //         ),
    //       });
    //       return null;
    //     });
    //     if (response)
    //       return {
    //         success: 1,
    //         file: {
    //           url: response.url,
    //         },
    //       };
    //   },
    // },
  },
};
