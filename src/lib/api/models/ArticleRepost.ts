/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { User } from './User';

export type ArticleRepost = {
    /**
     * id of article repost
     */
    id: number;
    /**
     * FK of article
     */
    articleId: number;
    /**
     * article
     */
    article?: Article;
    /**
     * FK of user reposted
     */
    userId: number;
    /**
     * author
     */
    user?: User;
};
