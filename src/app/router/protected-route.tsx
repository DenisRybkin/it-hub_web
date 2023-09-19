import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { RoutePaths, RoutePropsType } from '@app/router/config';
import { Navigate } from 'react-router-dom';
import { RouteKeys } from '@lib/constants';
import { ReactNode } from 'react';

export const ProtectedRoute = observer(
  (props: RoutePropsType & { children: ReactNode }) => {
    const authStore = useRootStore('authStore');

    const isUnavailable =
      (props.isPrivate && !authStore.isAuth) ||
      (props.requiredRole && authStore.getUser().role == props.requiredRole);

    if (isUnavailable) return <Navigate to={RoutePaths[RouteKeys.HOME]} />;

    return <>{props.children}</>;
  }
);
