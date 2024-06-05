import { AuthContext } from '@app/providers/auth';
import { ThemeContext } from '@app/providers/theme';
import { RoutePaths } from '@app/router';
import LogoDark from '@assets/images/logo-dark-theme.svg';
import LogoLight from '@assets/images/logo-light-theme.svg';
import { PassExaminationDialog } from '@components/entities/examination/dialogs/pass-examonation/pass-examination-dialog';
import { AccountBar } from '@components/layouts/topbar/account-bar';
import { LocaleSwitcher } from '@components/shared/locale-switcher';
import { Button } from '@components/ui/button';
import { PermissionsKeys, RouteKeys } from '@lib/constants';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { checkPermission } from '@lib/utils/tools';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiKey, FiPlus } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [deviceSize] = useDeviceDetermine();
  const { theme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const [isOpenPassExamination, setIsOpenPassExamination] =
    useState<boolean>(false);

  const onClickLogo = () => navigate(RoutePaths[RouteKeys.HOME]);
  const onClickCreate = () => navigate(RoutePaths[RouteKeys.WRITE]);
  const handleOpenPassExaminationDialog = () => setIsOpenPassExamination(true);

  return (
    <>
      <PassExaminationDialog
        isOpen={isOpenPassExamination}
        onOpenChange={setIsOpenPassExamination}
      />
      <nav className="topbar">
        <div onClick={onClickLogo} className="cursor-pointer">
          <img
            className="h-[30px] md:h-[40px] w-[77px] md:w-[102px]"
            src={theme == 'dark' ? LogoDark : LogoLight}
            alt="logo"
          />
        </div>
        {checkPermission(PermissionsKeys.WRITE_ARTICLE, authContext.user) &&
          pathname != RoutePaths[RouteKeys.WRITE] && (
            <Button
              onClick={onClickCreate}
              variant="primary"
              size={deviceSize == 'sm' ? 'sm' : 'default'}
              data={{ leftIcon: <FiPlus /> }}
            >
              {t('ui:button.create')}
            </Button>
          )}
        {checkPermission(
          PermissionsKeys.PASS_EXAMINATION,
          authContext.user
        ) && (
          <Button
            variant="primary"
            size={deviceSize == 'sm' ? 'sm' : 'default'}
            data={{ leftIcon: <FiKey /> }}
            onClick={handleOpenPassExaminationDialog}
          >
            {t('ui:button.exam')}
          </Button>
        )}
        <div className="flex items-center md:gap-5 gap-3">
          <LocaleSwitcher />
          <AccountBar />
        </div>
      </nav>
    </>
  );
};
