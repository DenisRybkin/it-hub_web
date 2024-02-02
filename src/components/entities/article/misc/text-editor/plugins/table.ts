// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import Table from '@editorjs/table';

export const tablePlugin: ToolConstructable | ToolSettings = {
  class: Table,
  inlineToolbar: true,
};
