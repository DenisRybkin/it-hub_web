import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateQuestionDto,
  Question,
  ReadQuestionFilterDto,
  UpdatePartiallyQuestionDto,
  UpdateQuestionDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class QuestionController extends ApiControllerCRUD<
  Question,
  ReadQuestionFilterDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  UpdatePartiallyQuestionDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'question');
  }
}
