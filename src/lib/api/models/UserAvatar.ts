/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { StaticField } from './StaticField';
import type { User } from './User';

export type UserAvatar = {
    /**
     * id of user-avatar
     */
    id: number;
    /**
     * FK to user
     */
    userId: number;
    /**
     * user
     */
    user: User;
    /**
     * FK to static-field
     */
    staticFieldId: number;
    /**
     * avatar (static-field)
     */
    staticField: StaticField;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
