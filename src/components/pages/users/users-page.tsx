import { AuthContext } from '@app/providers/auth';
import { UserCard } from '@components/entities/user/misc/user-card';
import { EmptyContent } from '@components/shared/empty-content/empty-content';
import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { User } from '@lib/api/models';
import { cn } from '@lib/utils/tools';
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';

export const UsersPage = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [isOpenSubscriptions, setIsOpenSubscriptions] = useState<boolean>(true);
  const [isOpenNotSubscriptions, setIsOpenNotSubscriptions] =
    useState<boolean>(true);

  const handleCollapsibleSubscriptions = () =>
    setIsOpenSubscriptions(prev => !prev);

  const handleCollapsibleNotSubscriptions = () =>
    setIsOpenNotSubscriptions(prev => !prev);

  const result: User[] = authContext.user
    ? [authContext.user, authContext.user, authContext.user, authContext.user]
    : [];

  return (
    <section>
      {authContext.isAuth && (
        <Collapsible open={isOpenSubscriptions}>
          <div className="flex items-center justify-between mb-10">
            <h1 className="head-text">{t('ui:title.subscriptions')}</h1>
            <Button
              onClick={handleCollapsibleSubscriptions}
              variant="ghost"
              size="icon"
            >
              <FiChevronDown
                size={22}
                className={cn(
                  'transition-all',
                  isOpenSubscriptions && 'rotate-180'
                )}
              />
            </Button>
          </div>
          <CollapsibleContent>
            <div className="mt-14 flex flex-col gap-9">
              {result.length == 0 ? (
                <EmptyContent />
              ) : (
                <>
                  {result.map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      {authContext.isAuth && <Separator className="my-4 h-[3px]" />}
      <Collapsible open={isOpenNotSubscriptions}>
        <div className="flex items-center justify-between mb-10">
          <h1 className="head-text">{t('ui:title.users')}</h1>
          <Button
            onClick={handleCollapsibleNotSubscriptions}
            variant="ghost"
            size="icon"
          >
            <FiChevronDown
              size={22}
              className={cn(
                'transition-all',
                isOpenNotSubscriptions && 'rotate-180'
              )}
            />
          </Button>
        </div>
        <CollapsibleContent>
          <div className="mt-14 flex flex-col gap-9">
            {result.length == 0 ? (
              <EmptyContent />
            ) : (
              <>
                {result.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
