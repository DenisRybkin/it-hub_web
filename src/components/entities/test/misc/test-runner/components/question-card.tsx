import { QuestionDto } from '@components/entities/test/common/types';
import { identifyQuestionType } from '@components/entities/test/common/utils';
import { Checkbox } from '@components/ui/checkbox';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { cn } from '@lib/utils/tools';

interface IQuestionCardProps {
  index: number;
  originalQuestion: QuestionDto;
  questionState: QuestionDto;
  onChangeSingleAnswer: (questionId: number, answerId: number) => void;
  onChangeMultipleAnswer: (
    isRight: boolean,
    questionId: number,
    answerId: number
  ) => void;
}

export const QuestionCard = (props: IQuestionCardProps) => {
  const questionType = identifyQuestionType(props.originalQuestion);

  const changeMultipleAnswerHandler =
    (answerId: number) => (newValue: boolean) =>
      props.onChangeMultipleAnswer(newValue, props.questionState.id, answerId);

  const changeSingleAnswerHandler = (stringId: string) =>
    props.onChangeSingleAnswer(props.questionState.id, +stringId);

  return (
    <div className="space-y-4">
      <h1 className="text-body-bold">{props.originalQuestion.name}</h1>
      <div className={cn(questionType == 'single_answer' && 'space-y-2')}>
        {props.questionState.answers.map(answer => (
          <div key={answer.id}>
            {questionType == 'multiple_answers' ? (
              <div key={answer.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={answer.isRight}
                  id={String(answer.questionId)}
                  onCheckedChange={changeMultipleAnswerHandler(answer.id)}
                />
                <label
                  htmlFor={String(answer.id)}
                  className="text-base-regular"
                >
                  {answer.name}
                </label>
              </div>
            ) : (
              <RadioGroup
                value={props.questionState.answers
                  .find(item => item.isRight)
                  ?.id.toString()}
                onValueChange={changeSingleAnswerHandler}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={answer.id.toString()}
                    id={answer.id.toString()}
                  />
                  <Label htmlFor={answer.id.toString()}>{answer.name}</Label>
                </div>
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
