import React, { useContext, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { User } from '@lib/api/models';
import { getAvatar, getFallback } from '@lib/utils/tools';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { AuthContext } from '@app/providers/auth';

interface IUserCardProps {
  user: User;
}

export const UserCard = (props: IUserCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false);

  const isSubscribed = true;

  const handleView = async () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${props.user.id}`);

  const handleSubscribe = async () => {
    setIsLoadingAction(true);
    //TODO: add req
    setIsLoadingAction(false);
  };
  const handleUnsubscribe = () => {
    setIsLoadingAction(true);
    //TODO: add req
    setIsLoadingAction(false);
  };

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Avatar>
            <AvatarImage src={getAvatar(props.user)} />
            <AvatarFallback>{getFallback(props.user)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{props.user.name}</h4>
          <p className="text-small-medium text-gray-1">
            @{props.user.nickname}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {authContext.isAuth && (
          <Button
            className="user-card_btn"
            variant="primary"
            data={{
              isLoading: isLoadingAction,
            }}
            onClick={handleView}
          >
            {t(isSubscribed ? 'ui:button.unsubscribe' : 'ui:button.subscribe')}
          </Button>
        )}
        <Button
          className="user-card_btn"
          variant="primary"
          onClick={handleView}
        >
          {t('ui:button.view')}
        </Button>
      </div>
    </article>
  );
};
