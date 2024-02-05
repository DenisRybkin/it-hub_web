/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type UserFollowing = {
    /**
     * id of user-follower
     */
    id: number;
    /**
     * FK to author
     */
    userId: number;
    /**
     * author
     */
    user?: User;
    /**
     * FK to follower
     */
    followingUserId: number;
    /**
     * following
     */
    following?: User;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
