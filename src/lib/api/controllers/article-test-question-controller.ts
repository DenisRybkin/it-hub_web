import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ArticleTestQuestion,
  CreateArticleTestQuestionDto,
  ReadArticleTestQuestionFilterDto,
  UpdateArticleTestQuestionDto,
  UpdatePartiallyArticleTestQuestionDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleTestQuestionController extends ApiControllerCRUD<
  ArticleTestQuestion,
  ReadArticleTestQuestionFilterDto,
  CreateArticleTestQuestionDto,
  UpdateArticleTestQuestionDto,
  UpdatePartiallyArticleTestQuestionDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-test-question');
  }
}
