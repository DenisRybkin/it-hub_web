import {
  AnswerDto,
  AnswerWithoutIdDto,
  QuestionDto,
  QuestionWithoutIdDto,
} from '@components/entities/test/common/types';
import { TestValidationErrorKeys } from '@components/entities/test/misc/test-constructor/constants';

export const identifyQuestionType = (
  question: QuestionDto
): 'single_answer' | 'multiple_answers' =>
  question.answers.filter(item => item.isRight).length > 1
    ? 'multiple_answers'
    : 'single_answer';

export const resetIsRightQuestion = (questions: QuestionDto[]): QuestionDto[] =>
  questions.map(item => ({
    ...item,
    answers: item.answers.map(item => ({ ...item, isRight: false })),
  }));

const getRightAnswers = (question: QuestionDto): AnswerDto[] =>
  question.answers.filter(item => item.isRight);

export const comparisonAnswers = (
  originQuestions: QuestionDto[],
  stateQuestions: QuestionDto[]
): boolean => {
  for (const originalQuestion of originQuestions) {
    const stateQuestion = stateQuestions.find(
      item => item.id == originalQuestion.id
    );
    if (!stateQuestion) return false;
    const originalRightAnswersId = getRightAnswers(originalQuestion).map(
      item => item.id
    );
    const stateRightAnswersId = getRightAnswers(stateQuestion).map(
      item => item.id
    );
    if (
      originalRightAnswersId.sort().toString() !=
      stateRightAnswersId.sort().toString()
    )
      return false;
  }
  return true;
};

export const changeQuestionName = (
  prevQuestions: QuestionDto[],
  newName: string,
  id: number
): QuestionDto[] =>
  prevQuestions.map(item =>
    item.id == id ? { ...item, name: newName } : item
  );

export const deleteQuestion = (
  prevQuestions: QuestionDto[],
  questionId: number
): QuestionDto[] => prevQuestions.filter(item => item.id != questionId);

export const changeAnswersIsRight = (
  prevAnswers: AnswerDto[],
  isRight: boolean,
  id: number
): AnswerDto[] =>
  prevAnswers.map(item =>
    item.id == id ? { ...item, isRight: isRight } : item
  );

export const swapAnswersIsRight = (
  prevAnswers: AnswerDto[],
  id: number
): AnswerDto[] =>
  prevAnswers.map(item =>
    item.id == id ? { ...item, isRight: true } : { ...item, isRight: false }
  );

export const changeAnswerName = (
  prevAnswers: AnswerDto[],
  newName: string,
  id: number
): AnswerDto[] => {
  return prevAnswers.map(item =>
    item.id == id ? { ...item, name: newName } : item
  );
};

export const deleteAnswersByQuestionId = (
  questionId: number,
  questions: QuestionDto[],
  deleteAnswerId: number
): QuestionDto[] =>
  questions.map(question =>
    question.id == questionId
      ? {
          ...question,
          answers: question?.answers?.filter(
            item => item.id !== deleteAnswerId
          ),
        }
      : question
  );

export const setAnswersByQuestionId = (
  questionId: number,
  questions: QuestionDto[],
  newAnswers: AnswerDto[]
): QuestionDto[] =>
  questions.map(question =>
    question.id == questionId ? { ...question, answers: newAnswers } : question
  );

export const getAnswersByQuestionId = (
  questionId: number,
  questions: QuestionDto[]
): AnswerDto[] =>
  questions.find(question => question.id == questionId)?.answers ?? [];

export const resetIds = (questions: QuestionDto[]): QuestionWithoutIdDto[] =>
  questions.map(item => ({
    name: item.name,
    answers: removeAnswerIds(item.answers ?? []),
  }));

const removeAnswerIds = (answers: AnswerDto[]): AnswerWithoutIdDto[] =>
  answers.map(({ questionId, isRight, name }) => ({ name, isRight }));

export const validateTest = (questions?: QuestionDto[]) => {
  if (questions && questions.length > 0 && questions.length < 3)
    throw new Error(TestValidationErrorKeys.NO_COMPLETE_TEST);
  questions?.forEach(question => {
    if (!question.name || question.name.trim().length == 0)
      throw Error(TestValidationErrorKeys.NO_NAME_QUESTION);

    if (!question.answers || question.answers.length < 2)
      throw Error(TestValidationErrorKeys.NO_ANSWERS);

    let countRightsAnswers = 0;
    question.answers.forEach(answer => {
      if (answer.isRight) countRightsAnswers += 1;
      if (!answer.name || answer.name.trim().length === 0)
        throw Error(TestValidationErrorKeys.NO_NAME_ANSWER);
    });
    if (countRightsAnswers == 0)
      throw Error(TestValidationErrorKeys.NO_RIGHTS_ANSWER);
  });
};
