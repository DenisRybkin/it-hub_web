import { useTranslation } from 'react-i18next';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '@app/providers/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { getAvatar, getFallback } from '@lib/utils/tools';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { ConfirmDialog } from '@components/shared/dialog';
import { api } from '@lib/api/plugins';
import { FiLogIn } from 'react-icons/fi';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';

export const AccountBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const confirmDialogTriggerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenConfirmLogoutDialog = () =>
    void setIsOpenMenu(false) || confirmDialogTriggerRef.current?.click();

  const handleLogout = async () => {
    authContext.setUser(undefined);
    authContext.setAccessToken(undefined);
    await api.auth.logout();
  };

  const handleOpenProfile = () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${authContext.user?.id}`);

  return (
    <>
      <ConfirmDialog
        trigger={<div className="hidden" ref={confirmDialogTriggerRef} />}
        title={t('ui:title.want_logout')}
        onConfirm={handleLogout}
      />
      {authContext.isAuth ? (
        <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={getAvatar(authContext.user)} />
              <AvatarFallback>{getFallback(authContext.user)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:w-56">
            <DropdownMenuLabel>{t('text:my_account')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleOpenProfile}>
                {t('ui:button.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenConfirmLogoutDialog}>
                {t('ui:button.logout')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={authContext.openAuthDialog}
          variant="primary"
          data={{ leftIcon: <FiLogIn /> }}
        >
          {t('ui:button.sign_in')}
        </Button>
      )}
    </>
  );
};
