import { Ref, useRef } from 'react';
import { TestConstructor } from '@components/modules/test-constructor';
import { ITestConstructorForwardRef } from '@components/modules/test-constructor/test-constructor';
import { HashtagsEditor } from '@components/modules/hashtags-editor/hashtags-editor';
import { CoverImage } from '@components/shared/cover-image/cover-image';

export const LatestPage = () => {
  const ref = useRef<ITestConstructorForwardRef>();

  return (
    <>
      <CoverImage />
      {/*<div className="fixed w-full h-[12vh] left-0 top-[72px] md:top-20 bg-slate-900" />*/}
      <TestConstructor ref={ref as Ref<ITestConstructorForwardRef>} />
      <HashtagsEditor />
      <div className="group"></div>
    </>
  );
};
