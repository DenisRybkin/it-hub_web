import { IconH1, IconH2, IconH3 } from '@codexteam/icons';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';
import Header from '@editorjs/header';

export const headerPlugin: ToolConstructable | ToolSettings = {
  class: Header as unknown as ToolConstructable,
  config: {
    placeholder: 'Enter a header',
    levels: [1, 2, 3],
    defaultLevel: 1,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toolbox: [
    {
      icon: IconH1,
      title: 'Heading 1',
      data: {
        level: 1,
      },
    },
    {
      icon: IconH2,
      title: 'Heading 2',
      data: {
        level: 2,
      },
    },
    {
      icon: IconH3, // icon for H3,
      title: 'Heading 3',
      data: {
        level: 3,
      },
    },
  ],
};
