/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Article } from './Article';
import type { ArticleCommentReaction } from './ArticleCommentReaction';
import type { ArticleCommentStaticField } from './ArticleCommentStaticField';
import type { User } from './User';

export type ArticleComment = {
    /**
     * id of article comment
     */
    id: number;
    /**
     * text of comment
     */
    text: string;
    /**
     * FK of article
     */
    articleId: number;
    /**
     * article
     */
    article?: Article;
    /**
     * author
     */
    createdByUser?: User;
    /**
     * attachments
     */
    attachments?: Array<ArticleCommentStaticField>;
    /**
     * reactions
     */
    reactions?: Array<ArticleCommentReaction>;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
