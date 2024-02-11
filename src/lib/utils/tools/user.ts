import { User, UserShortDto } from '@lib/api/models';

export const getFallback = (user?: User | UserShortDto): string =>
  user ? user.name.slice(0, 2).toUpperCase() : '';

export const getAvatar = (user?: User | UserShortDto): string | undefined =>
  user?.userAvatar?.staticField?.url ?? user?.defaultAvatar?.url;
