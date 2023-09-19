/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProcessedError404Type = {
    /**
     * http status of request
     */
    statusCode: number;
    /**
     * JSON i18n key of error for toast in client 
     */
    message: string;
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
