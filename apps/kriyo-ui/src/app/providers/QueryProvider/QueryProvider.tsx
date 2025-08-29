'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const QUERY_CONFIG = Object.freeze({
  staleTimeInMin: 5,
  gcTimeInMin: 10,
  retry: 3,
  refetchOnWindowFocus: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTimeInMin * 60 * 1000,
      gcTime: QUERY_CONFIG.gcTimeInMin * 60 * 1000,
      retry: QUERY_CONFIG.retry,
      refetchOnWindowFocus: QUERY_CONFIG.refetchOnWindowFocus,
    },
  },
});

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
