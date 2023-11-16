/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Examination } from './Examination';
import type { ExaminationAnswer } from './ExaminationAnswer';

export type ExaminationQuestion = {
  /**
   * id of create-examination-question
   */
  id: number;
  /**
   * name of create-examination-question
   */
  name: string;
  /**
   * name of create-examination-question
   */
  examinationId: number;
  /**
   * create-examination
   */
  examination?: Examination;
  /**
   * answers of create-examination-question
   */
  answers?: Array<ExaminationAnswer>;
};
