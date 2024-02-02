import { ApiControllerRead } from '@lib/api/bases';
import { ReadRoleFilterDto, Role } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class RoleController extends ApiControllerRead<Role, ReadRoleFilterDto> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'role');
  }
}
