/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Article } from './Article';
import type { Hashtag } from './Hashtag';

export type ArticleHashtag = {
    /**
     * id of article hashtag
     */
    id: number;
    /**
     * FK of hashtag
     */
    hashtagId: number;
    /**
     * hashtag
     */
    hashtag?: Hashtag;
    /**
     * FK of article
     */
    articleId: number;
    /**
     * article
     */
    article?: Article;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
