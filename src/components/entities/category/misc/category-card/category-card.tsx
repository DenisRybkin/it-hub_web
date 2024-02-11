import { AuthContext } from '@app/providers/auth';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import { Category, UserAchievement } from '@lib/api/models';
import { api } from '@lib/api/plugins';
import { QueryKeys } from '@lib/constants';
import { useDeviceDetermine } from '@lib/utils/hooks';
import { cn } from '@lib/utils/tools';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FiHeart } from 'react-icons/fi';

interface ICategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
  isSelected?: boolean;
  userAchievement?: UserAchievement;
}

export const CategoryCard = (props: ICategoryCardProps) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);

  const [deviceSize] = useDeviceDetermine();

  const isFavorite =
    auth.user?.userCategory &&
    auth.user?.userCategory.some(item => item.categoryId == props.category.id);

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const handleClick = () => props.onClick?.(props.category);

  const toggleFavoriteCategory = useMutation({
    mutationFn: () => api.user.toggleFavoriteCategory(props.category.id),
    onError: handleError,
    onSuccess: async () => auth.setUser(await api.user.getMe()),
  });

  const handleToggleFavorite = (event: MouseEvent<HTMLButtonElement>) =>
    void event.stopPropagation() || toggleFavoriteCategory.mutate();

  return (
    <div
      onClick={handleClick}
      className={cn(
        'cursor-pointer relative transition-all rounded-lg bg-dark-2 p-3 md:p-6 flex flex-col items-center justify-between gap-1 md:gap-2 border-2 border-dark-2 hover:border-primary-500 min-w-[150px]',
        props.isSelected && 'border-primary-500'
      )}
    >
      {isFavorite != null && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute right-0 top-0"
          onClick={handleToggleFavorite}
          data={{ isLoading: toggleFavoriteCategory.isLoading }}
        >
          <FiHeart
            stroke="#5C5C7B"
            className={cn(isFavorite && 'stroke-red fill-red')}
            size={deviceSize == 'sm' ? 20 : 22}
          />
        </Button>
      )}
      <img
        src={props.category.avatar?.staticField?.url}
        className="rounded-lg w-20 md:w-36"
        alt="category avatar"
      />
      <h3>{props.category.name}</h3>
      {props.userAchievement?.achievement?.name && (
        <h3 className="text-primary-500">
          {props.userAchievement?.achievement?.name}
        </h3>
      )}
      <p className="text-small-regular text-gray-1 truncate w-28">
        {props.category.description}
      </p>
    </div>
  );
};
