/**
 * Build styles
 */
import './index.css';

import { IconBrackets } from '@codexteam/icons';
import { API } from '@editorjs/editorjs';
import { BlockToolData } from '@editorjs/editorjs/types/tools/block-tool-data';
import { HTMLPasteEvent } from '@editorjs/editorjs/types/tools/paste-events';
import { ToolConfig } from '@editorjs/editorjs/types/tools/tool-config';
import i18next from 'i18next';

import { getLineStartPosition } from './utils/string';

export class CodePlugin {
  api: API;
  config: ToolConfig;
  readOnly: boolean;
  placeholder: string;
  CSS: Record<string, string>;
  nodes: {
    holder?: HTMLDivElement | null;
    textarea: { textContent: unknown } | null;
  };
  _data?: BlockToolData & { code: unknown };

  static get isReadOnlySupported() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  constructor({
    data,
    config,
    api,
    readOnly,
  }: {
    api: API;
    config: ToolConfig;
    data: BlockToolData & { code: unknown };
    readOnly: boolean;
  }) {
    this.api = api;
    this.readOnly = readOnly;

    this.placeholder = '<code>';

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: 'ce-code',
      textarea: 'ce-code__textarea',
    };

    this.nodes = {
      holder: null,
      textarea: null,
    };

    this.data = {
      code: data.code || '',
    };

    this.nodes.holder = this.drawView();
  }

  drawView() {
    const wrapper = document.createElement('div'),
      textarea = document.createElement('textarea');

    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
    textarea.classList.add(this.CSS.textarea, this.CSS.input);
    textarea.textContent = <string>this.data.code;

    textarea.placeholder = this.placeholder;

    if (this.readOnly) textarea.disabled = true;

    wrapper.appendChild(textarea);

    textarea.addEventListener('keydown', event => {
      switch (event.code) {
        case 'Tab':
          this.tabHandler(event);
          break;
      }
    });

    this.nodes.textarea = textarea;

    return wrapper;
  }

  render() {
    return this.nodes.holder;
  }

  save(codeWrapper: HTMLDivElement) {
    return {
      code: codeWrapper.querySelector('textarea')?.value,
    };
  }

  onPaste(event: HTMLPasteEvent) {
    const content = event.detail.data;

    this.data = {
      code: content.textContent,
    };
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;

    if (this.nodes.textarea) {
      this.nodes.textarea.textContent = data.code;
    }
  }

  static get toolbox() {
    return {
      icon: IconBrackets,
      title: i18next.t('ui:text_editor.code'),
    };
  }

  static get DEFAULT_PLACEHOLDER() {
    return 'Enter a code';
  }

  static get pasteConfig() {
    return {
      tags: ['pre'],
    };
  }

  static get sanitize() {
    return {
      code: true,
    };
  }

  tabHandler(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();

    const textarea = event.target;
    const isShiftPressed = event.shiftKey;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const caretPosition = textarea.selectionStart;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const value = textarea.value;
    const indentation = '  ';

    let newCaretPosition;

    if (!isShiftPressed) {
      newCaretPosition = caretPosition + indentation.length;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      textarea.value =
        value.substring(0, caretPosition) +
        indentation +
        value.substring(caretPosition);
    } else {
      const currentLineStart = getLineStartPosition(value, caretPosition);
      const firstLineChars = value.substr(currentLineStart, indentation.length);

      if (firstLineChars !== indentation) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      textarea.value =
        value.substring(0, currentLineStart) +
        value.substring(currentLineStart + indentation.length);
      newCaretPosition = caretPosition - indentation.length;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    textarea.setSelectionRange(newCaretPosition, newCaretPosition);
  }
}
