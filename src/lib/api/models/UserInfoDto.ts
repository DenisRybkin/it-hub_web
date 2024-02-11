/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Role } from './Role';
import type { StaticField } from './StaticField';
import type { UserAchievement } from './UserAchievement';
import type { UserAvatar } from './UserAvatar';

export type UserInfoDto = {
    id: number;
    nickname: string;
    name: string;
    email: string;
    role: Role;
    defaultAvatar: StaticField;
    userAvatar?: UserAvatar;
    createdAt: string;
    updatedAt: string;
    countFollowers: number;
    countFollowings: number;
    achievements: Array<UserAchievement>;
};
