/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Answer } from './Answer';
import type { Examination } from './Examination';

export type Question = {
    /**
     * id of quest
     */
    id: number;
    /**
     * name of question
     */
    name: string;
    /**
     * name of question
     */
    examinationId: number;
    /**
     * examination
     */
    examination?: Examination;
    /**
     * answers of question
     */
    answers?: Array<Answer>;
};
