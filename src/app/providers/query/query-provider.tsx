import { IProviderProps } from '@app/providers/i-provider-props';
import { api } from '@lib/api/plugins';
import { QueryKeys } from '@lib/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  queryClient.fetchQuery({
    queryKey: [QueryKeys.PING],
    queryFn: async () => await api.app.ping(),
    cacheTime: 2 * Number(import.meta.env.VITE_API_CACHE_TIME),
    staleTime: 2 * Number(import.meta.env.VITE_API_CACHE_TIME),
  });

  queryClient.refetchQueries({ queryKey: [QueryKeys.GET_ME], type: 'all' });

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};
