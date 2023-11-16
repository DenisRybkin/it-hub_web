import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Quote from '@editorjs/quote';
import i18next from 'i18next';
import { IconChecklist } from '@codexteam/icons';

export const quotePlugin: ToolConstructable | ToolSettings = {
  class: Quote,
  inlineToolbar: true,
};
