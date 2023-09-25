import { FiHome, FiClock, FiClipboard, FiList, FiUsers } from 'react-icons/fi';
import { ReactNode } from 'react';
import { LuBuilding2 } from 'react-icons/lu';
import { RouteKeys } from '@lib/constants';
import { RoutePaths } from '@app/router';

interface ISidebarLink {
  route: string;
  label: string;
  icon: ReactNode;
  isPrivate?: boolean;
}
export const sidebarLinks: ISidebarLink[] = [
  {
    route: RoutePaths[RouteKeys.HOME],
    label: 'ui:sidebar.home',
    icon: <FiHome size={24} />,
  },
  {
    route: RoutePaths[RouteKeys.LATEST],
    label: 'ui:sidebar.latest',
    icon: <FiClock size={24} />,
  },
  {
    route: RoutePaths[RouteKeys.SUBSCRIPTIONS],
    label: 'ui:sidebar.subscriptions',
    icon: <FiList size={24} />,
    isPrivate: true,
  },
  {
    route: RoutePaths[RouteKeys.COMPANY],
    label: 'ui:sidebar.companies',
    icon: <LuBuilding2 size={24} />,
  },
  {
    route: RoutePaths[RouteKeys.VACANCY],
    label: 'ui:sidebar.vacancies',
    icon: <FiClipboard size={24} />,
  },
  {
    route: RoutePaths[RouteKeys.USER],
    label: 'ui:sidebar.users',
    icon: <FiUsers size={24} />,
  },
];
