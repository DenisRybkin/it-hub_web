import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { QuestionDto } from '@components/modules/examination-constructor/mock/question-dto';
import { useTranslation } from 'react-i18next';
import { ExaminationValidationErrorKeys } from '@components/modules/examination-constructor/constants';
import { toast } from '@components/ui/use-toast';
import { validateExam } from '@components/modules/examination-constructor/utils';
import type { IQuestionGeneratorForwardRef } from '@components/modules/examination-constructor/components/question-generator';
import { QuestionGenerator } from '@components/modules/examination-constructor/components/question-generator';

export interface IExaminationConstructorForwardRef {
  getAndValidateData: () => QuestionDto[] | undefined;
}

interface IExaminationConstructorProps {
  isEditMode?: boolean;
  noImmediatelyCreateQuestion?: boolean;
  defaultValue?: QuestionDto[];
  onChangeHasChanges?: (value: boolean) => void;
}

export const ExaminationConstructor = forwardRef<
  IExaminationConstructorForwardRef,
  IExaminationConstructorProps
>((props, ref) => {
  const { t } = useTranslation();

  const questionGeneratorRef = useRef<IQuestionGeneratorForwardRef>();

  const errorHandler = (error: string) => {
    switch (error) {
      case ExaminationValidationErrorKeys.NO_COMPLETE_EXAMINATION:
        toast({
          title: t('validation:error.no_complete_examination'),
          variant: 'destructive',
        });
        break;
      case ExaminationValidationErrorKeys.NO_ANSWERS:
        toast({
          title: t('validation:error.no_answers'),
          variant: 'destructive',
        });
        break;
      case ExaminationValidationErrorKeys.NO_RIGHTS_ANSWER:
        toast({
          title: t('validation:error.no_rights_answer'),
          variant: 'destructive',
        });
        break;
      case ExaminationValidationErrorKeys.NO_NAME_ANSWER:
        toast({
          title: t('validation:error.no_name_answer'),
          variant: 'destructive',
        });
        break;
      case ExaminationValidationErrorKeys.NO_NAME_QUESTION:
        toast({
          title: t('validation:error.no_name_question'),
          variant: 'destructive',
        });
        break;
    }
  };

  const handleGetAndValidateData = () => {
    try {
      validateExam(questionGeneratorRef.current?.questions);
      return questionGeneratorRef.current?.questions;
    } catch (e) {
      errorHandler((e as Error).message);
      return undefined;
    }
  };

  useImperativeHandle<
    IExaminationConstructorForwardRef,
    IExaminationConstructorForwardRef
  >(ref, () => ({
    getAndValidateData: handleGetAndValidateData,
  }));

  return (
    <>
      <QuestionGenerator
        ref={questionGeneratorRef as Ref<IQuestionGeneratorForwardRef>}
      />
    </>
  );
});
