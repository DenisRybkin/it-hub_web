import React, { useContext } from 'react';
import LogoDark from '@assets/images/logo-dark-theme.svg';
import LogoLight from '@assets/images/logo-light-theme.svg';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { ThemeContext } from '@app/providers/theme';
import { FiPlus } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { AuthContext } from '@app/providers/auth';
import { AccountBar } from '@components/layouts/topbar/account-bar';

export const Topbar = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [deviceSize] = useDeviceDetermine();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickLogo = () => navigate(RoutePaths[RouteKeys.HOME]);
  const onClickCreate = () => navigate(RoutePaths[RouteKeys.WRITE]);

  return (
    <nav className="topbar">
      <div onClick={onClickLogo} className="cursor-pointer">
        <img
          className="h-[30px] md:h-[40px] w-[77px] md:w-[102px]"
          src={theme == 'dark' ? LogoDark : LogoLight}
          alt="logo"
        />
      </div>
      {authContext.isAuth && pathname != RoutePaths[RouteKeys.WRITE] && (
        <Button
          onClick={onClickCreate}
          variant="primary"
          size={deviceSize == 'sm' ? 'sm' : 'default'}
          data={{ leftIcon: <FiPlus /> }}
        >
          {t('ui:button.create')}
        </Button>
      )}
      <AccountBar />
    </nav>
  );
};
