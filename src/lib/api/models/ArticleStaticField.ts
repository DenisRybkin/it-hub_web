/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { StaticField } from './StaticField';

export type ArticleStaticField = {
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
     * FK of article static field
     */
    staticFieldId: number;
    /**
     * static field (preview)
     */
    staticField?: StaticField;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
