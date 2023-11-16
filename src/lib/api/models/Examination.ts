/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExaminationQuestion } from './ExaminationQuestion';
import type { Role } from './Role';

export type Examination = {
  /**
   * id of create-examination
   */
  id: number;
  /**
   * Title of create-examination
   */
  title: string;
  /**
   * Description of create-examination
   */
  description: string;
  /**
   * The role id that the user will receive in case of successful completion of the exam
   */
  certificateRoleId: number;
  /**
   * The role that the user will receive in case of successful completion of the exam
   */
  certificateRole: Role;
  /**
   * questions of exam
   */
  questions?: Array<ExaminationQuestion>;
};
