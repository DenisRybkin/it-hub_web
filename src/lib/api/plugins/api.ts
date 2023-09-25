import { AxiosInstance } from 'axios';
import { LockerModel } from '@/lib/api/types';
import { mutexLocker } from '@/lib/api/plugins/locker';
import { AuthController } from '@/lib/api/controllers';
import { client } from '@/lib/api/plugins/client';
import { UserController } from '@lib/api/controllers/user-controller';
import { StaticFieldController } from '@lib/api/controllers/static-field-controller';
class Api {
  auth: AuthController;
  user: UserController;
  staticField: StaticFieldController;

  constructor(client: AxiosInstance, locker: LockerModel) {
    this.auth = new AuthController(client, locker);
    this.user = new UserController(client, locker);
    this.staticField = new StaticFieldController(client, locker);
  }
}
export const api = new Api(client, mutexLocker);
