import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CheckList from '@editorjs/checklist';
import i18next from 'i18next';
import { IconChecklist } from '@codexteam/icons';

export const checkListPlugin: ToolConstructable | ToolSettings = {
  class: CheckList,
  inlineToolbar: true,
};
