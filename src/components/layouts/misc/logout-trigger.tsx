import React, { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { AuthContext } from '@app/providers/auth';
import { useTranslation } from 'react-i18next';
import { ConfirmDialog } from '@components/shared/dialog';
import { api } from '@lib/api/plugins';

type LogoutFromType = 'sidebar' | 'topbar';

interface ILogoutProps {
  from: LogoutFromType;
}

export const LogoutTrigger = (props: ILogoutProps) => {
  const { t } = useTranslation();
  const [deviceSize] = useDeviceDetermine();
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    authContext.setUser(undefined);
    authContext.setAccessToken(undefined);
    await api.auth.logout();
  };

  if (!authContext.isAuth) return null;

  const handleGetLogoutTrigger = () => {
    switch (props.from) {
      case 'sidebar':
        return (
          <div className="mt-10 px-6">
            <div className="flex cursor-pointer gap-4 p-4 rounded-md hover:bg-dark-4">
              <FiLogOut size={24} />
              <p className="text-light-2 max-lg:hidden">
                {t('ui:button.logout')}
              </p>
            </div>
          </div>
        );
      case 'topbar':
        return (
          <div className="block md:hidden cursor-pointer p-2 rounded-md hover:bg-dark-4">
            <FiLogOut className="flex" size={deviceSize != 'sm' ? 30 : 20} />
          </div>
        );
    }
  };

  return (
    <ConfirmDialog
      title={t('ui:title.want_logout')}
      onConfirm={handleLogout}
      trigger={handleGetLogoutTrigger()}
    />
  );
};
