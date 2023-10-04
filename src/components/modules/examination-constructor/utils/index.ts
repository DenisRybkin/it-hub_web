import type { Answer, Question } from '@lib/api/models';
import { ExaminationValidationErrorKeys } from '@components/modules/examination-constructor/constants';

type PartialAnswers = Omit<Answer, 'questionId' | 'id'>;
type PartialQuestions = Omit<Question, 'examinationId' | 'id' | 'answers'> & {
  answers: PartialAnswers[];
};

export const changeQuestionName = (
  prevQuestions: Question[],
  newName: string,
  id: number
): Question[] =>
  prevQuestions.map(item =>
    item.id == id ? { ...item, name: newName } : item
  );

export const deleteQuestion = (
  prevQuestions: Question[],
  questionId: number
): Question[] => prevQuestions.filter(item => item.id != questionId);

export const changeAnswersIsRight = (
  prevAnswers: Answer[],
  isRight: boolean,
  id: number
): Answer[] =>
  prevAnswers.map(item =>
    item.id == id ? { ...item, isRight: isRight } : item
  );

export const changeAnswerName = (
  prevAnswers: Answer[],
  newName: string,
  id: number
): Answer[] => {
  return prevAnswers.map(item =>
    item.id == id ? { ...item, name: newName } : item
  );
};

export const deleteAnswersByQuestionId = (
  questionId: number,
  questions: Question[],
  deleteAnswerId: number
): Question[] =>
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
  questions: Question[],
  newAnswers: Answer[]
): Question[] =>
  questions.map(question =>
    question.id == questionId ? { ...question, answers: newAnswers } : question
  );

export const getAnswersByQuestionId = (
  questionId: number,
  questions: Question[]
): Answer[] =>
  questions.find(question => question.id == questionId)?.answers ?? [];

export const resetIds = (
  questions: Question[]
): (Omit<Question, 'examinationId' | 'id' | 'answers'> & {
  answers: Omit<Answer, 'questionId' | 'id'>[];
})[] =>
  questions.map(item => ({
    name: item.name,
    answers: removeAnswerIds(item.answers ?? []),
  }));

const removeAnswerIds = (answers: Answer[]): PartialAnswers[] =>
  answers.map(({ questionId, isRight, name }) => ({ name, isRight }));

export const validateExam = (questions?: Question[]) => {
  if (!questions || questions.length == 0)
    throw new Error(ExaminationValidationErrorKeys.NO_COMPLETE_EXAMINATION);
  questions.forEach(question => {
    if (!question.name || question.name.trim().length == 0)
      throw Error(ExaminationValidationErrorKeys.NO_NAME_QUESTION);

    if (!question.answers || question.answers.length < 2)
      throw Error(ExaminationValidationErrorKeys.NO_ANSWERS);

    let countRightsAnswers = 0;
    question.answers.forEach(answer => {
      if (answer.isRight) countRightsAnswers += 1;
      if (!answer.name || answer.name.trim().length === 0)
        throw Error(ExaminationValidationErrorKeys.NO_NAME_ANSWER);
    });
    if (countRightsAnswers == 0)
      throw Error(ExaminationValidationErrorKeys.NO_RIGHTS_ANSWER);
  });
};
