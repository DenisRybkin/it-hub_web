/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';
import type { StaticField } from './StaticField';
import type { UserAchievement } from './UserAchievement';
import type { UserAvatar } from './UserAvatar';
import type { UserCategory } from './UserCategory';
import type { UserFollower } from './UserFollower';
import type { UserFollowing } from './UserFollowing';

export type User = {
    /**
     * id of user
     */
    id: number;
    /**
     * nickname of user, len [3,12]
     */
    nickname: string;
    /**
     * name of user, len [3,15]
     */
    name: string;
    /**
     * email of user, should be unique
     */
    email: string;
    /**
     * hashed password of user, min length for for crete: 6
     */
    password: string;
    /**
     * FK of Role model
     */
    roleId: number;
    /**
     * Role model
     */
    role?: Role;
    /**
     * FK of StaticField model (default avatar)
     */
    defaultAvatarId: number;
    /**
     * default avatar
     */
    defaultAvatar?: StaticField;
    /**
     * avatar
     */
    userAvatar?: UserAvatar;
    /**
     * categories
     */
    userCategory?: Array<UserCategory>;
    /**
     * user achievements
     */
    userAchievements?: Array<UserAchievement>;
    /**
     * user followings
     */
    userFollowings?: Array<UserFollowing>;
    /**
     * user followers
     */
    userFollowers?: Array<UserFollower>;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
