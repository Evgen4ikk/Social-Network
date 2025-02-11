import type { MantineProviderProps } from '@mantine/core';
import type { QueryClientProviderProps } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { SessionProviderProps } from '@/utils/contexts/session';

import { SessionProvider } from '@/utils/contexts/session';
import { Notifications } from '@mantine/notifications';

export interface ProvidersProps {
  children: ReactNode;
  mantine: Omit<MantineProviderProps, 'children'>;
  query: Omit<QueryClientProviderProps, 'children'>;
  session: Omit<SessionProviderProps, 'children'>;
}

export const Providers = ({ children, query, mantine, session }: ProvidersProps) => {
  return (
    <MantineProvider {...mantine}>
      <QueryClientProvider {...query}>
        <SessionProvider {...session}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Notifications />
          {children}
        </SessionProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
