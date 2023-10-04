/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRoleDto = {
    name: CreateRoleDto.name;
    description: string;
};

export namespace CreateRoleDto {

    export enum name {
        USER = 'user',
        ADMIN = 'admin',
        PUBLISHER = 'publisher',
        OWNER = 'owner',
    }


}
