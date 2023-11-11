/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleComment } from './ArticleComment';
import type { User } from './User';

export type ArticleCommentReaction = {
    /**
     * id of article comment reaction
     */
    id: number;
    /**
     * FK of author
     */
    commentId: number;
    /**
     * comment
     */
    comment?: ArticleComment;
    /**
     * FK of author
     */
    userId: number;
    /**
     * user, who reacted
     */
    user?: User;
    /**
     * symbol like emoji
     */
    value: string;
};
