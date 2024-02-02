import {
  BaseProcessedError,
  CreateUserDto,
  LoginDto,
  LoginResponseType,
} from '@lib/api/models';
import { AxiosInstance } from 'axios';

import { ApiControllerBase } from '@/lib/api/bases';
import { LockerModel } from '@/lib/api/types';

export class AuthController extends ApiControllerBase {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'auth');
  }

  async refresh(
    onSuccess?: (model: LoginResponseType) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<LoginResponseType> {
    return await this.process<LoginResponseType>(
      this.post<LoginResponseType>('refresh'),
      onSuccess,
      onError,
      true
    );
  }

  async login(
    dto: LoginDto,
    onSuccess?: (model: LoginResponseType) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<LoginResponseType> {
    return await this.process(
      this.post<LoginResponseType>('login', { data: dto }),
      onSuccess,
      onError
    );
  }

  async logout(
    onSuccess?: (model: boolean) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<boolean>(this.post('logout'), onSuccess, onError);
  }

  async registration(
    dto: CreateUserDto,
    onSuccess?: (model: LoginResponseType) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<LoginResponseType> {
    return await this.process(
      this.post('registration', { data: dto }),
      onSuccess,
      onError
    );
  }
}
