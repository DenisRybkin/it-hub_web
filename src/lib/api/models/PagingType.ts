/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { PagingOptionsType } from './PagingOptionsType';

export type PagingType = {
    pagingOptions: PagingOptionsType;
    /**
     * count items
     */
    totalItems: number;
    /**
     * count pages by page size (default: 10)
     */
    totalPages: number;
};
