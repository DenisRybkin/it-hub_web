import { OutputData } from '@editorjs/editorjs';

export const transform2PreviewMode = (
  data: OutputData,
  countRows: number = 3
): OutputData => ({ ...data, blocks: data.blocks.slice(0, countRows) });
