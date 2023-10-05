import { ApiControllerCRUD } from '@lib/api/bases';
import {
  Answer,
  CreateAnswerDto,
  ReadAnswerFilterDto,
  UpdateAnswerDto,
  UpdatePartiallyAnswerDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class AnswerController extends ApiControllerCRUD<
  Answer,
  ReadAnswerFilterDto,
  CreateAnswerDto,
  UpdateAnswerDto,
  UpdatePartiallyAnswerDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'answer');
  }
}
