import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ArticleTest,
  BaseProcessedError,
  ComplexCreateArticleTestDto,
  ComplexUpdateArticleTestDto,
  CreateArticleTestDto,
  ReadArticleTestFilterDto,
  UpdateArticleTestDto,
  UpdatePartiallyArticleTestDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ArticleTestController extends ApiControllerCRUD<
  ArticleTest,
  ReadArticleTestFilterDto,
  CreateArticleTestDto,
  UpdateArticleTestDto,
  UpdatePartiallyArticleTestDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'article-test');
  }

  async createComplex(
    dto: ComplexCreateArticleTestDto,
    onSuccess?: (model: ComplexCreateArticleTestDto) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ComplexCreateArticleTestDto>(
      this.post('complex', { data: dto })
    );
  }

  async updateComplex(
    dto: ComplexUpdateArticleTestDto,
    onSuccess?: (model: ComplexUpdateArticleTestDto) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<ComplexCreateArticleTestDto>(
      this.put('complex', { data: dto })
    );
  }
}
