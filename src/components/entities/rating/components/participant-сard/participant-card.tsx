import { RoutePaths } from '@app/router';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { UserAchievement } from '@lib/api/models';
import { RouteKeys } from '@lib/constants';
import { useDeclension } from '@lib/utils/hooks';
import { getAvatar, getFallback } from '@lib/utils/tools';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface IParticipantCardProps {
  participant: UserAchievement;
  rank?: number;
}

export const ParticipantCard = (props: IParticipantCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleView = async () =>
    navigate(RoutePaths[RouteKeys.USER] + `/${props.participant.userId}`);

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <h2>#{props.rank}</h2>
        <div className="relative h-12 w-12">
          <Avatar>
            <AvatarImage src={getAvatar(props.participant.user)} />
            <AvatarFallback>
              {getFallback(props.participant.user)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">
            {props.participant.user?.name}
          </h4>
          <p className="text-small-medium text-gray-1">
            @{props.participant.user?.nickname}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h2>
          {props.participant.userPoints}&nbsp;
          {useDeclension(props.participant.userPoints, [
            t('text:point'),
            t('text:point_0d'),
            t('text:point_1d'),
          ])}
        </h2>
        <img
          src={props.participant.category.avatar?.staticField?.url}
          className="rounded-lg h-12 w-12"
          alt="category avatar"
        />
      </div>
    </article>
  );
};
