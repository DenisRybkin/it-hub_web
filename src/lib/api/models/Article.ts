/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleCategory } from './ArticleCategory';
import type { ArticleComment } from './ArticleComment';
import type { ArticleHashtag } from './ArticleHashtag';
import type { ArticleLike } from './ArticleLike';
import type { ArticleRepost } from './ArticleRepost';
import type { ArticleStaticField } from './ArticleStaticField';
import type { ArticleTest } from './ArticleTest';
import type { User } from './User';

export type Article = {
    /**
     * id of article
     */
    id: number;
    /**
     * stringify JSON of editorJS type
     */
    body: string;
    /**
     * FK of author
     */
    createdByUserId: number;
    /**
     * author
     */
    createdByUser?: User;
    /**
     * test of this article
     */
    test?: ArticleTest;
    /**
     * comments of this article
     */
    comments?: Array<ArticleComment>;
    /**
     * likes of this article
     */
    likes?: Array<ArticleLike>;
    /**
     * reposts of this article
     */
    reposts?: Array<ArticleRepost>;
    /**
     * categories of this article
     */
    categories?: Array<ArticleCategory>;
    /**
     * preview of this article
     */
    preview?: ArticleStaticField;
    /**
     * hashtags
     */
    hashtags?: Array<ArticleHashtag>;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
