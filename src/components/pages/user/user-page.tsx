import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyContent } from '@components/shared/empty-content/empty-content';
import { User } from '@lib/api/models';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@lib/utils/hooks';
import { UserCard } from '@components/modules/user-card';
import { Button } from '@components/ui/button';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@lib/utils/tools';
import { Collapsible, CollapsibleContent } from '@radix-ui/react-collapsible';

export const UserPage = observer(() => {
  const { t } = useTranslation();
  const { getUser, isAuth } = useRootStore('authStore');

  const [isOpenSubscriptions, setIsOpenSubscriptions] = useState<boolean>(true);
  const [isOpenNotSubscriptions, setIsOpenNotSubscriptions] =
    useState<boolean>(true);

  const handleCollapsibleSubscriptions = () =>
    setIsOpenSubscriptions(prev => !prev);

  const handleCollapsibleNotSubscriptions = () =>
    setIsOpenNotSubscriptions(prev => !prev);

  const result: User[] = getUser ? [getUser, getUser, getUser, getUser] : [];

  return (
    <section>
      {isAuth && (
        <Collapsible open={isOpenSubscriptions}>
          <div className="flex items-center justify-between mb-10">
            <h1 className="head-text">{t('ui:title.subscriptions')}</h1>
            <Button
              onClick={handleCollapsibleSubscriptions}
              variant="ghost"
              size="icon"
            >
              <FiChevronDown
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
                    <UserCard key={user.id} user={user} onRefresh={() => {}} />
                  ))}
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      <Collapsible className="mt-10" open={isOpenNotSubscriptions}>
        <div className="flex items-center justify-between mb-10">
          <h1 className="head-text">{t('ui:title.users')}</h1>
          <Button
            onClick={handleCollapsibleNotSubscriptions}
            variant="ghost"
            size="icon"
          >
            <FiChevronDown
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
                  <UserCard key={user.id} user={user} onRefresh={() => {}} />
                ))}
              </>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
});