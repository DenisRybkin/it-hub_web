/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReadRoleFilterDto = {
    id?: number;
    name?: ReadRoleFilterDto.name;
    description?: string;
};

export namespace ReadRoleFilterDto {

    export enum name {
        USER = 'user',
        ADMIN = 'admin',
        PUBLISHER = 'publisher',
        OWNER = 'owner',
    }


}
