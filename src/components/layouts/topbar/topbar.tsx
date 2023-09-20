import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import LogoDark from '@assets/images/logo-dark-theme.svg';
import LogoLight from '@assets/images/logo-light-theme.svg';
import { useDeviceDetermine, useRootStore } from '@lib/utils/hooks';
import { ThemeContext } from '@app/providers/theme';
import { FiLogOut } from 'react-icons/fi';
import { LocaleStorageKeys } from '@lib/constants';
import { useNavigate } from 'react-router-dom';

export const Topbar = observer(() => {
  const authStore = useRootStore('authStore');
  const [deviceSize] = useDeviceDetermine();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(LocaleStorageKeys.JWT);
    authStore.setUser(undefined);
    authStore.setAccessToken(undefined);
    navigate('/');
  };

  const onClickLogo = () => navigate('/');

  return (
    <nav className="topbar">
      <div onClick={onClickLogo} className="cursor-pointer">
        <img
          className="h-[30px] md:h-[40px] w-[77px] md:w-[102px]"
          src={theme == 'dark' ? LogoDark : LogoLight}
          alt="logo"
        />
      </div>
      <div className="flex items-center gap-1">
        <div
          onClick={handleLogout}
          className="block md:hidden cursor-pointer p-2 rounded-md hover:bg-dark-4"
        >
          <FiLogOut className="flex" size={deviceSize != 'sm' ? 30 : 20} />
        </div>
        {/* TODO: добавить аватарку юзера */}
      </div>
    </nav>
  );
});
