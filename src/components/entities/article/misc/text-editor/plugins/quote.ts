import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Quote from '@editorjs/quote';

export const quotePlugin: ToolConstructable | ToolSettings = {
  class: Quote,
  inlineToolbar: true,
};
