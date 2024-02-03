import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Warning from '@editorjs/warning';

export const warningPlugin: ToolConstructable | ToolSettings = {
  class: Warning,
  inlineToolbar: true,
  shortcut: 'CMD+SHIFT+W',
  config: {
    titlePlaceholder: 'Title',
    messagePlaceholder: 'Message',
  },
};
