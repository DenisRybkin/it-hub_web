import { checkListPlugin } from '@components/entities/article/misc/text-editor/plugins/check-list';
import { CodePlugin } from '@components/entities/article/misc/text-editor/plugins/code';
import { delimiterPlugin } from '@components/entities/article/misc/text-editor/plugins/delimiter';
import { headerPlugin } from '@components/entities/article/misc/text-editor/plugins/heading';
import { imagePlugin } from '@components/entities/article/misc/text-editor/plugins/image';
import { listOrderedPlugin } from '@components/entities/article/misc/text-editor/plugins/list-ordered';
import { listUnorderedPlugin } from '@components/entities/article/misc/text-editor/plugins/list-unordered';
import { quotePlugin } from '@components/entities/article/misc/text-editor/plugins/quote';
import { tablePlugin } from '@components/entities/article/misc/text-editor/plugins/table';
import { warningPlugin } from '@components/entities/article/misc/text-editor/plugins/warning';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { UnderlineInlineTool } from 'editorjs-inline-tool';

export const plugins: Record<string, ToolConstructable | ToolSettings> = {
  header: headerPlugin,
  table: tablePlugin,
  checklist: checkListPlugin,
  code: CodePlugin as unknown as ToolConstructable,
  listOrdered: listOrderedPlugin,
  listUnordered: listUnorderedPlugin,
  warning: warningPlugin,
  delimiter: delimiterPlugin,
  underline: UnderlineInlineTool,
  image: imagePlugin,
  quote: quotePlugin,
};
