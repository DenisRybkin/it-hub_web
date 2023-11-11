import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateExaminationQuestionDto,
  ExaminationQuestion,
  ReadExaminationQuestionFilterDto,
  UpdatePartiallyExaminationQuestionDto,
  UpdateExaminationQuestionDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

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
