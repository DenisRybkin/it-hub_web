/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
 

import type { ArticleHashtag } from './ArticleHashtag';
import type { Category } from './Category';
import type { User } from './User';

export type ArticleShortDto = {
    id: number;
    body: string;
    createdByUserId: number;
    createdByUser: User;
    categories: Array<Category>;
    commentsCount: number;
    likesCount: number;
    repostsCount: number;
    hashtags: Array<ArticleHashtag>;
    isLiked: boolean;
    isCommented: boolean;
    isReposted: boolean;
    createdAt: string;
    updatedAt: string;
};
