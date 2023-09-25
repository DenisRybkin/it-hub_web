import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { sidebarLinks } from '@components/layouts/misc/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils/tools/cn';
import { Button } from '@components/ui/button';
import { FiLogOut } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getFallback } from '@lib/utils/tools/user';
import { api } from '@lib/api/plugins';

export const Sidebar = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const authStore = useRootStore('authStore');

  const handleClickLink = (route: string) => () => navigate(route);

  const handleLogoutClick = () => {
    authStore.setUser(null);
    authStore.setAccessToken(null);
  };

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map(link => {
          if (link.isPrivate && !authStore.isAuth) return null;
          const isActive = pathname == link.route;
          return (
            <div
              key={link.label}
              onClick={handleClickLink(link.route)}
              className={cn(
                'leftsidebar_link',
                isActive && 'bg-primary-500 hover:bg-primary-500/90'
              )}
            >
              {link.icon}
              <p className="text-light-1 max-lg:hidden">{t(link.label)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <div
          onClick={handleLogoutClick}
          className="flex cursor-pointer gap-4 p-4 rounded-md hover:bg-dark-4"
        >
          <FiLogOut size={24} />
          <p className="text-light-2 max-lg:hidden">{t('ui:button.logout')}</p>
        </div>
      </div>
    </section>
  );
});
