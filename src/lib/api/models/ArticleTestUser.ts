/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleTest } from './ArticleTest';
import type { User } from './User';

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
    user?: User;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
