/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StaticField = {
    /**
     * id of static field
     */
    id: number;
    /**
     * generated name + ext of file
     */
    name: string;
    /**
     * original name of file
     */
    originalname: string;
    /**
     * extension of file
     */
    type: string;
    /**
     * url of static field
     */
    url: string;
    /**
     * folder of s3
     */
    folder: StaticField.folder;
};

export namespace StaticField {

    /**
     * folder of s3
     */
    export enum folder {
        UPLOADS_ = 'uploads/',
        DEFAULT_AVATARS_ = 'default-avatars/',
        TOPICS_ = 'topics/',
        EDITOR_JS_ = 'editor-js/',
        PREVIEWS_ = 'previews/',
    }


}
