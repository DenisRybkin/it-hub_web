import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { LocalStorageKeys, RouteKeys } from '@lib/constants';
import { setupResponseInterceptors } from '@lib/api/plugins/client';
import { api } from '@lib/api/plugins';

export const SetupApi = (): null => {
  const navigate = useNavigate();
  const onRefreshExpired = () => navigate(RoutePaths[RouteKeys.HOME]);
  const onAccessExpired = async () => {
    localStorage.removeItem(LocalStorageKeys.JWT);
    const { access } = await api.auth.refresh();
    localStorage.setItem(LocalStorageKeys.JWT, access);
  };
  setupResponseInterceptors(onRefreshExpired, onAccessExpired);

  return null;
};
