import React, { useContext, useState } from 'react';
import LogoDark from '@assets/images/logo-dark-theme.svg';
import LogoLight from '@assets/images/logo-light-theme.svg';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { ThemeContext } from '@app/providers/theme';
import { FiLogIn, FiLogOut, FiPlus } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getAvatar, getFallback } from '@lib/utils/tools';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { AuthDialog } from '@components/dialogs/auth';
import { AuthContext } from '@app/providers/auth';

export const Topbar = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [deviceSize] = useDeviceDetermine();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState<boolean>(false);

  const handleLogoutClick = () => {
    authContext.setUser(undefined);
    authContext.setAccessToken(undefined);
  };

  const onClickLogo = () => navigate(RoutePaths[RouteKeys.HOME]);
  const onClickCreate = () => navigate(RoutePaths[RouteKeys.WRITE]);

  const handleOpenAuthDialog = () => setIsOpenAuthDialog(true);

  return (
    <>
      <AuthDialog
        isOpen={isOpenAuthDialog}
        onOpenChange={setIsOpenAuthDialog}
      />
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
        {authContext.isAuth ? (
          <div className="flex items-center gap-1">
            <div
              onClick={handleLogoutClick}
              className="block md:hidden cursor-pointer p-2 rounded-md hover:bg-dark-4"
            >
              <FiLogOut className="flex" size={deviceSize != 'sm' ? 30 : 20} />
            </div>
            <Avatar>
              <AvatarImage src={getAvatar(authContext.user)} />
              <AvatarFallback>{getFallback(authContext.user)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button
            onClick={handleOpenAuthDialog}
            variant="primary"
            data={{ leftIcon: <FiLogIn /> }}
          >
            {t('ui:button.sign_in')}
          </Button>
        )}
      </nav>
    </>
  );
};
