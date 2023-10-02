import React from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryKeys } from '@lib/constants';
import { api } from '@lib/api/plugins';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      cacheTime: Number(import.meta.env.VITE_API_CACHE_TIME),
      staleTime: Number(import.meta.env.VITE_API_CACHE_TIME),
    },
  },
});

export const QueryProvider = (props: IProviderProps) => {
  queryClient.prefetchQuery({
    queryKey: [QueryKeys.GET_ME],
    queryFn: async () => await api.user.getMe(),
    cacheTime: 2 * Number(import.meta.env.VITE_API_CACHE_TIME),
    staleTime: 2 * Number(import.meta.env.VITE_API_CACHE_TIME),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
