/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Question } from './Question';
import type { Role } from './Role';

export type Examination = {
    /**
     * id of examination
     */
    id: number;
    /**
     * Title of examination
     */
    title: string;
    /**
     * Description of examination
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
    questions?: Array<Question>;
};
