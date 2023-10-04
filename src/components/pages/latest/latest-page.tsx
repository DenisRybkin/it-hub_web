import { Ref, useRef } from 'react';
import { ExaminationConstructor } from '@components/modules/examination-constructor';
import { IExaminationConstructorForwardRef } from '@components/modules/examination-constructor/examination-constructor';

export const LatestPage = () => {
  const ref = useRef<IExaminationConstructorForwardRef>();

  console.log(ref.current?.getAndValidateData);

  return (
    <ExaminationConstructor
      ref={ref as Ref<IExaminationConstructorForwardRef>}
    />
  );
};
