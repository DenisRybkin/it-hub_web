import { ApiControllerRead } from '@lib/api/bases';
import { ReadUserFilterDto, UserShortDto } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class UserShortController extends ApiControllerRead<
  UserShortDto,
  ReadUserFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'user-short');
  }
}
