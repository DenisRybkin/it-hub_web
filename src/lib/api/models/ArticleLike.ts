/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Article } from './Article';
import type { User } from './User';

export type ArticleLike = {
    /**
     * id of article like
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
     * FK of user liked
     */
    userId: number;
    /**
     * author
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
