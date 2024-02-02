// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IconListBulleted } from '@codexteam/icons';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import List from '@editorjs/list';
import { ListOrdered } from 'lucide-react';

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
