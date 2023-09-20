import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { sidebarLinks } from '@components/layouts/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils/tools/cn';

export const Sidebar = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { isAuth, getUser } = useRootStore('authStore');

  const handleClickLink = (route: string) => () => navigate(route);

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map(link => {
          const isActive = pathname == link.route;
          console.log(pathname, link.route);
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
        <div className="flex cursor-pointer gap-4 p-4 rounded-md hover:bg-dark-4"></div>
      </div>
    </section>
  );
});
