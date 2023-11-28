import { ApiControllerCRUD } from '@lib/api/bases';
import {
  Article,
  ArticleLike,
  ArticleRepost,
  ArticleTest,
  BaseProcessedError,
} from '@lib/api/models';
import {
  CreateArticleDto,
  CreateComplexArticleDto,
  ReadArticleFilterDto,
  UpdateArticleDto,
  UpdateComplexArticleDto,
  UpdatePartiallyArticleDto,
} from '../models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleController extends ApiControllerCRUD<
  Article,
  ReadArticleFilterDto,
  CreateArticleDto,
  UpdateArticleDto,
  UpdatePartiallyArticleDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article');
  }

  async createComplex(
    dto: CreateComplexArticleDto,
    onSuccess?: (model: Article) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<Article>(
      this.post('complex', { data: dto }),
      onSuccess,
      onError
    );
  }

  async updateComplex(
    articleId: number,
    dto: UpdateComplexArticleDto,
    onSuccess?: (model: Article) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<Article>(
      this.put(`complex/${articleId}`, { data: dto }),
      onSuccess,
      onError
    );
  }

  async toggleLike(
    articleId: number,
    onSuccess?: (model: ArticleLike | number) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ArticleLike | number>(
      this.post(`like/${articleId}`),
      onSuccess,
      onError
    );
  }

  async toggleRepost(
    articleId: number,
    onSuccess?: (model: ArticleRepost | number) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ArticleRepost | number>(
      this.post(`repost/${articleId}`),
      onSuccess,
      onError
    );
  }

  async passTest(
    articleId: number,
    onSuccess?: (model: ArticleTest) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ArticleTest>(
      this.post(`pass-test/${articleId}`),
      onSuccess,
      onError
    );
  }
}
