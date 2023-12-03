import { QuestionDto } from '@components/entities/test/misc/common/types';
import { useState } from 'react';
import { QuestionCard } from '@components/entities/test/misc/test-runner/components/question-card';
import { SwitchableRender } from '@components/shared/switchable-render';
import { useTranslation } from 'react-i18next';
import { Button } from '@components/ui/button';
import {
  changeAnswersIsRight,
  comparisonAnswers,
  getAnswersByQuestionId,
  resetIsRightQuestion,
  setAnswersByQuestionId,
  swapAnswersIsRight,
} from '@components/entities/test/misc/common/utils';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import { SuccessState } from '@components/entities/test/misc/test-runner/components/success-state';
import { FailedState } from '@components/entities/test/misc/test-runner/components/failed-state';
import { useMutation } from '@tanstack/react-query';

interface ITestRunnerProps {
  articleId: number;
  isPassed?: boolean;
  questions: QuestionDto[];
}

export const TestRunner = (props: ITestRunnerProps) => {
  const { t } = useTranslation();
  const [isRun, setIsRun] = useState<boolean>(false);
  const [questionsState, setQuestionsState] = useState<QuestionDto[]>(
    resetIsRightQuestion(props.questions)
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(props.isPassed ?? false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const passTestMutation = useMutation({
    mutationKey: [api.article.toString(), props.articleId],
    mutationFn: async () =>
      await api.article.passTest(props.articleId, handleSuccess, handleError),
  });

  const handleRun = () => setIsRun(true);
  const handleStop = () => setIsRun(false);

  const handleSuccess = () => setIsSuccess(true);

  const handleError = () =>
    toast({
      title: t('toast:error.default'),
      variant: 'destructive',
    });

  const handleRetry = () => {
    setQuestionsState(resetIsRightQuestion(props.questions));
    setIsSuccess(false);
    setIsFailed(false);
    setIsRun(true);
  };

  const handleFinish = async () => {
    const passResult = comparisonAnswers(props.questions, questionsState);
    if (passResult) {
      await passTestMutation.mutate();
    } else setIsFailed(true);
    handleStop();
  };

  const handleChangeMultipleAnswer = (
    isRight: boolean,
    questionId: number,
    answerId: number
  ) =>
    setQuestionsState(prev => {
      const currentAnswers = getAnswersByQuestionId(questionId, prev);
      const updatedAnswers = changeAnswersIsRight(
        currentAnswers,
        isRight,
        answerId
      );
      return setAnswersByQuestionId(questionId, prev, updatedAnswers);
    });

  const handleChangeSingleAnswer = (questionId: number, answerId: number) =>
    setQuestionsState(prev => {
      const currentAnswers = getAnswersByQuestionId(questionId, prev);
      const updatedAnswers = swapAnswersIsRight(currentAnswers, answerId);
      return setAnswersByQuestionId(questionId, prev, updatedAnswers);
    });

  if (isSuccess) return <SuccessState />;
  if (isFailed) return <FailedState onRetry={handleRetry} />;

  //if (props.inPassed) return null;

  const questionRenders = questionsState.map((item, index) => (
    <QuestionCard
      key={item.id}
      index={index}
      originalQuestion={
        props.questions.find(question => question.id == item.id)!
      }
      questionState={item}
      onChangeMultipleAnswer={handleChangeMultipleAnswer}
      onChangeSingleAnswer={handleChangeSingleAnswer}
    />
  ));

  return (
    <div className="p-3 md:p-7 bg-dark-2 rounded-xl">
      {isRun ? (
        <SwitchableRender renders={questionRenders} onFinish={handleFinish} />
      ) : (
        <div className="flex flex-col items-center justify-between gap-2">
          <h1 className="text-body-bold">{t('ui:title.take_test')}</h1>
          <Button onClick={handleRun} variant="primary">
            {t('ui:button.start')}
          </Button>
        </div>
      )}
    </div>
  );
};
