import { ApiControllerGet } from '@lib/api/bases';
import { ReadRoleFilterDto, Role } from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class RoleController extends ApiControllerGet<Role, ReadRoleFilterDto> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'role');
  }
}
