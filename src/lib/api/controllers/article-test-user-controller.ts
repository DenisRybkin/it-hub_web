import { ApiControllerRead } from '@lib/api/bases';
import { ArticleTestUser, ReadArticleTestUserFilterDto } from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleTestUserController extends ApiControllerRead<
  ArticleTestUser,
  ReadArticleTestUserFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-test-user');
  }
}
