import { ApiControllerCRUD } from '@lib/api/bases';
import {
  BaseProcessedError,
  CreateExaminationDto,
  Examination,
  ReadExaminationFilterDto,
  UpdateExaminationDto,
  UpdatePartiallyExaminationDto,
  User,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

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

  async passExamination(
    id: number,
    onSuccess?: (model: User) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return this.process<User>(
      this.post<User>('pass/' + id),
      onSuccess,
      onError
    );
  }
}
