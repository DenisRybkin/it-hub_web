// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IconListBulleted, IconListNumbered } from '@codexteam/icons';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import List from '@editorjs/list';

export const listOrderedPlugin: ToolConstructable | ToolSettings = {
  class: List,
  inlineToolbar: true,
  toolbox: {
    title: 'List ordered',
    icon: IconListNumbered,
  },
};
