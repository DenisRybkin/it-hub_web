/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExaminationQuestion } from './ExaminationQuestion';

export type ExaminationAnswer = {
  /**
   * id of create-examination-answer
   */
  id: number;
  /**
   * create-examination-answer of create-examination-question
   */
  name: string;
  /**
   * FK of create-examination-question
   */
  questionId: number;
  /**
   * question
   */
  question?: ExaminationQuestion;
  /**
   * field of right of create-examination-answer
   */
  isRight: boolean;
};
