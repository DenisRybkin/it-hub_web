import { Role, User } from '@lib/api/models';
import { PermissionsKeys } from '@lib/constants';

export const checkPermission = (key: PermissionsKeys, user?: User): boolean => {
  switch (key) {
    case PermissionsKeys.WRITE_ARTICLE: {
      switch (user?.role?.name) {
        case Role.name.USER:
          return false;
        case Role.name.ADMIN:
          return true;
        case Role.name.OWNER:
          return true;
        case Role.name.PUBLISHER:
          return true;
        default:
          return false;
      }
    }
    case PermissionsKeys.PASS_EXAMINATION:
      return user?.role?.name == Role.name.USER;
    default:
      return false;
  }
};
