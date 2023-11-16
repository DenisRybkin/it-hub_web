// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import i18next from 'i18next';

export const delimiterPlugin: ToolConstructable | ToolSettings = {
  class: Delimiter,
};
