import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ArticleTestAnswer,
  CreateArticleTestAnswerDto,
  ReadArticleTestAnswerFilterDto,
  UpdateArticleTestAnswerDto,
  UpdatePartiallyArticleTestAnswerDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

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
