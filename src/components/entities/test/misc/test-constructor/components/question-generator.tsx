import {
  AnswerDto,
  QuestionDto,
  QuestionWithoutIdDto,
} from '@components/entities/test/common/types';
import {
  changeAnswerName,
  changeAnswersIsRight,
  changeQuestionName,
  deleteAnswersByQuestionId,
  deleteQuestion,
  getAnswersByQuestionId,
  setAnswersByQuestionId,
} from '@components/entities/test/common/utils';
import { GenerateQuestionsDrawer } from '@components/entities/test/drawers/generate-test';
import { Question } from '@components/entities/test/misc/test-constructor/components/question';
import { Button } from '@components/ui/button';
import { TooltipAdapter } from '@components/ui/tooltip';
import { IdGenerator } from '@lib/utils/tools';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';
import { RiAiGenerate } from 'react-icons/ri';

export interface IQuestionGeneratorForwardRef {
  questions: QuestionDto[];
  hasChanges: boolean;
}

interface IQuestionGeneratorProps {
  isEditMode?: boolean;
  noImmediatelyCreateQuestion?: boolean;
  onChangeHasChanges?: (value: boolean) => void;
  defaultValue?: QuestionDto[];
  getTopic: () => Promise<string>;
}

const questionIdQuestionGenerator = new IdGenerator(1);
const answerIdAnswerGenerator = new IdGenerator(1);

export const QuestionGenerator = forwardRef<
  IQuestionGeneratorForwardRef,
  IQuestionGeneratorProps
>((props, ref) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const [isOpenGenerateQuestionsDrawer, setIsOpenGenerateQuestionsDrawer] =
    useState<boolean>(false);

  const isDisabledAddQuestionButton = useMemo(
    () =>
      !questions.length
        ? false
        : !questions[questions.length - 1].answers?.length,
    [questions]
  );

  const handleOpenGenerateQuestionsDrawer = () =>
    setIsOpenGenerateQuestionsDrawer(true);

  const handleMarkChanges = () => !hasChanges && setHasChanges(true);

  const handleDeleteQuestion = (id: number) => {
    setQuestions(prev => deleteQuestion(prev, id));
    handleMarkChanges();
  };

  const handleCreateQuestion = () => {
    const emptyQuestion: QuestionDto = {
      id: questionIdQuestionGenerator.getId,
      name: '',
      answers: [],
    };
    setQuestions(prev => [...prev, emptyQuestion]);
    handleMarkChanges();
  };

  const handleChangeQuestionName = (title: string, id: number) => {
    setQuestions(prev => changeQuestionName(prev, title, id));
    handleMarkChanges();
  };

  const handleAppendAnswer = (questionId: number, newAnswer: AnswerDto) => {
    setQuestions(prev =>
      setAnswersByQuestionId(questionId, prev, [
        ...getAnswersByQuestionId(questionId, prev),
        newAnswer,
      ])
    );
    handleMarkChanges();
  };

  const handleDeleteAnswer = (questionId: number, answerId: number) => {
    setQuestions(prev => deleteAnswersByQuestionId(questionId, prev, answerId));
    handleMarkChanges();
  };

  const handleChangeAnswerTitle = (
    title: string,
    questionId: number,
    answerId: number
  ) => {
    setQuestions(prev => {
      const currentAnswers = getAnswersByQuestionId(questionId, prev);
      const updatedAnswers = changeAnswerName(currentAnswers, title, answerId);
      return setAnswersByQuestionId(questionId, prev, updatedAnswers);
    });
    handleMarkChanges();
  };

  const handleChangeAnswerRight = (
    isRight: boolean,
    questionId: number,
    answerId: number
  ) => {
    setQuestions(prev => {
      const currentAnswers = getAnswersByQuestionId(questionId, prev);
      const updatedAnswers = changeAnswersIsRight(
        currentAnswers,
        isRight,
        answerId
      );
      return setAnswersByQuestionId(questionId, prev, updatedAnswers);
    });
    handleMarkChanges();
  };

  const handleAddGeneratedQuestions = (DTOs: QuestionWithoutIdDto[]) =>
    setQuestions(prev => [
      ...prev,
      ...DTOs.map(question => {
        const questionId = questionIdQuestionGenerator.getId;
        return {
          id: questionId,
          name: question.name,
          answers: question.answers.map(answer => ({
            id: answerIdAnswerGenerator.getId,
            questionId: questionId,
            ...answer,
          })),
        };
      }),
    ]);

  const handleAddEmptyAnswer = (questionId: number) => {
    const emptyAnswer: AnswerDto = {
      id: answerIdAnswerGenerator.getId,
      name: '',
      questionId: questionId,
      isRight: false,
    };
    handleAppendAnswer(questionId, emptyAnswer);
    handleMarkChanges();
  };

  useImperativeHandle<
    IQuestionGeneratorForwardRef,
    IQuestionGeneratorForwardRef
  >(
    ref,
    () => ({
      questions: questions,
      hasChanges: hasChanges,
    }),
    [questions, hasChanges]
  );

  useEffect(() => {
    props.onChangeHasChanges?.(hasChanges);
  }, [hasChanges]);

  return (
    <>
      <GenerateQuestionsDrawer
        isOpen={isOpenGenerateQuestionsDrawer}
        getTopic={props.getTopic}
        onOpenChange={setIsOpenGenerateQuestionsDrawer}
        onAddQuestions={handleAddGeneratedQuestions}
      />
      <div className="w-full">
        <div className="flex flex-col gap-2 items-start">
          {questions.map(item => (
            <Question
              key={item.id}
              name={item.name}
              questionId={item.id}
              answers={item.answers ?? []}
              onChangeQuestionName={handleChangeQuestionName}
              onDeleteQuestion={handleDeleteQuestion}
              onAddEmptyAnswer={handleAddEmptyAnswer}
              onChangeAnswerRight={handleChangeAnswerRight}
              onChangeAnswerTitle={handleChangeAnswerTitle}
              onDeleteAnswer={handleDeleteAnswer}
            />
          ))}
        </div>
        <div className="flex justify-start items-center mt-2 gap-2">
          <Button
            variant="primary"
            disabled={isDisabledAddQuestionButton}
            onClick={handleCreateQuestion}
            data={{ leftIcon: <FiPlus /> }}
          >
            {t('ui:button.add_question')}
          </Button>
          <TooltipAdapter
            trigger={
              <Button
                variant="primary"
                disabled={isDisabledAddQuestionButton}
                onClick={handleOpenGenerateQuestionsDrawer}
                data={{ leftIcon: <RiAiGenerate /> }}
              >
                {t('ui:button.generate')}
              </Button>
            }
          >
            <p>{t('ui:tooltip.gpt-generate')}</p>
          </TooltipAdapter>
        </div>
      </div>
    </>
  );
});
