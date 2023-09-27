import { sidebarLinks } from '@components/layouts/misc/links';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils/tools/cn';
import { useContext } from 'react';
import { AuthContext } from '@app/providers/auth';

export const Bottombar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);

  const handleClickLink = (route: string) => () => navigate(route);

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map(link => {
          if (link.isPrivate && !authContext.isAuth) return null;
          const isActive = pathname == link.route;
          return (
            <div
              key={link.label}
              onClick={handleClickLink(link.route)}
              className={cn('bottombar_link', isActive && 'bg-primary-500')}
            >
              {link.icon}
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {(t(link.label) as string).split(' ')[0]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
