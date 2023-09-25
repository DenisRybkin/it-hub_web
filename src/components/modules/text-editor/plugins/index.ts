import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import { headerPlugin } from '@components/modules/text-editor/plugins/heading';
import { tablePlugin } from '@components/modules/text-editor/plugins/table';
import { checkListPlugin } from '@components/modules/text-editor/plugins/check-list';
import { CodePlugin } from '@components/modules/text-editor/plugins/code';
import { ItalicInlineTool, UnderlineInlineTool } from 'editorjs-inline-tool';
import { listOrderedPlugin } from '@components/modules/text-editor/plugins/list-ordered';
import { warningPlugin } from '@components/modules/text-editor/plugins/warning';
import { delimiterPlugin } from '@components/modules/text-editor/plugins/delimiter';
import { imagePlugin } from '@components/modules/text-editor/plugins/image';
import { IconListNumbered } from '@codexteam/icons';
import { API } from '@editorjs/editorjs';
import { ToolConfig } from '@editorjs/editorjs/types/tools/tool-config';
import { BlockToolData } from '@editorjs/editorjs/types/tools/block-tool-data';
import { listUnorderedPlugin } from '@components/modules/text-editor/plugins/list-unordered';
import { quotePlugin } from '@components/modules/text-editor/plugins/quote';

export const plugins: Record<string, ToolConstructable | ToolSettings> = {
  header: headerPlugin,
  table: tablePlugin,
  checklist: checkListPlugin,
  code: CodePlugin as ToolConstructable,
  listOrdered: listOrderedPlugin,
  listUnordered: listUnorderedPlugin,
  warning: warningPlugin,
  delimiter: delimiterPlugin,
  underline: UnderlineInlineTool,
  image: imagePlugin,
  quote: quotePlugin,
};
