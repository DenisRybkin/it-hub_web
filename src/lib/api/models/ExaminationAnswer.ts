/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExaminationQuestion } from './ExaminationQuestion';

export type ExaminationAnswer = {
    /**
     * id of examination-answer
     */
    id: number;
    /**
     * examination-answer of examination-question
     */
    name: string;
    /**
     * FK of examination-question
     */
    questionId: number;
    /**
     * question
     */
    question?: ExaminationQuestion;
    /**
     * field of right of examination-answer
     */
    isRight: boolean;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
