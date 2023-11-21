import React, { Ref, useRef } from 'react';
import { TestConstructor } from '@components/entities/article/misc/test-constructor';
import { ITestConstructorForwardRef } from '@components/entities/article/misc/test-constructor/test-constructor';
import { HashtagsEditor } from '@components/entities/hashtag/misc/hashtags-editor/hashtags-editor';
import { LinearLoader } from '@components/ui/loader';

export const LatestPage = () => {
  const ref = useRef<ITestConstructorForwardRef>();

  return (
    <>
      {/*<div className="fixed w-full h-[12vh] left-0 top-[72px] md:top-20 bg-slate-900" />*/}
      <TestConstructor ref={ref as Ref<ITestConstructorForwardRef>} />
      <HashtagsEditor />
      <div className="group"></div>
    </>
  );
};
