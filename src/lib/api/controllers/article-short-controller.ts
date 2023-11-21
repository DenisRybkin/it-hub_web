import { ApiControllerRead } from '@lib/api/bases';
import { ArticleShortDto, ReadArticleFilterDto } from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleShortController extends ApiControllerRead<
  ArticleShortDto,
  ReadArticleFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-short');
  }
}
