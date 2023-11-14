import { Ref, useRef } from 'react';
import { TestConstructor } from '@components/modules/test-constructor';
import { ITestConstructorForwardRef } from '@components/modules/test-constructor/test-constructor';
import { HashtagsEditor } from '@components/modules/hashtags-editor/hashtags-editor';

export const LatestPage = () => {
  const ref = useRef<ITestConstructorForwardRef>();

  return (
    <>
      <TestConstructor ref={ref as Ref<ITestConstructorForwardRef>} />
      <HashtagsEditor />
    </>
  );
};
