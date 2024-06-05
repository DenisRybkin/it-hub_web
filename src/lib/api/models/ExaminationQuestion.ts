/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Examination } from './Examination';
import type { ExaminationAnswer } from './ExaminationAnswer';

export type ExaminationQuestion = {
    /**
     * id of examination-question
     */
    id: number;
    /**
     * name of examination-question
     */
    name: string;
    /**
     * name of examination-question
     */
    examinationId: number;
    /**
     * examination
     */
    examination?: Examination;
    /**
     * answers of examination-question
     */
    answers?: Array<ExaminationAnswer>;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
