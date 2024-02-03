import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Table from '@editorjs/table';

export const tablePlugin: ToolConstructable | ToolSettings = {
  class: Table,
  inlineToolbar: true,
};
