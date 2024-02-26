/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleTest } from './ArticleTest';
import type { ArticleTestAnswer } from './ArticleTestAnswer';

export type ArticleTestQuestion = {
    /**
     * id of test examination-question
     */
    id: number;
    /**
     * name of examination-question
     */
    name: string;
    /**
     * FK of ArticleTest
     */
    testId: number;
    /**
     * test of this examination-question
     */
    test?: ArticleTest;
    /**
     * answers of examination-question
     */
    answers?: Array<ArticleTestAnswer>;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
