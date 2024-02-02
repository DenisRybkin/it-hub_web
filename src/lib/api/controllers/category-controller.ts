import { ApiControllerCRUD } from '@lib/api/bases';
import {
  Category,
  CreateCategoryDto,
  ReadCategoryFilterDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class CategoryController extends ApiControllerCRUD<
  Category,
  ReadCategoryFilterDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'category');
  }
}
