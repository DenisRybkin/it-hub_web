import { ApiControllerCRUD } from '@lib/api/bases';
import {
  ExaminationAnswer,
  CreateExaminationAnswerDto,
  ReadExaminationAnswerFilterDto,
  UpdateExaminationAnswerDto,
  UpdatePartiallyExaminationAnswerDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ExaminationAnswerController extends ApiControllerCRUD<
  ExaminationAnswer,
  ReadExaminationAnswerFilterDto,
  CreateExaminationAnswerDto,
  UpdateExaminationAnswerDto,
  UpdatePartiallyExaminationAnswerDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'examination-answer');
  }
}
