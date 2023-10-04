/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Question } from './Question';

export type Answer = {
  /**
   * id of answer
   */
  id: number;
  /**
   * answer of question
   */
  name: string;
  /**
   * FK of question
   */
  questionId: number;
  /**
   * question
   */
  question?: Question;
  /**
   * field of right of answer
   */
  isRight: boolean;
};
