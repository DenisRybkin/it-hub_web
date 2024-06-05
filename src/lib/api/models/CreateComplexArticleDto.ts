/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { ComplexCreateArticleTestQuestionDto } from './ComplexCreateArticleTestQuestionDto';

export type CreateComplexArticleDto = {
    body: string;
    previewId?: number;
    categoryIds: Array<number>;
    hashtagIds?: Array<number>;
    questions?: Array<ComplexCreateArticleTestQuestionDto>;
};
