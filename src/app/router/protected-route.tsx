import { AuthContext } from '@app/providers/auth';
import { PreloaderContext } from '@app/providers/preloader';
import type { RoutePropsType } from '@app/router';
import { RoutePaths } from '@app/router/config';
import { LocalStorageKeys, RouteKeys } from '@lib/constants';
import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = (
  props: RoutePropsType & { children: ReactNode }
) => {
  const authContext = useContext(AuthContext);
  const preloader = useContext(PreloaderContext);

  const isUnavailable =
    (props.isPrivate && !authContext.isAuth) ||
    (props.requiredRole && authContext.role == props.requiredRole);

  if (isUnavailable && !preloader.isVisible)
    return <Navigate to={RoutePaths[RouteKeys.HOME]} />;

  return <>{props.children}</>;
};
