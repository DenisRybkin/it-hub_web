/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { User } from './User';

export type UserAchievement = {
    /**
     * id of user-achievement
     */
    id: number;
    /**
     * FK to user
     */
    userId: number;
    /**
     * user
     */
    user?: User;
    /**
     * FK to achievement
     */
    achievementId: number;
    /**
     * Category by achievement
     */
    categoryId: number;
    /**
     * Category by achievement
     */
    category: Category;
    /**
     * current points of user
     */
    userPoints: number;
};
