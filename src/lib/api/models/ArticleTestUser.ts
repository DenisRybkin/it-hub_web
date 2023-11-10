/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleTest } from './ArticleTest';

export type ArticleTestUser = {
    /**
     * id of article article test user
     */
    id: number;
    /**
     * FK of test
     */
    testId: number;
    /**
     * passing test
     */
    test?: ArticleTest;
    /**
     * FK of user, who passed test
     */
    userId: number;
    /**
     * user, who passed test
     */
    user?: ArticleTest;
};
