import { ApiControllerBase } from '@/lib/api/bases';
import { AxiosError, AxiosInstance } from 'axios';
import { LockerModel } from '@/lib/api/types';
import {
  BaseProcessedError,
  CreateUserDto,
  LoginDto,
  LoginResponseType,
} from '@lib/api/models';

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
