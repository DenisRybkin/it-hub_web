// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Table from '@editorjs/table';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';

export const tablePlugin: ToolConstructable | ToolSettings = {
  class: Table,
  inlineToolbar: true,
};
