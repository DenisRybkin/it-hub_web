/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { ArticleTestQuestion } from './ArticleTestQuestion';

export type ArticleTestAnswer = {
    /**
     * id of test examination-answer
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
    question?: ArticleTestQuestion;
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
