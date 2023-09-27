import { ApiControllerCRUD } from '@lib/api/bases';
import {
  BaseProcessedError,
  CreateUserDto,
  ReadUserFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
  User,
} from '@lib/api/models';
import { AxiosError, AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class UserController extends ApiControllerCRUD<
  User,
  ReadUserFilterDto,
  CreateUserDto,
  UpdateUserDto,
  UpdatePartiallyUserDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'user');
  }

  async getMe(
    onSuccess?: (model: User) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<User>(this.get('get-me'), onSuccess, onError);
  }
}
