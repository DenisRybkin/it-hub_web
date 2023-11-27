/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { User } from './User';

export type UserCategory = {
    /**
     * id of category-avatar
     */
    id: number;
    /**
     * FK to category
     */
    categoryId: number;
    /**
     * category
     */
    category?: Category;
    /**
     * FK to user
     */
    userId: number;
    /**
     * user
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
