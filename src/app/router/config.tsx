import { RouteProps } from 'react-router-dom';
import { Role } from '@lib/api/models';
import { RouteKeys } from '@lib/constants';
import { WritePage } from '@components/pages/write';
import { HomePage } from '@components/pages/home/home-page';
import { UserPage } from '@components/pages/user';
import { LatestPage } from '@components/pages/latest';

export type RoutePropsType = RouteProps & {
  isPrivate: boolean;
  requiredRole?: Role;
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
  [RouteKeys.ARTICLE]: '/article',
  [RouteKeys.ARTICLE_ID]: '/article/:id',
  [RouteKeys.WRITE]: '/write',
};

export const routerConfig: RoutePropsType[] = [
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.HOME],
    element: <HomePage />,
  },
  {
    isPrivate: true,
    path: RoutePaths[RouteKeys.SUBSCRIPTIONS],
    element: <div>SUBSCRIPTIONS</div>,
  },
  {
    isPrivate: false,
    path: RoutePaths[RouteKeys.LATEST],
    element: <LatestPage />,
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
    isPrivate: false,
    path: RoutePaths[RouteKeys.USER],
    element: <UserPage />,
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
