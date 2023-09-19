import { AxiosInstance } from 'axios';
import { LockerModel } from '@/lib/api/types';
import { client } from '@/lib/api/plugins/client';
import { mutexLocker } from '@/lib/api/plugins/locker';
import { AuthController } from '@/lib/api/controllers';

class Api {
  auth: AuthController;

  constructor(client: AxiosInstance, locker: LockerModel) {
    this.auth = new AuthController(client, locker);
  }
}

export const api = new Api(client, mutexLocker);
