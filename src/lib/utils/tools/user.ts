import { User } from '@lib/api/models';

export const getFallback = (user?: User): string =>
  user ? user.name.slice(0, 2).toUpperCase() : '';

export const getAvatar = (user?: User): string =>
  user?.userAvatar?.staticField?.url ?? user.defaultAvatar.url;
