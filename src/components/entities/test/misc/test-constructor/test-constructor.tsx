import {
  QuestionDto,
  QuestionWithoutIdDto,
} from '@components/entities/test/common/types';
import { resetIds, validateTest } from '@components/entities/test/common/utils';
import type { IQuestionGeneratorForwardRef } from '@components/entities/test/misc/test-constructor/components/question-generator';
import { QuestionGenerator } from '@components/entities/test/misc/test-constructor/components/question-generator';
import { TestValidationErrorKeys } from '@components/entities/test/misc/test-constructor/constants';
import { toast } from '@components/ui/use-toast';
import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface ITestConstructorForwardRef {
  getAndValidateData: () => QuestionWithoutIdDto[] | undefined | null;
}

interface ITestConstructorProps {
  isEditMode?: boolean;
  noImmediatelyCreateQuestion?: boolean;
  defaultValue?: QuestionDto[];
  onChangeHasChanges?: (value: boolean) => void;
  getTopic: () => Promise<string>;
}

export const TestConstructor = forwardRef<
  ITestConstructorForwardRef,
  ITestConstructorProps
>((props, ref) => {
  const { t } = useTranslation();

  const questionGeneratorRef = useRef<IQuestionGeneratorForwardRef>();

  const errorHandler = (error: string) => {
    switch (error) {
      case TestValidationErrorKeys.NO_COMPLETE_TEST:
        toast({
          title: t('validation:error.no_complete_test'),
          variant: 'destructive',
        });
        break;
      case TestValidationErrorKeys.NO_ANSWERS:
        toast({
          title: t('validation:error.no_answers'),
          variant: 'destructive',
        });
        break;
      case TestValidationErrorKeys.NO_RIGHTS_ANSWER:
        toast({
          title: t('validation:error.no_rights_answer'),
          variant: 'destructive',
        });
        break;
      case TestValidationErrorKeys.NO_NAME_ANSWER:
        toast({
          title: t('validation:error.no_name_answer'),
          variant: 'destructive',
        });
        break;
      case TestValidationErrorKeys.NO_NAME_QUESTION:
        toast({
          title: t('validation:error.no_name_question'),
          variant: 'destructive',
        });
        break;
    }
  };

  const handleGetAndValidateData = () => {
    try {
      validateTest(questionGeneratorRef.current?.questions);
      return resetIds(questionGeneratorRef.current?.questions ?? []);
    } catch (e) {
      errorHandler((e as Error).message);
      return null;
    }
  };

  useImperativeHandle<ITestConstructorForwardRef, ITestConstructorForwardRef>(
    ref,
    () => ({
      getAndValidateData: handleGetAndValidateData,
    })
  );

  return (
    <>
      <QuestionGenerator
        getTopic={props.getTopic}
        ref={questionGeneratorRef as Ref<IQuestionGeneratorForwardRef>}
      />
    </>
  );
});
