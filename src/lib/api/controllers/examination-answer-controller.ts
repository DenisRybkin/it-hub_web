import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateExaminationAnswerDto,
  ExaminationAnswer,
  ReadExaminationAnswerFilterDto,
  UpdateExaminationAnswerDto,
  UpdatePartiallyExaminationAnswerDto,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

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
