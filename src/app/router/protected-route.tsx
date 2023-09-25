import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { RoutePaths } from '@app/router/config';
import type { RoutePropsType } from '@app/router';
import { Navigate } from 'react-router-dom';
import { LocaleStorageKeys, RouteKeys } from '@lib/constants';
import { ReactNode } from 'react';

export const ProtectedRoute = observer(
  (props: RoutePropsType & { children: ReactNode }) => {
    const authStore = useRootStore('authStore');

    const isUnavailable =
      (!localStorage.getItem(LocaleStorageKeys.JWT) &&
        props.isPrivate &&
        !authStore.isAuth) ||
      (props.requiredRole && authStore.getRole == props.requiredRole);

    if (isUnavailable) return <Navigate to={RoutePaths[RouteKeys.HOME]} />;

    return <>{props.children}</>;
  }
);
