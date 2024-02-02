import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ArticleTestAnswer,
  CreateArticleTestAnswerDto,
  ReadArticleTestAnswerFilterDto,
  UpdateArticleTestAnswerDto,
  UpdatePartiallyArticleTestAnswerDto,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class ArticleTestAnswerController extends ApiControllerCRUD<
  ArticleTestAnswer,
  ReadArticleTestAnswerFilterDto,
  CreateArticleTestAnswerDto,
  UpdateArticleTestAnswerDto,
  UpdatePartiallyArticleTestAnswerDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'test-answer');
  }
}
