import { Ref, useRef } from 'react';
import { TestConstructor } from '@components/modules/test-constructor';
import { ITestConstructorForwardRef } from '@components/modules/test-constructor/test-constructor';

export const LatestPage = () => {
  const ref = useRef<ITestConstructorForwardRef>();

  console.log(ref.current?.getAndValidateData);

  return <TestConstructor ref={ref as Ref<ITestConstructorForwardRef>} />;
};
