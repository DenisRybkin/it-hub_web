import React, { useContext } from 'react';
import { sidebarLinks } from '@components/layouts/misc/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils/tools/cn';
import { AuthContext } from '@app/providers/auth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);

  const handleClickLink = (route: string) => () => navigate(route);

  return (
    <section id="sidebar" className="leftsidebar">
      <div className="flex w-full flex-1 flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map(link => {
          if (link.isPrivate && !authContext.isAuth) return null;
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
    </section>
  );
};
