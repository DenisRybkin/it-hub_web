import { RouteProps } from 'react-router-dom';
import { Role } from '@lib/api/models';
import { ReactNode } from 'react';
import { RouteKeys } from '@lib/constants';

export type RoutePropsType = RouteProps & {
  isPrivate: boolean;
  requiredRole?: Role;
  Layout?: ReactNode;
};

export const RoutePaths = {
  [RouteKeys.HOME]: '/',
  [RouteKeys.PROFILE]: '/profile',
  [RouteKeys.VACANCY]: '/vacancy',
  [RouteKeys.LATEST]: '/latest',
  [RouteKeys.WRITE]: '/write',
  [RouteKeys.SUBSCRIPTIONS]: '/subscriptions',
  [RouteKeys.COMPANY]: '/company',
  [RouteKeys.COMPANY_ID]: '/company/:id',
  [RouteKeys.PUBLICATION]: '/publication',
  [RouteKeys.PROFILE_ID]: '/profile/:id',
  [RouteKeys.PUBLICATION_ID]: '/publication/:id',
  [RouteKeys.VACANCY_ID]: '/vacancy/:id',
};

export const routerConfig: RoutePropsType[] = [
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.HOME],
    element: <div>HOME</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.PROFILE],
    element: <div>PROFILE</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.PUBLICATION],
    element: <div>PUBLICATION</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.VACANCY],
    element: <div>VACANCY</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.PROFILE_ID],
    element: <div>PROFILE_ID</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.PUBLICATION_ID],
    element: <div>PUBLICATION_ID</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.VACANCY_ID],
    element: <div>VACANCY_ID</div>,
  },
];
