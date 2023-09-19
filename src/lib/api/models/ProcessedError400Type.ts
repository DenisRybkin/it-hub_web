/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ValidationErrorType } from './ValidationErrorType';

export type ProcessedError400Type = {
    /**
     * http status of request
     */
    statusCode: number;
    /**
     * JSON i18n key of error for toast in client 
     */
    message: string;
    messages: Array<ValidationErrorType>;
    /**
     * internal error from api
     */
    internalMessage: string;
    /**
     * date of request error in ISO format
     */
    timestamp: string;
    /**
     * url of this request
     */
    path: string;
};
