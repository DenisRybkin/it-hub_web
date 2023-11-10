/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleComment } from './ArticleComment';
import type { StaticField } from './StaticField';

export type ArticleCommentStaticField = {
    /**
     * id of test examination-answer
     */
    id: number;
    /**
     * FK of comment
     */
    commentId: number;
    /**
     * comment
     */
    comment?: ArticleComment;
    /**
     * FK of static field
     */
    staticFieldId: number;
    /**
     * static field
     */
    staticField?: StaticField;
};
