import { ApiControllerRead } from '@lib/api/bases';
import { ArticleShortDto, ReadArticleFilterDto } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class ArticleShortController extends ApiControllerRead<
  ArticleShortDto,
  ReadArticleFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-short');
  }
}
