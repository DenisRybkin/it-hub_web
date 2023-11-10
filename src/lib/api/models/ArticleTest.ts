/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { ArticleTestUser } from './ArticleTestUser';

export type ArticleTest = {
    /**
     * id of article test
     */
    id: number;
    /**
     * Article
     */
    article?: Article;
    /**
     * user, who passed test
     */
    usersWhoPassed?: ArticleTestUser;
};
