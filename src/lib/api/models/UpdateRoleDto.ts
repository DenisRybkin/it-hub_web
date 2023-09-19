/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateRoleDto = {
    updatedAt?: string;
    createdAt?: string;
    id?: number;
    name?: UpdateRoleDto.name;
    description?: string;
};

export namespace UpdateRoleDto {

    export enum name {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }


}
