/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { Order } from './Order';

export type PagingOptionsType = {
    /**
     * number of page
     */
    page?: number;
    /**
     * count items of page
     */
    pageSize?: number;
    order?: Order;
    /**
     * filed for ordering
     */
    orderBy?: string;
};
