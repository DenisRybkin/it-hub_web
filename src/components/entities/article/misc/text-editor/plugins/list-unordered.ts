import { IconListBulleted } from '@codexteam/icons';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import List from '@editorjs/list';

export const listUnorderedPlugin: ToolConstructable | ToolSettings = {
  class: List,
  inlineToolbar: true,
  config: {
    defaultStyle: 'unordered',
  },
  toolbox: {
    title: 'List unordered',
    icon: IconListBulleted,
  },
};
