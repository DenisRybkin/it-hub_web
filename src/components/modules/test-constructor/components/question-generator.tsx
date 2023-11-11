import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { IdGenerator } from '@lib/utils/tools';
import {
  changeAnswersIsRight,
  changeAnswerName,
  changeQuestionName,
  deleteAnswersByQuestionId,
  deleteQuestion,
  getAnswersByQuestionId,
  setAnswersByQuestionId,
} from '@components/modules/test-constructor/utils';
import { Button } from '@components/ui/button';
import { Question } from '@components/modules/test-constructor/components/question';
import {
  AnswerDto,
  QuestionDto,
} from '@components/modules/test-constructor/types';

export interface IQuestionGeneratorForwardRef {
  questions: QuestionDto[];
  hasChanges: boolean;
}

interface IQuestionGeneratorProps {
  isEditMode?: boolean;
  noImmediatelyCreateQuestion?: boolean;
  onChangeHasChanges?: (value: boolean) => void;
  defaultValue?: QuestionDto[];
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

  const isDisabledAddQuestionButton = useMemo(
    () =>
      !questions.length
        ? false
        : !questions[questions.length - 1].answers?.length,
    [questions]
  );

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
    <div className="h-full w-full">
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
      <div className="flex justify-start items-center mt-2">
        <Button
          variant="primary"
          disabled={isDisabledAddQuestionButton}
          onClick={handleCreateQuestion}
        >
          {t('ui:button.add_question')}
        </Button>
      </div>
    </div>
  );
});
