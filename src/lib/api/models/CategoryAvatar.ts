/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Category } from './Category';
import type { StaticField } from './StaticField';

export type CategoryAvatar = {
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
     * FK to static-field
     */
    staticFieldId: number;
    /**
     * avatar (static-field)
     */
    staticField?: StaticField;
    /**
     * date of model created
     */
    createdAt: string;
    /**
     * date of model updated
     */
    updatedAt: string;
};
