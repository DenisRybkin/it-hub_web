/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { CategoryAvatar } from './CategoryAvatar';

export type Category = {
    /**
     * id of category
     */
    id: number;
    /**
     * name of category
     */
    name: string;
    /**
     * description of category
     */
    description: string;
    /**
     * avatar
     */
    avatar?: CategoryAvatar;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
