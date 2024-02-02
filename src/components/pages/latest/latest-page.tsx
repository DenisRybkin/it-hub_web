import { HashtagsEditor } from '@components/entities/hashtag/misc/hashtags-editor/hashtags-editor';
//import { TestConstructor } from '@components/entities/article/misc/test-constructor';
import { ITestConstructorForwardRef } from '@components/entities/test/misc/test-constructor/test-constructor';
import { LinearLoader } from '@components/ui/loader';
import React, { Ref, useRef } from 'react';

export const LatestPage = () => {
  const ref = useRef<ITestConstructorForwardRef>();

  return (
    <>
      {/*<div className="fixed w-full h-[12vh] left-0 top-[72px] md:top-20 bg-slate-900" />*/}
      {/*<TestConstructor ref={ref as Ref<ITestConstructorForwardRef>} />*/}
      <HashtagsEditor />
      <div className="group"></div>
    </>
  );
};
