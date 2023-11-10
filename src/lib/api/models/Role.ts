/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Role = {
    /**
     * id of role
     */
    id: number;
    /**
     * name of role
     */
    name: Role.name;
    /**
     * description of model
     */
    description: Record<string, any>;
};

export namespace Role {

    /**
     * name of role
     */
    export enum name {
        USER = 'user',
        ADMIN = 'admin',
        PUBLISHER = 'publisher',
        OWNER = 'owner',
    }


}
