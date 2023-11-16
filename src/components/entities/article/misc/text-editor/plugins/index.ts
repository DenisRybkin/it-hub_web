import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { headerPlugin } from '@components/entities/article/misc/text-editor/plugins/heading';
import { tablePlugin } from '@components/entities/article/misc/text-editor/plugins/table';
import { checkListPlugin } from '@components/entities/article/misc/text-editor/plugins/check-list';
import { CodePlugin } from '@components/entities/article/misc/text-editor/plugins/code';
import { UnderlineInlineTool } from 'editorjs-inline-tool';
import { listOrderedPlugin } from '@components/entities/article/misc/text-editor/plugins/list-ordered';
import { warningPlugin } from '@components/entities/article/misc/text-editor/plugins/warning';
import { delimiterPlugin } from '@components/entities/article/misc/text-editor/plugins/delimiter';
import { imagePlugin } from '@components/entities/article/misc/text-editor/plugins/image';
import { listUnorderedPlugin } from '@components/entities/article/misc/text-editor/plugins/list-unordered';
import { quotePlugin } from '@components/entities/article/misc/text-editor/plugins/quote';

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
