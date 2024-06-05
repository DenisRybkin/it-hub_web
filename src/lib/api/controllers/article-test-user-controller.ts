import { ApiControllerRead } from '@lib/api/bases';
import { ArticleTestUser, ReadArticleTestUserFilterDto } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class ArticleTestUserController extends ApiControllerRead<
  ArticleTestUser,
  ReadArticleTestUserFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-test-user');
  }
}
