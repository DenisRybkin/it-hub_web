import React, { useContext } from 'react';
import { sidebarLinks } from '@components/layouts/misc/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils/tools/cn';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '@app/providers/auth';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);

  const handleClickLink = (route: string) => () => navigate(route);

  const handleLogoutClick = () => {
    authContext.setUser(undefined);
    authContext.setAccessToken(undefined);
  };

  return (
    <section className="custom-scrollbar leftsidebar">
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
      {authContext.isAuth && (
        <div className="mt-10 px-6">
          <div
            onClick={handleLogoutClick}
            className="flex cursor-pointer gap-4 p-4 rounded-md hover:bg-dark-4"
          >
            <FiLogOut size={24} />
            <p className="text-light-2 max-lg:hidden">
              {t('ui:button.logout')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
