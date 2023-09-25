import { OutputData } from '@editorjs/editorjs';

export const checkBlocksLength = (
  data: OutputData,
  requiredBlocksLength: number = 5
): boolean => {
  const blockLength = data.blocks.reduce((sum, block) => {
    if (block.data.text?.length) sum++;
    return sum;
  }, 0);
  return blockLength >= requiredBlocksLength;
};
