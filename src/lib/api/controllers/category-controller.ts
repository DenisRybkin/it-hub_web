import { ApiControllerCRUD } from '@lib/api/bases';
import {
  Category,
  CreateCategoryDto,
  ReadCategoryFilterDto,
  UpdateCategoryDto,
  UpdatePartiallyCategoryDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

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
