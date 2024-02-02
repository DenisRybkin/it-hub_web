import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateExaminationQuestionDto,
  ExaminationQuestion,
  ReadExaminationQuestionFilterDto,
  UpdateExaminationQuestionDto,
  UpdatePartiallyExaminationQuestionDto,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class ExaminationQuestionController extends ApiControllerCRUD<
  ExaminationQuestion,
  ReadExaminationQuestionFilterDto,
  CreateExaminationQuestionDto,
  UpdateExaminationQuestionDto,
  UpdatePartiallyExaminationQuestionDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'examination-question');
  }
}
