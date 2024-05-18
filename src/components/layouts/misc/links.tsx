import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { ReactNode } from 'react';
import {
  FiAward,
  FiClipboard,
  FiClock,
  FiHome,
  FiList,
  FiUsers,
} from 'react-icons/fi';
import { LuBuilding2 } from 'react-icons/lu';

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
  {
    route: RoutePaths[RouteKeys.RATING],
    label: 'ui:sidebar.rating',
    icon: <FiAward size={24} />,
  },
];
