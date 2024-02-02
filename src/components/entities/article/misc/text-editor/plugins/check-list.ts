import { IconChecklist } from '@codexteam/icons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CheckList from '@editorjs/checklist';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import i18next from 'i18next';

export const checkListPlugin: ToolConstructable | ToolSettings = {
  class: CheckList,
  inlineToolbar: true,
};
