import { AuthContext } from '@app/providers/auth';
import { QuestionDto } from '@components/entities/test/common/types';
import {
  changeAnswersIsRight,
  comparisonAnswers,
  getAnswersByQuestionId,
  resetIsRightQuestion,
  setAnswersByQuestionId,
  swapAnswersIsRight,
} from '@components/entities/test/common/utils';
import { FailedState } from '@components/entities/test/misc/test-runner/components/failed-state';
import { QuestionCard } from '@components/entities/test/misc/test-runner/components/question-card';
import { SuccessState } from '@components/entities/test/misc/test-runner/components/success-state';
import { SwitchableRender } from '@components/shared/switchable-render';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import { User } from '@lib/api/models';
import type { ModelWithId } from '@lib/api/types';
import { FilterOption } from '@lib/api/types';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IApiControllerRead } from '../../../../../../../maks-soft/zarechny-admin_web/src/lib/api/interfaces';

interface ITestRunnerProps<U extends ModelWithId, UFilter> {
  isPassed?: boolean;
  questions: QuestionDto[];
  usersWhoPassedController?: IApiControllerRead<U, UFilter>;
  controllerFilter?: FilterOption<UFilter>[];
  model2user?: (model: U) => User;
  onPassTest: () => unknown;
  title?: string;
}

export const TestRunner = <U extends ModelWithId, UFilter>(
  props: ITestRunnerProps<U, UFilter>
) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isRun, setIsRun] = useState<boolean>(false);
  const [questionsState, setQuestionsState] = useState<QuestionDto[]>(
    resetIsRightQuestion(props.questions)
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(props.isPassed ?? false);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const handleRun = () =>
    authContext.isAuth ? setIsRun(true) : authContext.openAuthDialog();
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
    if (passResult) await props.onPassTest();
    else setIsFailed(true);
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

  useEffect(() => {
    if (props.isPassed != isSuccess) setIsSuccess(props.isPassed ?? false);
  }, [props.isPassed]);

  if (
    isSuccess &&
    props.controllerFilter &&
    props.model2user &&
    props.usersWhoPassedController
  )
    return (
      <SuccessState<U, UFilter>
        controllerFilter={props.controllerFilter}
        model2user={props.model2user}
        usersWhoPassedController={props.usersWhoPassedController}
      />
    );
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
          <h1 className="text-body-bold text-center">
            {props.title ?? t('ui:title.take_test')}
          </h1>
          <Button onClick={handleRun} variant="primary">
            {t('ui:button.start')}
          </Button>
        </div>
      )}
    </div>
  );
};
