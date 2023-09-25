import { RouteProps } from 'react-router-dom';
import { Role } from '@lib/api/models';
import { ReactNode } from 'react';
import { RouteKeys } from '@lib/constants';
import { WritePage } from '@components/pages/write';
import { Home } from '@components/pages/home/home';

export type RoutePropsType = RouteProps & {
  isPrivate: boolean;
  requiredRole?: Role;
  Layout?: ReactNode;
};

export const RoutePaths = {
  [RouteKeys.HOME]: '/',
  [RouteKeys.SUBSCRIPTIONS]: '/subscriptions',
  [RouteKeys.LATEST]: '/latest',
  [RouteKeys.COMPANY]: '/company',
  [RouteKeys.COMPANY_ID]: '/company/:id',
  [RouteKeys.VACANCY]: '/vacancy',
  [RouteKeys.VACANCY_ID]: '/vacancy/:id',
  [RouteKeys.USER]: '/user',
  [RouteKeys.USER_ID]: '/user/:id',
  [RouteKeys.ARTICLE_ID]: '/article/:id',
  [RouteKeys.WRITE]: '/write',
};

export const routerConfig: RoutePropsType[] = [
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.HOME],
    element: <Home />,
  },
  {
    isPrivate: true,
    path: RoutePaths[RouteKeys.SUBSCRIPTIONS],
    element: <div>SUBSCRIPTIONS</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.LATEST],
    element: <div>LATEST</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.COMPANY],
    element: <div>COMPANY</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.COMPANY_ID],
    element: <div>COMPANY_ID</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.VACANCY],
    element: <div>VACANCY</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.VACANCY_ID],
    element: <div>VACANCY_ID</div>,
  },
  {
    isPrivate: true,
    path: RoutePaths[RouteKeys.USER],
    element: <div>USER</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.USER_ID],
    element: <div>USER_ID</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.ARTICLE_ID],
    element: <div>PUBLICATION_ID</div>,
  },
  {
    isPrivate: true,
    path: RoutePaths[RouteKeys.WRITE],
    element: <WritePage />,
  },
];
