/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { Category } from './Category';

export type ArticleCategory = {
    /**
     * id of article category
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
     * FK of article category
     */
    categoryId: number;
    /**
     * category
     */
    category?: Category;
};
