/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { User } from './User';

export type UserFollower = {
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
    followerUserId: number;
    /**
     * follower
     */
    follower?: User;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
