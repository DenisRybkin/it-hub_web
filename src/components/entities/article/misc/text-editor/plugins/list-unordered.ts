// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import List from '@editorjs/list';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { ListOrdered } from 'lucide-react';
import { IconListBulleted } from '@codexteam/icons';

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
