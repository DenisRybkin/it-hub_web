// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import List from '@editorjs/list';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { IconListBulleted, IconListNumbered } from '@codexteam/icons';

export const listOrderedPlugin: ToolConstructable | ToolSettings = {
  class: List,
  inlineToolbar: true,
  toolbox: {
    title: 'List ordered',
    icon: IconListNumbered,
  },
};
