import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateExaminationDto,
  Examination,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class ExaminationController extends ApiControllerCRUD<
  Examination,
  ReadExaminationFilterDto,
  CreateExaminationDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'examination');
  }
}
