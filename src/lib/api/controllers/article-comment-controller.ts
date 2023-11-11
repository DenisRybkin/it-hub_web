import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ArticleComment,
  ArticleCommentReaction,
  ArticleCommentReactionDto,
  BaseProcessedError,
  CreateArticleCommentDto,
  CreateComplexArticleCommentDto,
  ReadArticleCommentFilterDto,
  UpdateArticleCommentDto,
  UpdateComplexArticleCommentDto,
  UpdatePartiallyArticleCommentDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleCommentController extends ApiControllerCRUD<
  ArticleComment,
  ReadArticleCommentFilterDto,
  CreateArticleCommentDto,
  UpdateArticleCommentDto,
  UpdatePartiallyArticleCommentDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-comment');
  }

  async createComplex(
    dto: CreateComplexArticleCommentDto,
    onSuccess?: (model: CreateComplexArticleCommentDto) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(
      this.post('complex', { data: dto }),
      onSuccess,
      onError
    );
  }

  async updateComplex(
    commentId: number,
    dto: UpdateComplexArticleCommentDto,
    onSuccess?: (model: ArticleComment) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ArticleComment>(
      this.put(`complex/${commentId}`, { data: dto }),
      onSuccess,
      onError
    );
  }

  async toggleReaction(
    commentId: number,
    dto: ArticleCommentReactionDto,
    onSuccess?: (model: ArticleCommentReaction | number) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ArticleCommentReaction | number>(
      this.post(`${commentId}/reaction`, { data: dto }),
      onSuccess,
      onError
    );
  }
}
