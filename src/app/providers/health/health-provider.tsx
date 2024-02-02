import React, { useState } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { HealthContext } from './health-context';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@lib/constants';

const isTechnicalWorkDefault = import.meta.env.VITE_TECHNICAL_WORK == 'true';

export const HealthProvider = (props: IProviderProps) => {
  const [isTechnicalWork, setIsTechnicalWork] = useState<boolean>(
    isTechnicalWorkDefault
  );

  const { isLoading, isFetching } = useQuery({
    queryKey: [QueryKeys.PING],
    placeholderData: isTechnicalWorkDefault,
    onSuccess: (pong: string) =>
      pong == 'pong' && !isTechnicalWorkDefault && setIsTechnicalWork(false),
    onError: () => setIsTechnicalWork(true),
  });

  return (
    <HealthContext.Provider
      value={{
        isTechnicalWork,
        setIsTechnicalWork,
        isCheckingHealth: isLoading || isFetching,
      }}
    >
      {props.children}
    </HealthContext.Provider>
  );
};
