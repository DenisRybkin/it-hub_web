import { ApiControllerBase } from '@lib/api/bases';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';
import { BaseProcessedError } from '@lib/api/models';

export class AppController extends ApiControllerBase {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'app');
  }

  async ping(
    onSuccess?: (model: string) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<string> {
    return await this.process(this.get<string>('ping'), onSuccess, onError);
  }
}
