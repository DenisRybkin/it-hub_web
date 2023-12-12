import { IApiControllerRead } from '@lib/api/interfaces';
import { useInfinityPaging } from '@lib/utils/hooks';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { FilterOption, ModelWithId } from '@lib/api/types';
import { User } from '@lib/api/models';
import { CircularLoader } from '@components/ui/loader';
import { DialogAdapter, IBaseDialogProps } from '@components/shared/dialog';
import { UserCard } from '@components/entities/user/misc/user-card';
import { VisibleTrigger } from '@components/shared/visible-trigger';

interface IUsersWhoPassedTestDialogProps<U extends ModelWithId, UFilter>
  extends IBaseDialogProps {
  usersWhoPassedController: IApiControllerRead<U, UFilter>;
  controllerFilter: FilterOption<UFilter>[];
  model2user: (model: U) => User;
}

export const UsersWhoPassedTestDialog = <U extends ModelWithId, UFilter>(
  props: IUsersWhoPassedTestDialogProps<U, UFilter>
) => {
  const { t } = useTranslation();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const { isFetching, isLoading, items, info, loadNext } = useInfinityPaging<
    U,
    UFilter
  >(props.usersWhoPassedController, handleError, props.controllerFilter);

  return (
    <DialogAdapter
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={t('ui:title.users_who_passed_test')}
    >
      <div className="flex flex-col gap-9 h-80 overflow-y-auto">
        {(isFetching || isLoading) && !items.length ? (
          <CircularLoader />
        ) : (
          items.map(item => (
            <UserCard key={item.id} user={props.model2user(item)} />
          ))
        )}
        <VisibleTrigger
          onVisible={loadNext}
          className="mt-2"
          hidden={info.isDone}
        />
      </div>
    </DialogAdapter>
  );
};
