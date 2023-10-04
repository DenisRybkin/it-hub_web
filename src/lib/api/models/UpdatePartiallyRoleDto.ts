/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdatePartiallyRoleDto = {
    id?: number;
    name?: UpdatePartiallyRoleDto.name;
    description?: string;
};

export namespace UpdatePartiallyRoleDto {

    export enum name {
        USER = 'user',
        ADMIN = 'admin',
        PUBLISHER = 'publisher',
        OWNER = 'owner',
    }


}
