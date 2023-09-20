import { FiHome, FiClock, FiClipboard, FiList } from 'react-icons/fi';
import { ReactNode } from 'react';
import { LuBuilding2 } from 'react-icons/lu';

interface ISidebarLink {
  route: string;
  label: string;
  icon: ReactNode;
}
export const sidebarLinks: ISidebarLink[] = [
  {
    route: '/',
    label: 'ui:sidebar.home',
    icon: <FiHome size={24} />,
  },
  {
    route: '/latest',
    label: 'ui:sidebar.latest',
    icon: <FiClock size={24} />,
  },
  {
    route: '/company',
    label: 'ui:sidebar.companies',
    icon: <LuBuilding2 size={24} />,
  },
  {
    route: '/vacancy',
    label: 'ui:sidebar.vacancies',
    icon: <FiClipboard size={24} />,
  },
  {
    route: '/subscriptions',
    label: 'ui:sidebar.subscriptions',
    icon: <FiList size={24} />,
  },
];
