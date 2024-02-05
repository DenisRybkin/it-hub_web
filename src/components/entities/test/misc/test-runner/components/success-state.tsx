import { AuthContext } from '@app/providers/auth';
import SmileWink from '@assets/images/smiles/wink.png';
import { UsersWhoPassedTestDialog } from '@components/entities/user/dialogs/users-who-passed-test/users-who-passed-test-dialog';
import { AvatarGroup } from '@components/ui/avatar';
import { toast } from '@components/ui/use-toast';
import { IApiControllerRead } from '@lib/api/interfaces';
import { User } from '@lib/api/models';
import type { ModelWithId } from '@lib/api/types';
import { FilterOption } from '@lib/api/types';
import { useInfinityPaging } from '@lib/utils/hooks';
import { getAvatar, getFallback } from '@lib/utils/tools';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ISuccessStateProps<U extends ModelWithId, UFilter> {
  usersWhoPassedController: IApiControllerRead<U, UFilter>;
  controllerFilter: FilterOption<UFilter>[];
  model2user: (model: U) => User;
}

export const SuccessState = <U extends ModelWithId, UFilter>(
  props: ISuccessStateProps<U, UFilter>
) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => setIsOpenDialog(true);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { items: usersWhoPassed } = useInfinityPaging<U, UFilter>(
    props.usersWhoPassedController,
    handleError,
    props.controllerFilter
  );

  const avatarGroups = (usersWhoPassed ?? [])
    .filter(item => item.id != authContext.user?.id)
    .map(props.model2user)
    .map(item => ({
      src: getAvatar(item),
      fallback: getFallback(item),
      tooltip: <p>@{item.nickname}</p>,
    }));

  return (
    <>
      {props.controllerFilter &&
        props.model2user &&
        props.usersWhoPassedController && (
          <UsersWhoPassedTestDialog
            isOpen={isOpenDialog}
            onOpenChange={setIsOpenDialog}
            usersWhoPassedController={props.usersWhoPassedController}
            model2user={props.model2user}
            controllerFilter={props.controllerFilter}
          />
        )}
      <div className="p-3 md:p-7 bg-dark-2 rounded-xl">
        <div className="w-full flex flex-col items-center gap-2">
          <img src={SmileWink} className="w-8 h-8" alt="smile" />
          <h1 className="text-body-medium">{t('text:you_passed_test')}</h1>
          {!!avatarGroups.length && (
            <div className="flex items-center gap-2">
              <h1>{t('text:more_pretty_boys')}</h1>
              <AvatarGroup
                className="w-8 h-8 "
                onMore={handleOpenDialog}
                avatars={avatarGroups}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
