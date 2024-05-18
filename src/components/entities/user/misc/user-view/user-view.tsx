import { AuthContext } from '@app/providers/auth';
import { CategoryCardList } from '@components/entities/category/misc/category-card-list';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { UserInfoDto } from '@lib/api/models';
import { QueryKeys } from '@lib/constants';
import { getAvatar, getFallback, number2short } from '@lib/utils/tools';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface IUserViewProps {
  info: UserInfoDto;
  countArticles: number;
}

export const UserView = (props: IUserViewProps) => {
  const { t, i18n } = useTranslation();
  const authContext = useContext(AuthContext);
  const queryClient = useQueryClient();
  const isMe = props.info.id ? props.info.id == authContext.user?.id : false;

  const handleReloadMe = () =>
    queryClient.invalidateQueries([QueryKeys.GET_ME]);

  return (
    <div className="flex flex-col rounded-xl bg-dark-2 p-3 md:p-7">
      <div className="flex flex-wrap md:gap-2 items-center justify-between mb-2 md:mb-5">
        <div className="w-1/5 h-1/5 md:w-1/4 md:1/4">
          <Avatar className="w-full h-full">
            <AvatarImage src={getAvatar(props.info)} />
            <AvatarFallback>{getFallback(props.info)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-slate-500 dark:text-slate-400 text-small-semibold lg:text-heading4-bold">
            {t('ui:subheader.articles')}
          </p>
          <p className="text-heading4-bold md:text-heading3-bold">
            {number2short(props.countArticles)}
          </p>
        </div>
        <Button variant="ghost" className="h-auto">
          <div className="flex flex-col items-center">
            <p className="text-slate-500 dark:text-slate-400 text-small-semibold lg:text-heading4-bold">
              {t('ui:subheader.followers')}
            </p>
            <p className="text-heading4-bold md:text-heading3-bold">
              {number2short(props.info.countFollowers)}
            </p>
          </div>
        </Button>
        <Button variant="ghost" className="h-auto">
          <div className="flex flex-col items-center">
            <p className="text-slate-500 dark:text-slate-400 text-small-semibold lg:text-heading4-bold">
              {t('ui:subheader.followings')}
            </p>
            <p className="text-heading4-bold md:text-heading3-bold">
              {number2short(props.info.countFollowings)}
            </p>
          </div>
        </Button>
      </div>
      <h1 className="body-medium md:text-heading4-bold">{props.info?.name}</h1>
      <h2 className="body-medium md:text-heading4-bold">
        @{props.info?.nickname}
      </h2>
      <Link
        className="body-medium md:text-heading4-bold"
        to={'mailto:' + props.info?.email}
      >
        {props.info?.email}
      </Link>
      <div className="border w-full my-2 border-slate-500 dark:border-slate-400" />
      <p>
        {t('text:on_platform_since')}{' '}
        {new Date(props.info?.createdAt).toLocaleDateString(i18n.language)}
      </p>
      <label className="font-bold mt-5">Favorite Categories:</label>
      <CategoryCardList userAchievements={props.info.achievements} />
    </div>
  );
};
